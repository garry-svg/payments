<template>
  <div class="flex flex-col gap-4 flex-grow h-full">
    <!-- Action Row (Header Buttons + Validation Error) -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <!-- Validation Error Display (Near Format XML button) -->
      <div class="flex-grow min-w-0">
        <div 
          v-if="error" 
          class="flex items-center gap-2.5 px-3.5 py-2 bg-rose-50 border border-rose-200/90 rounded-xl text-rose-950 text-xs font-mono animate-in fade-in duration-200 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-rose-600 shrink-0">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span class="font-bold text-rose-900 shrink-0">
            Invalid XML — line {{ error.line }}, col {{ error.col }}:
          </span>
          <span class="text-rose-700 truncate">
            {{ error.msg }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 flex-shrink-0">
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept=".xml,.txt"
          @change="handleFileUpload"
        />
        <button 
          @click="clearBuffer"
          class="px-5 py-2 text-sm font-bold text-slate-400 hover:text-slate-900 border border-slate-200 rounded-xl transition-all cursor-pointer"
        >
          Clear_Buffer
        </button>
        <button 
          @click="triggerFileUpload"
          class="px-5 py-2 text-sm font-bold text-slate-400 hover:text-slate-900 border border-slate-200 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Upload_File
        </button>
        <button 
          @click="formatXmlDocument"
          class="px-6 py-2 bg-indigo-950 hover:bg-indigo-900 text-white text-sm font-bold rounded-xl transition-all hover:shadow-lg shadow-indigo-100 flex items-center gap-2 cursor-pointer"
        >
          Format XML
        </button>
      </div>
    </div>

    <!-- Unified Dark Workspace with CodeMirror 6 -->
    <div class="flex-grow flex flex-col relative min-h-[500px] lg:min-h-[650px] bg-slate-950 rounded-[1.5rem] overflow-hidden border border-slate-900 shadow-inner shadow-black/20">
      <!-- Floating Copy Button in Workspace -->
      <div class="absolute top-4 right-4 z-20 flex gap-2">
        <button 
          v-if="hasContent"
          @click="copyResult"
          class="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl cursor-pointer"
        >
          <template v-if="isCopied">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy_Result
          </template>
        </button>
      </div>

      <!-- CodeMirror 6 Editor Container -->
      <div ref="editorContainer" class="absolute inset-0 w-full h-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { validateXml, formatXml } from '~/utils/xml'

interface XmlErrorDetail {
  line: number
  col: number
  msg: string
}

const editorContainer = ref<HTMLDivElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const error = ref<XmlErrorDetail | null>(null)
const isCopied = ref(false)
const hasContent = ref(false)

let editor: any = null
let setErrorDecoration: any = null
let errorField: any = null
let CMDecoration: any = null
let CMRangeSetBuilder: any = null

onMounted(async () => {
  const { EditorState, StateEffect, StateField, RangeSetBuilder } = await import('@codemirror/state')
  const { EditorView, Decoration } = await import('@codemirror/view')
  const { basicSetup } = await import('codemirror')
  const { xml } = await import('@codemirror/lang-xml')

  CMDecoration = Decoration
  CMRangeSetBuilder = RangeSetBuilder

  setErrorDecoration = StateEffect.define<any>()

  errorField = StateField.define<any>({
    create() {
      return Decoration.none
    },
    update(decorations, tr) {
      decorations = decorations.map(tr.changes)
      for (const effect of tr.effects) {
        if (effect.is(setErrorDecoration)) {
          decorations = effect.value
        }
      }
      return decorations
    },
    provide: f => EditorView.decorations.from(f)
  })

  const darkTheme = EditorView.theme({
    "&": {
      color: "#cbd5e1", // slate-300
      backgroundColor: "#020617" // slate-950
    },
    ".cm-content": {
      caretColor: "#38bdf8",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "14px",
      padding: "20px 24px"
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#38bdf8"
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": {
      backgroundColor: "rgba(56, 189, 248, 0.2)"
    },
    ".cm-gutters": {
      backgroundColor: "#020617",
      color: "#475569",
      borderRight: "1px solid #1e293b",
      borderLeft: "none"
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(255, 255, 255, 0.02)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      color: "#94a3b8"
    }
  }, { dark: true })

  if (editorContainer.value) {
    editor = new EditorView({
      state: EditorState.create({
        doc: '',
        extensions: [
          basicSetup,
          xml(),
          darkTheme,
          errorField,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              hasContent.value = update.state.doc.length > 0
              if (error.value) {
                // Clear error highlight when user edits
                error.value = null
                if (setErrorDecoration && CMDecoration) {
                  editor.dispatch({ effects: setErrorDecoration.of(CMDecoration.none) })
                }
              }
            }
          })
        ]
      }),
      parent: editorContainer.value
    })
  }
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})

