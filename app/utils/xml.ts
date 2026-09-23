import { XMLValidator } from 'fast-xml-parser'

export interface XmlValidationError {
  valid: boolean
  error?: string
  line?: number
  col?: number
  msg?: string
}

export interface XmlAstNode {
  tag: string
  attributes: Record<string, string>
  children: XmlAstNode[]
  text?: string
  from: number
  to: number
}

export type XmlDiffType = 'added' | 'removed' | 'changed'

export interface XmlDiffItem {
  type: XmlDiffType
  path: (string | number)[]
  tag?: string
  leftRange?: { from: number; to: number }
  rightRange?: { from: number; to: number }
}

export function validateXml(xml: string): XmlValidationError {
  if (!xml || !xml.trim()) {
    return {
      valid: false,
      error: 'XML document is empty',
      line: 1,
      col: 1,
      msg: 'Document is empty. Paste or upload valid XML to format.'
    }
  }

  const result = XMLValidator.validate(xml)
  if (result === true) {
    return { valid: true }
  }

  const err = result.err
  return {
    valid: false,
    error: `Invalid XML — line ${err.line}, column ${err.col}: ${err.msg}`,
    line: err.line,
    col: err.col,
    msg: err.msg
  }
}

export function formatXml(xml: string, indentStr: string = '  '): string {
  if (!xml || !xml.trim()) return ''

  // Tokenize XML into syntax units:
  // 1: CDATA: <![CDATA[ ... ]]>
  // 2: Comments: <!-- ... -->
  // 3: Processing instructions / XML decl: <? ... ?>
  // 4: DOCTYPE: <!DOCTYPE ... >
  // 5: Closing tag: </ ... >
  // 6: Self-closing tag: < ... />
  // 7: Opening tag: < ... >
  // 8: Text: characters outside tags
  const tokenRegex = /(<!\[CDATA\[[\s\S]*?\]\]>)|(<!--[\s\S]*?-->)|(<\?[\s\S]*?\?>)|(<!DOCTYPE[\s\S]*?>)|(<\/[^>]+>)|(<[^>]+?\/>)|(<[^>]+?>)|([^<]+)/g

  interface Token {
    type: 'cdata' | 'comment' | 'pi' | 'doctype' | 'close' | 'selfclosing' | 'open' | 'text'
    content: string
  }

  const tokens: Token[] = []
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(xml)) !== null) {
    const text = match[0]
    if (match[8]) {
      const trimmed = text.trim()
      if (trimmed.length > 0) {
        tokens.push({ type: 'text', content: trimmed })
      }
    } else if (match[1]) {
      tokens.push({ type: 'cdata', content: text })
    } else if (match[2]) {
      tokens.push({ type: 'comment', content: text.trim() })
    } else if (match[3]) {
      tokens.push({ type: 'pi', content: text.trim() })
    } else if (match[4]) {
      tokens.push({ type: 'doctype', content: text.trim() })
    } else if (match[5]) {
      tokens.push({ type: 'close', content: text.trim() })
    } else if (match[6]) {
      tokens.push({ type: 'selfclosing', content: normalizeTag(text) })
    } else if (match[7]) {
      tokens.push({ type: 'open', content: normalizeTag(text) })
    }
  }

  function normalizeTag(tag: string): string {
    return tag.replace(/\s+/g, ' ').replace(/\s+\/>$/, '/>')
  }

  function getTagName(tag: string): string {
    const m = tag.match(/<(?:\/)?([a-zA-Z0-9_.:-]+)/)
    return m && m[1] ? m[1] : ''
  }

  const lines: string[] = []
  let depth = 0

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (!token) continue
    const nextToken = tokens[i + 1]

    if (token.type === 'pi' || token.type === 'doctype') {
      lines.push(token.content)
    } else if (token.type === 'comment') {
      lines.push(indentStr.repeat(depth) + token.content)
    } else if (token.type === 'selfclosing') {
      lines.push(indentStr.repeat(depth) + token.content)
    } else if (token.type === 'open') {
      const openName = getTagName(token.content)
      const afterNext = tokens[i + 2]

      // Case 1: <tag>text</tag> (keep leaf element on a single line)
      if (
        nextToken &&
        nextToken.type === 'text' &&
        afterNext &&
        afterNext.type === 'close' &&
        getTagName(afterNext.content) === openName
      ) {
        lines.push(indentStr.repeat(depth) + token.content + nextToken.content + afterNext.content)
        i += 2
      }
      // Case 2: <tag></tag> (empty element)
      else if (nextToken && nextToken.type === 'close' && getTagName(nextToken.content) === openName) {
        lines.push(indentStr.repeat(depth) + token.content + nextToken.content)
        i += 1
      } else {
        lines.push(indentStr.repeat(depth) + token.content)
        depth++
      }
    } else if (token.type === 'close') {
      depth = Math.max(0, depth - 1)
      lines.push(indentStr.repeat(depth) + token.content)
    } else if (token.type === 'text' || token.type === 'cdata') {
      lines.push(indentStr.repeat(depth) + token.content)
    }
  }

  return lines.join('\n')
}

