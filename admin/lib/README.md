# admin/lib

편집 화면이 쓰는 바깥 꾸러미를 한 파일로 묶어 둔 곳이에요. 블로그 독자에게는 쓰이지 않아요.

## codemirror.js

본문 칸의 「HTML」 탭이 쓰는 코드 편집기예요. [CodeMirror 6](https://codemirror.net/)(MIT 라이선스)을
`codemirror-entry.js` 한 파일을 들머리로 묶었어요. 「HTML」 탭을 처음 열 때만 받아요.

들어 있는 판: codemirror 6.0.2, @codemirror/state 6.7.6, @codemirror/view 6.43.15,
@codemirror/lang-html 6.4.12, @codemirror/search 6.7.2, @codemirror/commands 6.11.1,
@codemirror/language 6.13.1 (그리고 이들이 끌어오는 @lezer/*, style-mod, w3c-keyname, crelt. 모두 MIT)

다시 묶는 법:

```bash
mkdir cm6 && cd cm6 && npm init -y
npm install codemirror@6.0.2 @codemirror/lang-html @codemirror/state @codemirror/view @codemirror/search esbuild
cp <이 폴더>/codemirror-entry.js entry.js
npx esbuild entry.js --bundle --minify --format=iife --target=es2020 --legal-comments=none --outfile=codemirror.js
```

묶은 뒤에는 편집 화면에서 「HTML」 탭이 열리고, 고친 글이 그대로 저장되는지 확인해요.
