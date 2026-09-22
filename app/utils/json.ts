import { parse } from 'jsonc-parser'

export interface JsonValidationError {
  valid: boolean
  error?: string
  cleanMessage?: string
  line?: number
  column?: number
  position?: number
  rawMessage?: string
}

export function getLineAndColumnFromPosition(source: string, pos: number): { line: number, column: number } {
  const safePos = Math.max(0, Math.min(pos, source.length))
  const lines = source.slice(0, safePos).split('\n')
  const line = lines.length
  const column = (lines[lines.length - 1]?.length ?? 0) + 1
  return { line, column }
}

export function validateJson(source: string): JsonValidationError {
  if (!source || !source.trim()) {
    return {
      valid: false,
      error: 'JSON document is empty',
      cleanMessage: 'Document is empty. Enter or upload valid JSON to format.',
      line: 1,
      column: 1,
      position: 0
    }
  }

  try {
    JSON.parse(source)
    return { valid: true }
  } catch (err: any) {
    const rawMsg = err?.message || String(err)
    let line: number | undefined
    let column: number | undefined
    let position: number | undefined

    // 1. Extract line and column directly from browser error message if available
    const lineColMatch = rawMsg.match(/line\s+(\d+)\s+column\s+(\d+)/i)
    if (lineColMatch) {
      line = parseInt(lineColMatch[1] ?? '1', 10)
      column = parseInt(lineColMatch[2] ?? '1', 10)
    }

    // 2. Extract character offset from error message if available
    const posMatch = rawMsg.match(/(?:position|character|offset)\s+(\d+)/i)
    if (posMatch) {
      position = parseInt(posMatch[1] ?? '0', 10)
      if (!line || !column) {
        const computedLoc = getLineAndColumnFromPosition(source, position)
        line = computedLoc.line
        column = computedLoc.column
      }
    }

    // 3. Fallback to jsonc-parser if line or column not yet resolved
    if (!line || !column) {
      const jsoncErrors: any[] = []
      parse(source, jsoncErrors)
      if (jsoncErrors.length > 0 && jsoncErrors[0]) {
        position = jsoncErrors[0].offset
        const computedLoc = getLineAndColumnFromPosition(source, position ?? 0)
        line = computedLoc.line
        column = computedLoc.column
      }
    }

    if (!line) line = 1
    if (!column) column = 1
    if (position === undefined) {
      const lines = source.split('\n')
      let pos = 0
      for (let i = 0; i < line - 1 && i < lines.length; i++) {
        pos += (lines[i]?.length ?? 0) + 1
      }
      pos += Math.max(0, column - 1)
      position = pos
    }

    let cleanMessage = rawMsg
      .replace(/^SyntaxError:\s*/i, '')
      .replace(/^JSON\.parse:\s*/i, '')
      .replace(/\s+in JSON at position \d+.*$/i, '')
      .replace(/\s+at line \d+ column \d+.*$/i, '')
      .replace(/\s+at position \d+.*$/i, '')
      .trim()

    if (!cleanMessage) cleanMessage = rawMsg

    return {
      valid: false,
      error: `Invalid JSON — line ${line}, column ${column}: ${cleanMessage}`,
      cleanMessage,
      line,
      column,
      position,
      rawMessage: rawMsg
    }
  }
}

export function expandStringifiedJson(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj

  const targetKeys = ['data', 'payload']

  if (Array.isArray(obj)) {
    return obj.map(item => expandStringifiedJson(item))
  }

  const newObj: Record<string, any> = { ...obj }

  for (const key in newObj) {
    if (targetKeys.includes(key) && typeof newObj[key] === 'string') {
      try {
        const trimmed = newObj[key].trim()
        if (
          (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
          (trimmed.startsWith('[') && trimmed.endsWith(']'))
        ) {
          newObj[key] = expandStringifiedJson(JSON.parse(newObj[key]))
        }
      } catch (e) {
        // Not valid JSON, keep as is
      }
    } else if (newObj[key] && typeof newObj[key] === 'object') {
      newObj[key] = expandStringifiedJson(newObj[key])
    }
  }

  return newObj
}

export function formatJson(source: string, autoParse: boolean = false): string {
  const parsed = JSON.parse(source)
  const target = autoParse ? expandStringifiedJson(parsed) : parsed
  return JSON.stringify(target, null, 2)
}