export function parseXmlToAst(xml: string): XmlAstNode {
  const tokenRegex = /(<!\[CDATA\[[\s\S]*?\]\]>)|(<!--[\s\S]*?-->)|(<\?[\s\S]*?\?>)|(<!DOCTYPE[\s\S]*?>)|(<\/[^>]+>)|(<[^>]+?\/>)|(<[^>]+?>)|([^<]+)/g

  function parseAttributes(tagStr: string): Record<string, string> {
    const attrs: Record<string, string> = {}
    const attrRegex = /([a-zA-Z0-9_.:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
    let m: RegExpExecArray | null
    while ((m = attrRegex.exec(tagStr)) !== null) {
      const key = m[1]
      if (key) {
        attrs[key] = m[2] !== undefined ? m[2] : (m[3] ?? '')
      }
    }
    return attrs
  }

  function getTagName(tagStr: string): string {
    const m = tagStr.match(/<(?:\/)?([a-zA-Z0-9_.:-]+)/)
    return m && m[1] ? m[1] : ''
  }

  const roots: XmlAstNode[] = []
  const stack: XmlAstNode[] = []
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(xml)) !== null) {
    const text = match[0]
    const from = match.index
    const to = from + text.length

    if (match[5]) {
      // Closing tag </tag>
      const tagName = getTagName(text)
      if (stack.length > 0) {
        for (let i = stack.length - 1; i >= 0; i--) {
          const stackNode = stack[i]
          if (stackNode && stackNode.tag === tagName) {
            stackNode.to = to
            stack.splice(i)
            break
          }
        }
      }
    } else if (match[6]) {
      // Self-closing tag <tag ... />
      const tagName = getTagName(text)
      const node: XmlAstNode = {
        tag: tagName,
        attributes: parseAttributes(text),
        children: [],
        from,
        to
      }
      if (stack.length > 0) {
        stack[stack.length - 1]?.children.push(node)
      } else {
        roots.push(node)
      }
    } else if (match[7]) {
      // Opening tag <tag ... >
      const tagName = getTagName(text)
      const node: XmlAstNode = {
        tag: tagName,
        attributes: parseAttributes(text),
        children: [],
        from,
        to
      }
      if (stack.length > 0) {
        stack[stack.length - 1]?.children.push(node)
      } else {
        roots.push(node)
      }
      stack.push(node)
    } else if (match[1]) {
      // CDATA
      if (stack.length > 0) {
        const top = stack[stack.length - 1]
        if (top) top.text = (top.text || '') + text
      }
    } else if (match[8]) {
      // Text
      const trimmed = text.trim()
      if (trimmed && stack.length > 0) {
        const top = stack[stack.length - 1]
        if (top) top.text = (top.text || '') + trimmed
      }
    }
  }

  return roots.length === 1 && roots[0]
    ? roots[0]
    : { tag: '__root__', attributes: {}, children: roots, from: 0, to: xml.length }
}

export function runXmlDiff(
  left: XmlAstNode | null | undefined,
  right: XmlAstNode | null | undefined,
  path: (string | number)[] = []
): XmlDiffItem[] {
  if (!left && !right) return []

  if (left && !right) {
    return [{
      type: 'removed',
      path,
      tag: left.tag,
      leftRange: { from: left.from, to: left.to }
    }]
  }

  if (!left && right) {
    return [{
      type: 'added',
      path,
      tag: right.tag,
      rightRange: { from: right.from, to: right.to }
    }]
  }

  if (!left || !right) return []

  const diffs: XmlDiffItem[] = []

  // Check tag mismatch
  if (left.tag !== right.tag) {
    return [{
      type: 'changed',
      path,
      tag: left.tag,
      leftRange: { from: left.from, to: left.to },
      rightRange: { from: right.from, to: right.to }
    }]
  }

  // 1. Compare attributes
  const leftAttrs = left.attributes || {}
  const rightAttrs = right.attributes || {}
  const allAttrKeys = new Set([...Object.keys(leftAttrs), ...Object.keys(rightAttrs)])
  let attrsDiffer = false

  for (const k of allAttrKeys) {
    if (leftAttrs[k] !== rightAttrs[k]) {
      attrsDiffer = true
      break
    }
  }

  if (attrsDiffer) {
    diffs.push({
      type: 'changed',
      path: [...path, '@attributes'],
      tag: left.tag,
      leftRange: { from: left.from, to: left.to },
      rightRange: { from: right.from, to: right.to }
    })
  }

  // 2. Compare text if leaf nodes
  if (left.children.length === 0 && right.children.length === 0) {
    const lText = (left.text || '').trim()
    const rText = (right.text || '').trim()
    if (lText !== rText) {
      diffs.push({
        type: 'changed',
        path: [...path, '#text'],
        tag: left.tag,
        leftRange: { from: left.from, to: left.to },
        rightRange: { from: right.from, to: right.to }
      })
    }
    return diffs
  }

  // 3. Compare children
  const lChildren = left.children
  const rChildren = right.children

  const lCounts: Record<string, number> = {}
  const lKeys = lChildren.map(c => {
    lCounts[c.tag] = (lCounts[c.tag] || 0) + 1
    return `${c.tag}_${(lCounts[c.tag] ?? 1) - 1}`
  })

  const rCounts: Record<string, number> = {}
  const rKeys = rChildren.map(c => {
    rCounts[c.tag] = (rCounts[c.tag] || 0) + 1
    return `${c.tag}_${(rCounts[c.tag] ?? 1) - 1}`
  })

  const allChildKeys = new Set([...lKeys, ...rKeys])

  for (const key of allChildKeys) {
    const lIdx = lKeys.indexOf(key)
    const rIdx = rKeys.indexOf(key)
    const lChild = lIdx !== -1 ? lChildren[lIdx] : null
    const rChild = rIdx !== -1 ? rChildren[rIdx] : null
    const childPath = [...path, key.replace(/_0$/, '')]

    if (lChild && !rChild) {
      diffs.push({
        type: 'removed',
        path: childPath,
        tag: lChild.tag,
        leftRange: { from: lChild.from, to: lChild.to }
      })
    } else if (!lChild && rChild) {
      diffs.push({
        type: 'added',
        path: childPath,
        tag: rChild.tag,
        rightRange: { from: rChild.from, to: rChild.to }
      })
    } else if (lChild && rChild) {
      diffs.push(...runXmlDiff(lChild, rChild, childPath))
    }
  }

  return diffs
}
