<template>
  <div class="flex flex-col gap-5 h-full">
    <!-- Header Controls / Action Row -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <button 
          @click="compareJsonDiff"
          class="px-6 py-2.5 bg-[#7C00FF] hover:bg-[#6500DB] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
        >
          Compare JSON
        </button>
        <button 
          @click="clearAll"
          class="px-5 py-2.5 text-sm font-bold text-[#8590AA] hover:text-[#16032F] border border-[#E8E3EF] hover:border-[#DDD6E8] hover:bg-[#F8F4FF] rounded-xl transition-all cursor-pointer"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Status & Validation Banner Area (Immediately Visible Above Editors) -->
    <div v-if="compareClicked" class="flex flex-col gap-2">
      <!-- Validation Errors Banner -->
      <div 
        v-if="validationErrors.length > 0" 
        class="flex flex-col gap-3 p-4 bg-rose-50 border border-rose-200/90 rounded-2xl text-rose-950 animate-in fade-in duration-200 shadow-sm"
      >
        <div 
          v-for="err in validationErrors" 
          :key="err.side" 
          class="flex items-start gap-3 text-sm"
        >
          <div class="p-1 bg-rose-100 rounded-lg text-rose-700 shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-rose-900 tracking-tight">
              {{ err.side.toUpperCase() }} JSON is invalid — line {{ err.line }}, column {{ err.column }}:
            </span>
            <span class="text-xs text-rose-700 font-mono mt-0.5">
              {{ err.cleanMessage }}
            </span>
          </div>
        </div>
      </div>

      <!-- No Differences Found Banner -->
      <div 
        v-else-if="diffResult && diffResult.length === 0" 
        class="flex items-center gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 animate-in fade-in duration-200 shadow-sm"
      >
        <div class="p-1 bg-emerald-100 rounded-lg text-emerald-700 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <span class="text-sm font-bold text-emerald-950 font-mono tracking-wide">
          No differences found.
        </span>
      </div>

      <!-- Successful Diff with Differences Found -->
      <div 
        v-else-if="diffResult && diffResult.length > 0" 
        class="flex items-center gap-2.5 px-4 py-3 bg-[#F3EDFF] border border-[#E8E3EF] rounded-2xl text-[#16032F] animate-in fade-in duration-200 shadow-sm"
      >
        <div class="p-1 bg-[#E0CBFF] rounded-lg text-[#7C00FF] shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <span class="text-sm font-bold text-[#16032F] font-mono tracking-wide">
          {{ diffResult.length }} {{ diffResult.length === 1 ? 'difference' : 'differences' }} found
        </span>
      </div>
    </div>

    <!-- Editors Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Editor -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#8590AA] uppercase tracking-wider font-mono">Left JSON</span>
            <span 
              v-if="leftError" 
              class="text-[11px] font-bold text-rose-600 font-mono bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 animate-in fade-in"
            >
              Invalid JSON — line {{ leftError.line }}, col {{ leftError.column }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="file"
              ref="leftFileInput"
              class="hidden"
              accept=".json,.txt"
              @change="handleLeftUpload"
            />
            <button 
              @click="triggerLeftUpload"
              class="text-xs font-semibold text-[#8590AA] hover:text-[#7C00FF] flex items-center gap-1 transition-colors cursor-pointer"
            >
              Upload
            </button>
            <span class="text-[#DDD6E8] text-xs font-semibold">|</span>
            <button 
              @click="clearLeft"
              class="text-xs font-semibold text-[#8590AA] hover:text-rose-600 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
        
        <!-- Interactive Workspace -->
        <div class="h-[500px] lg:h-[650px] bg-[#120024] rounded-2xl relative border border-[#302E40] overflow-hidden shadow-inner shadow-black/30">
          <div ref="leftEditorContainer" class="h-full w-full"></div>
        </div>
      </div>

      <!-- Right Editor -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#8590AA] uppercase tracking-wider font-mono">Right JSON</span>
            <span 
              v-if="rightError" 
              class="text-[11px] font-bold text-rose-600 font-mono bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 animate-in fade-in"
            >
              Invalid JSON — line {{ rightError.line }}, col {{ rightError.column }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="file"
              ref="rightFileInput"
              class="hidden"
              accept=".json,.txt"
              @change="handleRightUpload"
            />
            <button 
              @click="triggerRightUpload"
              class="text-xs font-semibold text-[#8590AA] hover:text-[#7C00FF] flex items-center gap-1 transition-colors cursor-pointer"
            >
              Upload
            </button>
            <span class="text-[#DDD6E8] text-xs font-semibold">|</span>
            <button 
              @click="clearRight"
              class="text-xs font-semibold text-[#8590AA] hover:text-rose-600 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
        
        <!-- Interactive Workspace -->
        <div class="h-[500px] lg:h-[650px] bg-[#120024] rounded-2xl relative border border-[#302E40] overflow-hidden shadow-inner shadow-black/30">
          <div ref="rightEditorContainer" class="h-full w-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { parse, parseTree, findNodeAtLocation } from 'jsonc-parser'

type DiffType = 'added' | 'removed' | 'changed';

interface DiffItem {
  type: DiffType;
  path: (string | number)[];
  leftValue?: unknown;
  rightValue?: unknown;
}

interface JsonParseError {
  side: 'left' | 'right';
  message: string;
  cleanMessage: string;
  position?: number;
  line: number;
  column: number;
}

const leftInput = ref('')
const rightInput = ref('')
const leftError = ref<JsonParseError | null>(null)
const rightError = ref<JsonParseError | null>(null)
const diffResult = ref<DiffItem[] | null>(null)
const compareClicked = ref(false)

const validationErrors = computed(() => {
  const errors: JsonParseError[] = []
  if (leftError.value) errors.push(leftError.value)
  if (rightError.value) errors.push(rightError.value)
  return errors
})

const leftFileInput = ref<HTMLInputElement | null>(null)
const rightFileInput = ref<HTMLInputElement | null>(null)

const leftEditorContainer = ref<HTMLDivElement | null>(null)
const rightEditorContainer = ref<HTMLDivElement | null>(null)

let leftEditor: any = null
let rightEditor: any = null

let setDiffDecorations: any = null
let diffField: any = null
let CMDecoration: any = null
let CMRangeSetBuilder: any = null

onMounted(async () => {
  const { EditorState, StateEffect, StateField, RangeSetBuilder } = await import('@codemirror/state')
  const { EditorView, Decoration } = await import('@codemirror/view')
  const { basicSetup } = await import('codemirror')
  const { json } = await import('@codemirror/lang-json')

  CMDecoration = Decoration
  CMRangeSetBuilder = RangeSetBuilder

  // Define StateEffect ONCE
  setDiffDecorations = StateEffect.define<any>()

  // Define StateField ONCE - completely replaces DecorationSet on every comparison
  diffField = StateField.define<any>({
    create() {
      return Decoration.none
    },
    update(decorations, tr) {
      decorations = decorations.map(tr.changes)
      for (const effect of tr.effects) {
        if (effect.is(setDiffDecorations)) {
          decorations = effect.value
        }
      }
      return decorations
    },
    provide: f => EditorView.decorations.from(f)
  })

  const darkTheme = EditorView.theme({
    "&": {
      color: "#F8F4FF",
      backgroundColor: "#120024"
    },
    ".cm-content": {
      caretColor: "#8500FF",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "14px"
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#8500FF"
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": {
      backgroundColor: "rgba(124, 0, 255, 0.25)"
    },
    ".cm-gutters": {
      backgroundColor: "#120024",
      color: "#8590AA",
      borderRight: "1px solid #302E40",
      borderLeft: "none"
    }
  }, { dark: true })

  if (leftEditorContainer.value) {
    leftEditor = new EditorView({
      state: EditorState.create({
        doc: leftInput.value,
        extensions: [
          basicSetup,
          json(),
          darkTheme,
          diffField,
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) leftInput.value = update.state.doc.toString()
          })
        ]
      }),
      parent: leftEditorContainer.value
    })
  }

  if (rightEditorContainer.value) {
    rightEditor = new EditorView({
      state: EditorState.create({
        doc: rightInput.value,
        extensions: [
          basicSetup,
          json(),
          darkTheme,
          diffField,
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) rightInput.value = update.state.doc.toString()
          })
        ]
      }),
      parent: rightEditorContainer.value
    })
  }
})