function formatXmlDocument() {
  if (!editor) return

  const currentText = editor.state.doc.toString()
  if (!currentText.trim()) return

  // 1. Validate XML locally
  const validation = validateXml(currentText)

  if (!validation.valid) {
    error.value = {
      line: validation.line ?? 1,
      col: validation.col ?? 1,
      msg: validation.msg ?? 'Syntax error in XML'
    }

    // Highlight offending line in CodeMirror and scroll to it
    if (setErrorDecoration && CMDecoration && CMRangeSetBuilder && validation.line) {
      if (validation.line >= 1 && validation.line <= editor.state.doc.lines) {
        const errorLine = editor.state.doc.line(validation.line)
        const builder = new CMRangeSetBuilder()
        builder.add(errorLine.from, errorLine.from, CMDecoration.line({
          attributes: { class: 'cm-xml-error' }
        }))
        const targetPos = Math.min(
          errorLine.to,
          errorLine.from + Math.max(0, (validation.col ?? 1) - 1)
        )
        editor.dispatch({
          effects: setErrorDecoration.of(builder.finish()),
          selection: { anchor: targetPos },
          scrollIntoView: true
        })
      }
    }
    return
  }

  // 2. Clear any previous errors & decorations
  error.value = null
  if (setErrorDecoration && CMDecoration) {
    editor.dispatch({ effects: setErrorDecoration.of(CMDecoration.none) })
  }

  // 3. Format locally in browser (Zero backend requests)
  const formatted = formatXml(currentText)

  // 4. Update CodeMirror document (Single source of truth)
  editor.dispatch({
    changes: { from: 0, to: editor.state.doc.length, insert: formatted }
  })
}

function clearBuffer() {
  if (!editor) return
  error.value = null
  editor.dispatch({
    changes: { from: 0, to: editor.state.doc.length, insert: '' },
    effects: setErrorDecoration && CMDecoration ? setErrorDecoration.of(CMDecoration.none) : []
  })
  hasContent.value = false
}

function triggerFileUpload() {
  fileInput.value?.click()
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !editor) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const text = (e.target?.result as string) || ''
    error.value = null
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: text },
      effects: setErrorDecoration && CMDecoration ? setErrorDecoration.of(CMDecoration.none) : []
    })
    hasContent.value = text.length > 0
  }
  reader.readAsText(file)
  target.value = ''
}

async function copyResult() {
  if (!editor) return
  const text = editor.state.doc.toString()
  if (!text) return

  try {
    await navigator.clipboard.writeText(text)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy to clipboard', err)
  }
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
  background: #020617;
}
:deep(.cm-scroller)::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
  border: 2px solid #020617;
}
:deep(.cm-scroller)::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

/* CodeMirror Fold Gutter Styling in Dark Theme */
:deep(.cm-foldGutter) {
  width: 16px;
  cursor: pointer;
}
:deep(.cm-foldGutter span) {
  color: #64748b;
  font-size: 14px;
  line-height: 1;
  transition: color 0.15s ease;
}
:deep(.cm-foldGutter span:hover) {
  color: #38bdf8;
}

/* Fold Placeholder Styling (Native CodeMirror …) */
:deep(.cm-foldPlaceholder) {
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #94a3b8;
  border-radius: 4px;
  padding: 0 4px;
  margin: 0 2px;
  font-size: 11px;
}

/* Offending Line Highlight on Invalid XML */
:deep(.cm-xml-error) {
  background-color: rgba(225, 29, 72, 0.25) !important;
  border-left: 4px solid #f43f5e !important;
}
</style>
