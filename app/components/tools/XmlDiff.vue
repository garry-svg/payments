<template>
  <div class="flex flex-col gap-5 h-full">
    <!-- Header Controls / Action Row -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <button 
          @click="compareXmlDiff"
          class="px-6 py-2.5 bg-[#7C00FF] hover:bg-[#6500DB] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
        >
          Compare XML
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
              {{ err.side.toUpperCase() }} XML is invalid — line {{ err.line }}, column {{ err.col }}:
            </span>
            <span class="text-xs text-rose-700 font-mono mt-0.5">
              {{ err.msg }}
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
            <span class="text-xs font-bold text-[#8590AA] uppercase tracking-wider font-mono">Left XML</span>
            <span 
              v-if="leftError" 
              class="text-[11px] font-bold text-rose-600 font-mono bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 animate-in fade-in"
            >
              Invalid XML — line {{ leftError.line }}, col {{ leftError.col }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="file"
              ref="leftFileInput"
              class="hidden"
              accept=".xml,.txt"
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
            <span class="text-xs font-bold text-[#8590AA] uppercase tracking-wider font-mono">Right XML</span>
            <span 
              v-if="rightError" 
              class="text-[11px] font-bold text-rose-600 font-mono bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 animate-in fade-in"
            >
              Invalid XML — line {{ rightError.line }}, col {{ rightError.col }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="file"
              ref="rightFileInput"
              class="hidden"
              accept=".xml,.txt"
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
import { validateXml, formatXml, parseXmlToAst, runXmlDiff, type XmlDiffItem, type XmlValidationError } from '~/utils/xml'

interface XmlSideError extends XmlValidationError {
  side: 'left' | 'right'
}

const leftInput = ref('')
const rightInput = ref('')
const leftError = ref<XmlSideError | null>(null)
const rightError = ref<XmlSideError | null>(null)
const diffResult = ref<XmlDiffItem[] | null>(null)
const compareClicked = ref(false)

const validationErrors = computed(() => {
  const errors: XmlSideError[] = []
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
  const { xml } = await import('@codemirror/lang-xml')

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
          xml(),
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
          xml(),
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
      valid: false,
      error: 'Failed to read file',
      msg: 'Failed to read uploaded file',
      line: 1,
      col: 1
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
      valid: false,
      error: 'Failed to read file',
      msg: 'Failed to read uploaded file',
      line: 1,
      col: 1
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

function buildXmlDecorations(
  view: any,
  diffs: XmlDiffItem[],
  side: 'left' | 'right'
): any {
  if (!view || !diffs || diffs.length === 0 || !CMDecoration || !CMRangeSetBuilder) {
    return CMDecoration ? CMDecoration.none : null
  }

  const lineRanges: { line: number; className: string }[] = []

  for (const item of diffs) {
    const range = side === 'left' ? item.leftRange : item.rightRange
    if (range) {
      const docLength = view.state.doc.length
      const safeFrom = Math.min(Math.max(0, range.from), docLength)
      const safeTo = Math.min(Math.max(0, range.to), docLength)
      const startLine = view.state.doc.lineAt(safeFrom).number
      const endLine = view.state.doc.lineAt(safeTo).number
      
      let className = 'cm-diff-changed'
      if (item.type === 'removed') className = 'cm-diff-removed'
      else if (item.type === 'added') className = 'cm-diff-added'

      for (let i = startLine; i <= endLine; i++) {
        lineRanges.push({ line: i, className })
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
  diffs: XmlDiffItem[]
) {
  if (!leftView || !rightView || !setDiffDecorations) return

  const leftDecos = buildXmlDecorations(leftView, diffs, 'left')
  const rightDecos = buildXmlDecorations(rightView, diffs, 'right')

  leftView.dispatch({
    effects: setDiffDecorations.of(leftDecos)
  })
  rightView.dispatch({
    effects: setDiffDecorations.of(rightDecos)
  })
}

function compareXmlDiff() {
  leftError.value = null
  rightError.value = null
  compareClicked.value = false
  diffResult.value = null

  // 1. Read CURRENT contents of both views
  const currentLeftText = leftEditor ? leftEditor.state.doc.toString() : leftInput.value
  const currentRightText = rightEditor ? rightEditor.state.doc.toString() : rightInput.value

  leftInput.value = currentLeftText
  rightInput.value = currentRightText

  // 2. Validate LEFT and RIGHT XML
  const leftValidation = validateXml(currentLeftText)
  const rightValidation = validateXml(currentRightText)

  if (!leftValidation.valid || !rightValidation.valid) {
    if (!leftValidation.valid) {
      leftError.value = { ...leftValidation, side: 'left' }
    }
    if (!rightValidation.valid) {
      rightError.value = { ...rightValidation, side: 'right' }
    }
    compareClicked.value = true

    // Clear previous diff decorations on both views
    if (leftEditor && setDiffDecorations && CMDecoration) {
      const leftDeco = leftError.value?.line ? buildErrorDecoration(leftEditor, leftError.value.line) : CMDecoration.none
      leftEditor.dispatch({ effects: setDiffDecorations.of(leftDeco) })
      if (leftError.value?.line && leftError.value.line >= 1 && leftError.value.line <= leftEditor.state.doc.lines) {
        const errorLine = leftEditor.state.doc.line(leftError.value.line)
        const targetPos = Math.min(
          errorLine.to,
          errorLine.from + Math.max(0, (leftError.value.col ?? 1) - 1)
        )
        leftEditor.dispatch({
          selection: { anchor: targetPos },
          scrollIntoView: true
        })
      }
    }

    if (rightEditor && setDiffDecorations && CMDecoration) {
      const rightDeco = rightError.value?.line ? buildErrorDecoration(rightEditor, rightError.value.line) : CMDecoration.none
      rightEditor.dispatch({ effects: setDiffDecorations.of(rightDeco) })
      if (rightError.value?.line && rightError.value.line >= 1 && rightError.value.line <= rightEditor.state.doc.lines) {
        const errorLine = rightEditor.state.doc.line(rightError.value.line)
        const targetPos = Math.min(
          errorLine.to,
          errorLine.from + Math.max(0, (rightError.value.col ?? 1) - 1)
        )
        rightEditor.dispatch({
          selection: { anchor: targetPos },
          scrollIntoView: true
        })
      }
    }

    return
  }

  // 3. Format canonical XML FIRST
  const formattedLeft = formatXml(currentLeftText)
  const formattedRight = formatXml(currentRightText)

  // 4. Update CodeMirror documents FIRST before calculating offsets
  if (leftEditor && leftEditor.state.doc.toString() !== formattedLeft) {
    leftEditor.dispatch({
      changes: { from: 0, to: leftEditor.state.doc.length, insert: formattedLeft }
    })
  }
  if (rightEditor && rightEditor.state.doc.toString() !== formattedRight) {
    rightEditor.dispatch({
      changes: { from: 0, to: rightEditor.state.doc.length, insert: formattedRight }
    })
  }

  // 5. Obtain the FINAL displayed document text from CodeMirror
  const finalLeftText = leftEditor ? leftEditor.state.doc.toString() : formattedLeft
  const finalRightText = rightEditor ? rightEditor.state.doc.toString() : formattedRight

  leftInput.value = finalLeftText
  rightInput.value = finalRightText

  // 6. Build fresh AST from the final formatted text
  const astLeft = parseXmlToAst(finalLeftText)
  const astRight = parseXmlToAst(finalRightText)

  // 7. Calculate semantic structural XML diff
  const diffs = runXmlDiff(astLeft, astRight)
  diffResult.value = diffs
  compareClicked.value = true

  // 8. Build fresh DecorationSets and dispatch to CURRENT CodeMirror views
  applyDiffDecorations(leftEditor, rightEditor, diffs)
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

/* CodeMirror Fold Gutter Styling in Dark Theme */
:deep(.cm-foldGutter) {
  width: 16px;
  cursor: pointer;
}
:deep(.cm-foldGutter span) {
  color: #8590AA;
  font-size: 14px;
  line-height: 1;
  transition: color 0.15s ease;
}
:deep(.cm-foldGutter span:hover) {
  color: #8500FF;
}

/* Fold Placeholder Styling */
:deep(.cm-foldPlaceholder) {
  background-color: #302E40;
  border: 1px solid #424055;
  color: #DDD6E8;
  border-radius: 4px;
  padding: 0 4px;
  margin: 0 2px;
  font-size: 11px;
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