onBeforeUnmount(() => {
  if (leftEditor) leftEditor.destroy()
  if (rightEditor) rightEditor.destroy()
})

function triggerLeftUpload() { leftFileInput.value?.click() }
function triggerRightUpload() { rightFileInput.value?.click() }

function handleLeftUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = (e.target?.result as string) || ''
    leftInput.value = text
    if (leftEditor) {
      leftEditor.dispatch({
        changes: { from: 0, to: leftEditor.state.doc.length, insert: text }
      })
      if (setDiffDecorations && CMDecoration) {
        leftEditor.dispatch({ effects: setDiffDecorations.of(CMDecoration.none) })
      }
    }
    leftError.value = null
  }
  reader.onerror = () => {
    leftError.value = {
      side: 'left',
      message: 'Failed to read file',
      cleanMessage: 'Failed to read uploaded file',
      line: 1,
      column: 1
    }
  }
  reader.readAsText(file)
  target.value = ''
}

function handleRightUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = (e.target?.result as string) || ''
    rightInput.value = text
    if (rightEditor) {
      rightEditor.dispatch({
        changes: { from: 0, to: rightEditor.state.doc.length, insert: text }
      })
      if (setDiffDecorations && CMDecoration) {
        rightEditor.dispatch({ effects: setDiffDecorations.of(CMDecoration.none) })
      }
    }
    rightError.value = null
  }
  reader.onerror = () => {
    rightError.value = {
      side: 'right',
      message: 'Failed to read file',
      cleanMessage: 'Failed to read uploaded file',
      line: 1,
      column: 1
    }
  }
  reader.readAsText(file)
  target.value = ''
}

