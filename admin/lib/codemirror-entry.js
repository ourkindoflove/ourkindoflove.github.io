// Soyu 편집 화면의 HTML 칸이 쓰는 코드 편집기 꾸러미.
// CodeMirror 6(MIT)을 한 파일로 묶어 window.SoyuCodeEditor 로 내놓는다.
// 다시 만들 때: admin/lib/README.md 를 본다.
import { EditorView, basicSetup } from 'codemirror';
import { EditorState, EditorSelection } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { openSearchPanel } from '@codemirror/search';

const KO = {
  Find: '찾을 말',
  Replace: '바꿀 말',
  next: '다음',
  previous: '이전',
  all: '모두 고르기',
  'match case': '대소문자 구분',
  'by word': '낱말 단위',
  regexp: '정규식',
  replace: '바꾸기',
  'replace all': '모두 바꾸기',
  close: '닫기',
  'current match': '지금 찾은 곳',
  'replaced $ matches': '$곳을 바꿨어요',
  'replaced match on line $': '$번째 줄을 바꿨어요',
  'on line': '줄',
  'Go to line': '줄 번호로 가기',
  go: '가기',
};

const look = EditorView.theme({
  '&': { fontSize: '13px', border: '1px solid var(--soyu-line, #d9dce6)', borderRadius: '8px', backgroundColor: 'var(--soyu-sheet, #fff)' },
  '&.cm-focused': { outline: '2px solid var(--soyu-accent, #365d90)', outlineOffset: '-1px' },
  '.cm-scroller': { fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, 'D2Coding', monospace", lineHeight: '1.6' },
  '.cm-content': { padding: '8px 0' },
  '.cm-gutters': { backgroundColor: 'transparent', border: 'none', color: '#9aa1b3' },
  '.cm-panels': { backgroundColor: 'var(--soyu-tint, #f6f7fa)', color: 'inherit' },
  '.cm-panel.cm-search label': { fontSize: '12px' },
  '.cm-textfield, .cm-button': { fontSize: '13px' },
});

function create({ parent, doc = '', onChange }) {
  let quiet = false;
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc,
      extensions: [
        // 줄바꿈은 \n 만 줄바꿈으로 본다. \r 이 섞인 글도 한 글자도 바뀌지 않고 되돌아온다.
        EditorState.lineSeparator.of('\n'),
        basicSetup,
        html({ autoCloseTags: false }),
        EditorView.lineWrapping,
        EditorState.phrases.of(KO),
        look,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !quiet && onChange) onChange(update.state.doc.toString());
        }),
      ],
    }),
  });

  return {
    view,
    getValue: () => view.state.doc.toString(),
    setValue(text) {
      if (text === view.state.doc.toString()) return;
      quiet = true;
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
      quiet = false;
    },
    select(from, to = from) {
      const max = view.state.doc.length;
      const range = EditorSelection.range(Math.min(from, max), Math.min(to, max));
      view.dispatch({ selection: range, effects: EditorView.scrollIntoView(range, { y: 'center' }) });
    },
    getSelection() {
      const { from, to } = view.state.selection.main;
      return { from, to };
    },
    insert(text) {
      const { from, to } = view.state.selection.main;
      view.dispatch({ changes: { from, to, insert: text }, selection: { anchor: from + text.length } });
    },
    openSearch: () => openSearchPanel(view),
    focus: () => view.focus(),
    destroy: () => view.destroy(),
  };
}

window.SoyuCodeEditor = { create };
