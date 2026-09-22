import { XMLValidator } from 'fast-xml-parser'

export interface XmlValidationError {
  valid: boolean
  error?: string
  line?: number
  col?: number
  msg?: string
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