function clearLeft() {
  leftInput.value = ''
  leftError.value = null
  if (leftEditor) {
    leftEditor.dispatch({
      changes: { from: 0, to: leftEditor.state.doc.length, insert: '' }
    })
    if (setDiffDecorations && CMDecoration) {
      leftEditor.dispatch({ effects: setDiffDecorations.of(CMDecoration.none) })
    }
  }
  if (!rightError.value) {
    compareClicked.value = false
    diffResult.value = null
  }
}

function clearRight() {
  rightInput.value = ''
  rightError.value = null
  if (rightEditor) {
    rightEditor.dispatch({
      changes: { from: 0, to: rightEditor.state.doc.length, insert: '' }
    })
    if (setDiffDecorations && CMDecoration) {
      rightEditor.dispatch({ effects: setDiffDecorations.of(CMDecoration.none) })
    }
  }
  if (!leftError.value) {
    compareClicked.value = false
    diffResult.value = null
  }
}

function clearAll() {
  leftInput.value = ''
  rightInput.value = ''
  leftError.value = null
  rightError.value = null
  diffResult.value = null
  compareClicked.value = false

  if (leftEditor) {
    leftEditor.dispatch({
      changes: { from: 0, to: leftEditor.state.doc.length, insert: '' }
    })
    if (setDiffDecorations && CMDecoration) {
      leftEditor.dispatch({ effects: setDiffDecorations.of(CMDecoration.none) })
    }
  }

  if (rightEditor) {
    rightEditor.dispatch({
      changes: { from: 0, to: rightEditor.state.doc.length, insert: '' }
    })
    if (setDiffDecorations && CMDecoration) {
      rightEditor.dispatch({ effects: setDiffDecorations.of(CMDecoration.none) })
    }
  }
}

function getLineAndColumnFromPosition(source: string, pos: number): { line: number, column: number } {
  const safePos = Math.max(0, Math.min(pos, source.length))
  const lines = source.slice(0, safePos).split('\n')
  const line = lines.length
  const column = (lines[lines.length - 1]?.length ?? 0) + 1
  return { line, column }
}

function getJsonParseError(source: string, side: 'left' | 'right'): JsonParseError | null {
  if (!source || !source.trim()) {
    return {
      side,
      message: `${side.toUpperCase()} JSON document is required`,
      cleanMessage: 'Document is empty. Enter or upload valid JSON to compare.',
      line: 1,
      column: 1
    }
  }

  try {
    JSON.parse(source)
    return null
  } catch (err: any) {
    const rawMsg = err?.message || String(err)
    let line: number | undefined
    let column: number | undefined
    let position: number | undefined

    const lineColMatch = rawMsg.match(/line\s+(\d+)\s+column\s+(\d+)/i)
    if (lineColMatch) {
      line = parseInt(lineColMatch[1] ?? '1', 10)
      column = parseInt(lineColMatch[2] ?? '1', 10)
    }

    const posMatch = rawMsg.match(/(?:position|character|offset)\s+(\d+)/i)
    if (posMatch) {
      position = parseInt(posMatch[1] ?? '0', 10)
      if (!line || !column) {
        const computedLoc = getLineAndColumnFromPosition(source, position)
        line = computedLoc.line
        column = computedLoc.column
      }
    }

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

    let cleanMessage = rawMsg
      .replace(/^SyntaxError:\s*/i, '')
      .replace(/^JSON\.parse:\s*/i, '')
      .replace(/\s+in JSON at position \d+.*$/i, '')
      .replace(/\s+at line \d+ column \d+.*$/i, '')
      .replace(/\s+at position \d+.*$/i, '')
      .trim()

    if (!cleanMessage) cleanMessage = rawMsg

    return {
      side,
      message: rawMsg,
      cleanMessage,
      position,
      line,
      column
    }
  }
}

function runJsonDiff(left: any, right: any, pathSegments: (string | number)[] = []): DiffItem[] {
  if (left === right) return []

  const leftType = typeof left
  const rightType = typeof right
  const leftIsNull = left === null
  const rightIsNull = right === null

  if (leftIsNull || rightIsNull || leftType !== 'object' || rightType !== 'object') {
    return [{ type: 'changed', path: pathSegments, leftValue: left, rightValue: right }]
  }

  const leftIsArray = Array.isArray(left)
  const rightIsArray = Array.isArray(right)

  if (leftIsArray !== rightIsArray) {
    return [{ type: 'changed', path: pathSegments, leftValue: left, rightValue: right }]
  }

  if (leftIsArray && rightIsArray) {
    const diffs: DiffItem[] = []
    const maxLength = Math.max(left.length, right.length)
    for (let i = 0; i < maxLength; i++) {
      const segs = [...pathSegments, i]
      const hasLeft = i < left.length
      const hasRight = i < right.length

      if (hasLeft && !hasRight) {
        diffs.push({ type: 'removed', path: segs, leftValue: left[i] })
      } else if (!hasLeft && hasRight) {
        diffs.push({ type: 'added', path: segs, rightValue: right[i] })
      } else {
        diffs.push(...runJsonDiff(left[i], right[i], segs))
      }
    }
    return diffs
  }

  const diffs: DiffItem[] = []
  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)
  const allKeys = new Set([...leftKeys, ...rightKeys])

  for (const key of allKeys) {
    const hasLeft = Object.prototype.hasOwnProperty.call(left, key)
    const hasRight = Object.prototype.hasOwnProperty.call(right, key)
    const segs = [...pathSegments, key]

    if (hasLeft && !hasRight) {
      diffs.push({ type: 'removed', path: segs, leftValue: left[key] })
    } else if (!hasLeft && hasRight) {
      diffs.push({ type: 'added', path: segs, rightValue: right[key] })
    } else {
      diffs.push(...runJsonDiff(left[key], right[key], segs))
    }
  }

  return diffs
}

function getRangeForPath(jsonStr: string, path: (string | number)[]): { from: number, to: number } | null {
  if (path.length === 0) return { from: 0, to: jsonStr.length }
  
  const tree = parseTree(jsonStr)
  if (!tree) return null
  
  const node = findNodeAtLocation(tree, path)
  if (!node) return null

  // If node is part of an object property, the parent node is a 'property' 
  // which includes the property key, colon, and value. We want to highlight the whole property.
  if (node.parent && node.parent.type === 'property') {
    return { from: node.parent.offset, to: node.parent.offset + node.parent.length }
  }
  
  return { from: node.offset, to: node.offset + node.length }
}

function buildDecorations(
  view: any,
  docText: string,
  diffs: DiffItem[],
  side: 'left' | 'right'
): any {
  if (!view || !docText || !diffs || diffs.length === 0 || !CMDecoration || !CMRangeSetBuilder) {
    return CMDecoration ? CMDecoration.none : null
  }

  const lineRanges: { line: number; className: string }[] = []

  for (const item of diffs) {
    if (side === 'left' && (item.type === 'removed' || item.type === 'changed')) {
      const range = getRangeForPath(docText, item.path)
      if (range) {
        const docLength = view.state.doc.length
        const safeFrom = Math.min(Math.max(0, range.from), docLength)
        const safeTo = Math.min(Math.max(0, range.to), docLength)
        const startLine = view.state.doc.lineAt(safeFrom).number
        const endLine = view.state.doc.lineAt(safeTo).number
        const className = item.type === 'removed' ? 'cm-diff-removed' : 'cm-diff-changed'
        for (let i = startLine; i <= endLine; i++) {
          lineRanges.push({ line: i, className })
        }
      }
    } else if (side === 'right' && (item.type === 'added' || item.type === 'changed')) {
      const range = getRangeForPath(docText, item.path)
      if (range) {
        const docLength = view.state.doc.length
        const safeFrom = Math.min(Math.max(0, range.from), docLength)
        const safeTo = Math.min(Math.max(0, range.to), docLength)
        const startLine = view.state.doc.lineAt(safeFrom).number
        const endLine = view.state.doc.lineAt(safeTo).number
        const className = item.type === 'added' ? 'cm-diff-added' : 'cm-diff-changed'
        for (let i = startLine; i <= endLine; i++) {
          lineRanges.push({ line: i, className })
        }
      }
    }
  }

  if (lineRanges.length === 0) {
    return CMDecoration.none
  }

  const sorted = lineRanges.sort((a, b) => a.line - b.line)
  const builder = new CMRangeSetBuilder()
  let lastLine = -1

  for (const hl of sorted) {
    if (hl.line >= 1 && hl.line <= view.state.doc.lines && hl.line !== lastLine) {
      const line = view.state.doc.line(hl.line)
      builder.add(line.from, line.from, CMDecoration.line({
        attributes: { class: hl.className }
      }))
      lastLine = hl.line
    }
  }

  return builder.finish()
}

function buildErrorDecoration(view: any, lineNum: number): any {
  if (!view || !CMDecoration || !CMRangeSetBuilder || lineNum < 1 || lineNum > view.state.doc.lines) {
    return CMDecoration ? CMDecoration.none : null
  }
  const builder = new CMRangeSetBuilder()
  const line = view.state.doc.line(lineNum)
  builder.add(line.from, line.from, CMDecoration.line({
    attributes: { class: 'cm-diff-error' }
  }))
  return builder.finish()
}

function applyDiffDecorations(
  leftView: any,
  rightView: any,
  diffs: DiffItem[],
  finalLeftText: string,
  finalRightText: string
) {
  if (!leftView || !rightView || !setDiffDecorations) return

  const leftDecos = buildDecorations(leftView, finalLeftText, diffs, 'left')
  const rightDecos = buildDecorations(rightView, finalRightText, diffs, 'right')

  leftView.dispatch({
    effects: setDiffDecorations.of(leftDecos)
  })
  rightView.dispatch({
    effects: setDiffDecorations.of(rightDecos)
  })
}

function compareJsonDiff() {
  leftError.value = null
  rightError.value = null
  compareClicked.value = false
  diffResult.value = null

  // 1. Read CURRENT contents of both views
  const currentLeftText = leftEditor ? leftEditor.state.doc.toString() : leftInput.value
  const currentRightText = rightEditor ? rightEditor.state.doc.toString() : rightInput.value

  leftInput.value = currentLeftText
  rightInput.value = currentRightText

  // 2. Validate LEFT and RIGHT JSON
  const leftErr = getJsonParseError(currentLeftText, 'left')
  const rightErr = getJsonParseError(currentRightText, 'right')

  if (leftErr || rightErr) {
    leftError.value = leftErr
    rightError.value = rightErr
    compareClicked.value = true

    // Clear previous diff decorations on both views
    if (leftEditor && setDiffDecorations && CMDecoration) {
      const leftDeco = leftErr ? buildErrorDecoration(leftEditor, leftErr.line) : CMDecoration.none
      leftEditor.dispatch({ effects: setDiffDecorations.of(leftDeco) })
      if (leftErr && leftErr.line >= 1 && leftErr.line <= leftEditor.state.doc.lines) {
        const errorLine = leftEditor.state.doc.line(leftErr.line)
        const targetPos = Math.min(
          errorLine.to,
          errorLine.from + Math.max(0, (leftErr.column ?? 1) - 1)
        )
        leftEditor.dispatch({
          selection: { anchor: targetPos },
          scrollIntoView: true
        })
      }
    }

    if (rightEditor && setDiffDecorations && CMDecoration) {
      const rightDeco = rightErr ? buildErrorDecoration(rightEditor, rightErr.line) : CMDecoration.none
      rightEditor.dispatch({ effects: setDiffDecorations.of(rightDeco) })
      if (rightErr && rightErr.line >= 1 && rightErr.line <= rightEditor.state.doc.lines) {
        const errorLine = rightEditor.state.doc.line(rightErr.line)
        const targetPos = Math.min(
          errorLine.to,
          errorLine.from + Math.max(0, (rightErr.column ?? 1) - 1)
        )
        rightEditor.dispatch({
          selection: { anchor: targetPos },
          scrollIntoView: true
        })
      }
    }

    return
  }

  // 3. Parse valid JSON
  const leftParsed = JSON.parse(currentLeftText)
  const rightParsed = JSON.parse(currentRightText)

  // 4. Create canonical pretty-printed text
  const canonicalLeft = JSON.stringify(leftParsed, null, 2)
  const canonicalRight = JSON.stringify(rightParsed, null, 2)

  // 5. Update CodeMirror documents FIRST before calculating offsets
  if (leftEditor && leftEditor.state.doc.toString() !== canonicalLeft) {
    leftEditor.dispatch({
      changes: { from: 0, to: leftEditor.state.doc.length, insert: canonicalLeft }
    })
  }
  if (rightEditor && rightEditor.state.doc.toString() !== canonicalRight) {
    rightEditor.dispatch({
      changes: { from: 0, to: rightEditor.state.doc.length, insert: canonicalRight }
    })
  }

  // 6. Obtain the FINAL displayed document text from CodeMirror
  const finalLeftText = leftEditor ? leftEditor.state.doc.toString() : canonicalLeft
  const finalRightText = rightEditor ? rightEditor.state.doc.toString() : canonicalRight

  leftInput.value = finalLeftText
  rightInput.value = finalRightText

  // 7. Calculate semantic structural diff
  const diffs = runJsonDiff(leftParsed, rightParsed)
  diffResult.value = diffs
  compareClicked.value = true

  // 8. Build fresh DecorationSets and dispatch to CURRENT CodeMirror views
  applyDiffDecorations(leftEditor, rightEditor, diffs, finalLeftText, finalRightText)
}
</script>

<style scoped>
:deep(.cm-editor) {
  height: 100%;
}
:deep(.cm-scroller) {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 14px !important;
}

/* CodeMirror 6 Custom Scrollbars to blend with theme */
:deep(.cm-scroller)::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
:deep(.cm-scroller)::-webkit-scrollbar-track {
  background: #120024;
}
:deep(.cm-scroller)::-webkit-scrollbar-thumb {
  background: #302E40;
  border-radius: 10px;
  border: 2px solid #120024;
}
:deep(.cm-scroller)::-webkit-scrollbar-thumb:hover {
  background: #424055;
}

/* Subtle, Native Editor-Line Highlights */
:deep(.cm-diff-added) {
  background-color: rgba(6, 78, 59, 0.3) !important; /* dark green */
  border-left: 4px solid #10b981 !important; /* solid green */
}
:deep(.cm-diff-removed) {
  background-color: rgba(136, 19, 55, 0.3) !important; /* dark rose */
  border-left: 4px solid #f43f5e !important; /* solid red */
}
:deep(.cm-diff-changed) {
  background-color: rgba(120, 53, 4, 0.3) !important; /* dark amber */
  border-left: 4px solid #f59e0b !important; /* solid amber */
}

/* Offending Line Highlight on Error */
:deep(.cm-diff-error) {
  background-color: rgba(225, 29, 72, 0.25) !important; /* rose-600 */
  border-left: 4px solid #f43f5e !important; /* solid red/rose */
}
</style>
