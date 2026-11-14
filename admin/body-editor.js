// admin/body-editor.js — Sveltia 편집 화면의 본문 칸.
//
// 본문은 HTML을 적힌 그대로 저장한다. 이 칸은 그 원문을 세 가지 모습으로 보여 준다.
//   보이는 대로  블로그에 보이는 모습 그대로 띄우고, 글자를 눌러 바로 고친다.
//   HTML         색이 입혀진 코드 편집기(lib/codemirror.js, 처음 열 때 받는다).
//   찾아 바꾸기  본문의 글자에서만 찾아 바꾼다. 태그와 속성은 건드리지 않는다.
// 그리고 「그림 넣기」: 누른 자리에 그림을 올려 넣는다.
//
// 가장 중요한 약속: 고친 글자만 원문의 그 자리에 바꿔 넣고, 나머지는 한 글자도 바꾸지 않는다.
// 브라우저가 그린 화면(DOM)을 다시 HTML로 적어 저장하면 따옴표, 빈칸, 태그 모양이 통째로 바뀌어
// 로그 글이 망가진다. 그래서 그렇게 하지 않고, 원문에서 "태그 밖의 글자 토막"이 어디서 어디까지인지
// 적어 두었다가(scan), 화면의 글자 마디와 차례대로 짝을 짓는다(align). 화면에서 글자를 고치면
// 그 토막의 바뀐 부분만 원문에 반영한다(applyEdit). 짝을 짓지 못한 글자는 화면에서 고칠 수 없고,
// HTML 칸에서 고친다.
//
// 화면은 액자(iframe) 안에 그린다. 글이 가진 <style>이 편집 화면으로 새지 않고, 스크립트는 돌지 않는다.

/* global CMS, createClass, h */
(function () {
  'use strict';

  var HERE = (document.currentScript && document.currentScript.src) || '';
  var BASE = HERE.replace(/[^/]*$/, '');
  var BLOG_CSS = '/assets/css/jekyll-theme-chirpy.css';
  var FONT_CSS = 'https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap';
  var STANDALONE = /^\s*(?:<!doctype\s+html|<html[\s>])/i; // 통째 HTML 작품 (_plugins/standalone-works.rb)
  var MARKER = /\\?\[\s*삽화\s*(\d+)\s*\\?\]/g; // (_plugins/post-illustrations.rb)
  var MD_IMAGE = /!\[([^\]\n]*)\]\(\s*([^\s()]+)(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g; // (_plugins/markdown-image-rescue.rb)

  /* ───────── 원문 읽기 ───────── */

  // 안의 내용이 글자가 아닌 태그. 닫는 태그까지 통째로 건너뛴다.
  var RAW_TEXT = { script: 1, style: 1, textarea: 1, title: 1, xmp: 1, iframe: 1, noembed: 1, noframes: 1 };
  var LETTER = /[A-Za-z]/;
  var SPACE = /\s/;

  // 태그 하나의 끝(> 다음 자리)을 찾는다. 따옴표로 싼 속성값 안의 > 는 끝이 아니다.
  function tagEnd(source, at) {
    var n = source.length;
    var i = at;
    while (i < n && !SPACE.test(source.charAt(i)) && source.charAt(i) !== '>' && source.charAt(i) !== '/') i++;
    while (i < n) {
      var c = source.charAt(i);
      if (c === '>') return i + 1;
      if (SPACE.test(c) || c === '/') { i++; continue; }
      while (i < n && !SPACE.test(source.charAt(i)) && '=>/'.indexOf(source.charAt(i)) < 0) i++; // 속성 이름
      while (i < n && SPACE.test(source.charAt(i))) i++;
      if (source.charAt(i) !== '=') continue;
      i++;
      while (i < n && SPACE.test(source.charAt(i))) i++;
      var quote = source.charAt(i);
      if (quote === '"' || quote === "'") {
        var close = source.indexOf(quote, i + 1);
        i = close < 0 ? n : close + 1;
      } else {
        while (i < n && !SPACE.test(source.charAt(i)) && source.charAt(i) !== '>') i++;
      }
    }
    return n;
  }

  // 원문에서 태그 밖의 글자 토막을 차례대로 찾는다: [{ start, end }]
  function scan(source) {
    var texts = [];
    var n = source.length;
    var i = 0;
    var textStart = 0;

    function cut(end, next) {
      if (end > textStart) texts.push({ start: textStart, end: end });
      i = next;
      textStart = next;
    }

    while (i < n) {
      var lt = source.indexOf('<', i);
      if (lt < 0) break;
      var next = source.charAt(lt + 1);

      if (source.startsWith('<!--', lt)) {
        var close = source.indexOf('-->', lt + 4);
        cut(lt, close < 0 ? n : close + 3);
      } else if (next === '!' || next === '?') {
        var gt = source.indexOf('>', lt);
        cut(lt, gt < 0 ? n : gt + 1);
      } else {
        var isEnd = next === '/';
        var nameStart = lt + (isEnd ? 2 : 1);
        if (!LETTER.test(source.charAt(nameStart))) {
          i = lt + 1; // 태그가 아닌, 글자로 쓰인 <
        } else {
          var nameEnd = nameStart;
          while (nameEnd < n && !SPACE.test(source.charAt(nameEnd)) && source.charAt(nameEnd) !== '>' && source.charAt(nameEnd) !== '/') nameEnd++;
          var name = source.slice(nameStart, nameEnd).toLowerCase();
          var end = tagEnd(source, nameStart);
          if (!isEnd && RAW_TEXT[name]) {
            var closer = new RegExp('</' + name + '(?=[\\s/>])', 'ig');
            closer.lastIndex = end;
            var found = closer.exec(source);
            end = found ? found.index : n;
          }
          cut(lt, end);
        }
      }
    }
    if (n > textStart) texts.push({ start: textStart, end: n });
    return texts;
  }

  /* ───────── 글자 토막 풀기 ─────────
     원문의 &hellip; 같은 이름표는 화면에서 글자 하나(…)다. 화면의 몇 번째 글자가 원문의 어디인지 알아야
     바뀐 부분만 바꿔 넣을 수 있다. from[k] = 화면 글자 k가 시작하는 원문 자리(토막 안에서). */

  var ENTITY = /&(?:#[0-9]+|#[xX][0-9a-fA-F]+|[A-Za-z][A-Za-z0-9]*);?/g;
  var decoder = document.createElement('textarea');

  function decodeEntity(raw) {
    decoder.innerHTML = raw;
    return decoder.value;
  }

  function decode(raw) {
    if (raw.indexOf('&') < 0) return { dec: raw, from: null };
    var dec = '';
    var from = [];
    var last = 0;
    var m;
    var k;
    ENTITY.lastIndex = 0;
    while ((m = ENTITY.exec(raw))) {
      for (k = last; k < m.index; k++) from.push(k);
      dec += raw.slice(last, m.index);
      var plain = decodeEntity(m[0]);
      if (plain === m[0]) {
        for (k = 0; k < m[0].length; k++) from.push(m.index + k);
      } else {
        for (k = 0; k < plain.length; k++) from.push(m.index);
      }
      dec += plain;
      last = m.index + m[0].length;
    }
    for (k = last; k < raw.length; k++) from.push(k);
    dec += raw.slice(last);
    return { dec: dec, from: from };
  }

  function makeToken(source, range) {
    var raw = source.slice(range.start, range.end);
    var d = decode(raw);
    return { start: range.start, end: range.end, raw: raw, dec: d.dec, from: d.from, node: null };
  }

  // 화면 글자 k가 시작하는 원문 자리(토막 안에서).
  function rawPos(token, k) {
    if (k >= token.dec.length) return token.raw.length;
    return token.from ? token.from[k] : k;
  }

  // 이름표 하나가 화면 글자 여러 개로 풀린 경우, 그 한가운데를 자르지 않게 경계를 민다.
  function snapDown(token, k) {
    if (!token.from) return k;
    while (k > 0 && k < token.dec.length && token.from[k] === token.from[k - 1]) k--;
    return k;
  }

  function snapUp(token, k) {
    if (!token.from) return k;
    while (k > 0 && k < token.dec.length && token.from[k] === token.from[k - 1]) k++;
    return k;
  }

  // 화면에서 친 글자를 원문에 넣을 모양으로. 줄바꿈과 끊기지 않는 빈칸(브라우저가 끼워 넣는다)은 보통 빈칸으로.
  function encodeText(text) {
    return text
      .replace(/[\r\n]+/g, ' ')
      .replace(/ /g, ' ')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttr(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function isHigh(code) { return code >= 0xd800 && code <= 0xdbff; }

  // 두 글에서 앞뒤로 같은 부분을 빼고, 달라진 가운데만 찾는다.
  function changedSpan(before, after) {
    var max = Math.min(before.length, after.length);
    var head = 0;
    while (head < max && before.charCodeAt(head) === after.charCodeAt(head)) head++;
    if (head > 0 && isHigh(before.charCodeAt(head - 1))) head--;
    var tail = 0;
    while (tail < max - head && before.charCodeAt(before.length - 1 - tail) === after.charCodeAt(after.length - 1 - tail)) tail++;
    if (tail > 0 && isHigh(before.charCodeAt(before.length - tail - 1))) tail--;
    return { from: head, to: before.length - tail, tail: tail };
  }

  /* ───────── 원문 한 벌 ─────────
     source(원문)와 tokens(글자 토막)를 함께 들고, 고칠 때마다 둘을 같이 맞춘다. */

  function Model(source) {
    this.load(source);
  }

  Model.prototype.load = function (source) {
    this.source = String(source == null ? '' : source);
    this.standalone = STANDALONE.test(this.source);
    var self = this;
    this.tokens = scan(this.source).map(function (range) { return makeToken(self.source, range); });
  };

  // 원문의 [from, to)를 text로 바꾼다. index번째 토막 안의 변화라고 알려 주면 뒤 토막들의 자리만 민다.
  Model.prototype.splice = function (from, to, text, index) {
    this.source = this.source.slice(0, from) + text + this.source.slice(to);
    var delta = text.length - (to - from);
    var token = this.tokens[index];
    token.end += delta;
    token.raw = this.source.slice(token.start, token.end);
    var d = decode(token.raw);
    token.dec = d.dec;
    token.from = d.from;
    for (var i = index + 1; i < this.tokens.length; i++) {
      this.tokens[i].start += delta;
      this.tokens[i].end += delta;
    }
  };

  // index번째 토막의 화면 글자를 after로 바꾼다. 달라진 가운데만 원문에 반영한다. 바뀌었으면 true.
  Model.prototype.applyEdit = function (index, after) {
    var token = this.tokens[index];
    var before = token.dec;
    if (after === before) return false;
    var span = changedSpan(before, after);
    var a = snapDown(token, span.from);
    var b = snapUp(token, span.to);
    var middle = after.slice(a, after.length - (before.length - b));
    this.splice(token.start + rawPos(token, a), token.start + rawPos(token, b), encodeText(middle), index);
    return true;
  };

  // index번째 토막의 화면 글자 [a, b)를 text로 바꾼다(찾아 바꾸기).
  Model.prototype.replaceIn = function (index, a, b, text) {
    var token = this.tokens[index];
    a = snapDown(token, a);
    b = snapUp(token, b);
    this.splice(token.start + rawPos(token, a), token.start + rawPos(token, b), encodeText(text), index);
  };

  // 화면 글자 자리 → 원문 자리.
  Model.prototype.sourceOffset = function (index, k) {
    var token = this.tokens[index];
    return token.start + rawPos(token, snapDown(token, Math.max(0, Math.min(k, token.dec.length))));
  };

  // 원문 자리가 든(또는 바로 뒤의) 토막 번호.
  Model.prototype.tokenAt = function (offset) {
    for (var i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].end >= offset && /\S/.test(this.tokens[i].dec)) return i;
    }
    return -1;
  };

  /* ───────── 액자에 그리기 ───────── */

  var FRAME_CSS = [
    'html[data-soyu-frame] { scroll-behavior: auto; }',
    'body.soyu-frame { margin: 0; padding: 14px 18px 48px; animation: none; }',
    'body.soyu-frame .content img { max-width: 100%; height: auto; }',
    'body.soyu-frame .content:empty::before { content: "본문이 비어 있어요"; color: #9aa1b3; font: 14px/1.6 sans-serif; }',
    '.soyu-edit { outline: 2px solid #365d90; outline-offset: 2px; border-radius: 2px; background: rgba(54, 93, 144, 0.08); cursor: text; }',
    '.soyu-decor { display: block; margin: 0.6em 0; padding: 0.5em; border: 1px dashed #c3c9d8; border-radius: 8px; text-align: center; font: 12px/1.5 sans-serif; color: #6c7183; -webkit-user-select: none; user-select: none; }',
    '.soyu-decor img { display: block; max-width: 100%; height: auto; margin: 0 auto 0.3em; }',
    '@keyframes soyu-flash { from { background: #ffe08a; } to { background: transparent; } }',
    '.soyu-flash { animation: soyu-flash 1.6s ease-out; border-radius: 3px; }',
  ].join('\n');

  // 원문을 액자 문서로 감싼다. 원문 자체에는 손대지 않는다(통째 HTML 작품은 <head> 뒤에 몇 줄 끼울 뿐).
  function frameDocument(model) {
    var guard = '<meta http-equiv="Content-Security-Policy" content="script-src \'none\'">';
    var style = '<style data-soyu>' + FRAME_CSS + '</style>';
    if (model.standalone) {
      var extra = guard + '<base target="_blank">' + style;
      if (/<head[^>]*>/i.test(model.source)) return model.source.replace(/<head[^>]*>/i, function (head) { return head + extra; });
      if (/^\s*<!doctype[^>]*>/i.test(model.source)) return model.source.replace(/^\s*<!doctype[^>]*>/i, function (doctype) { return doctype + extra; });
      return extra + model.source;
    }
    return '<!doctype html><html lang="ko" data-mode="light" data-soyu-frame><head><meta charset="utf-8">' + guard
      + '<base target="_blank"><link rel="stylesheet" href="' + FONT_CSS + '"><link rel="stylesheet" href="' + BLOG_CSS + '">' + style
      + '</head><body class="soyu-frame"><main><article class="px-1"><div class="content">' + model.source
      + '</div></article></main></body></html>';
  }

  var SKIP_PARENT = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, TITLE: 1, XMP: 1, IFRAME: 1, NOEMBED: 1, NOFRAMES: 1, TEMPLATE: 1 };

  function textNodes(doc) {
    var root = doc.documentElement;
    var out = [];
    if (!root) return out;
    var walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */, null);
    var node;
    while ((node = walker.nextNode())) {
      if (!/\S/.test(node.data)) continue;
      if (node.parentNode && SKIP_PARENT[node.parentNode.nodeName]) continue;
      out.push(node);
    }
    return out;
  }

  // 원문의 글자 토막과 화면의 글자 마디를 차례대로 짝짓는다. 내용이 똑같은 것끼리만 짝이 된다.
  // 브라우저가 글자를 옮기거나(표 안의 글자) 합친 곳에서는 몇 칸 앞을 내다보고 다시 맞춘다.
  function align(model, doc) {
    var nodes = textNodes(doc);
    var tokens = model.tokens;
    var visible = [];
    var i;
    for (i = 0; i < tokens.length; i++) {
      tokens[i].node = null;
      if (/\S/.test(tokens[i].dec)) visible.push(i);
    }

    var map = new Map(); // 글자 마디 → 토막 번호
    var LOOK = 8;
    var t = 0;
    var d = 0;
    while (t < visible.length && d < nodes.length) {
      var token = tokens[visible[t]];
      var node = nodes[d];
      if (token.dec === node.data) {
        token.node = node;
        map.set(node, visible[t]);
        t++; d++;
        continue;
      }
      var moved = false;
      var k;
      for (k = 1; k <= LOOK && !moved; k++) {
        if (t + k < visible.length && tokens[visible[t + k]].dec === node.data) { t += k; moved = true; }
        else if (d + k < nodes.length && nodes[d + k].data === token.dec) { d += k; moved = true; }
      }
      if (!moved) { t++; d++; }
    }
    return { map: map, total: visible.length, paired: map.size, nodes: nodes.length };
  }

  function caretAt(doc, x, y) {
    if (doc.caretPositionFromPoint) {
      var pos = doc.caretPositionFromPoint(x, y);
      return pos ? { node: pos.offsetNode, offset: pos.offset } : null;
    }
    if (doc.caretRangeFromPoint) {
      var range = doc.caretRangeFromPoint(x, y);
      return range ? { node: range.startContainer, offset: range.startOffset } : null;
    }
    return null;
  }

  // 누른 자리가 정말 그 글자 위인지(빈 곳을 눌러도 가장 가까운 글자가 잡히므로 확인한다).
  function pointOnNode(doc, node, x, y) {
    var range = doc.createRange();
    range.selectNodeContents(node);
    var rects = range.getClientRects();
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 4 && y <= r.bottom + 4) return true;
    }
    return false;
  }

  function assetUrl(getAsset, path) {
    if (!path || !getAsset) return path || '';
    try {
      var asset = getAsset(path);
      if (!asset) return path;
      return asset.url || String(asset);
    } catch (e) {
      return path;
    }
  }

  function plain(value) {
    return value && typeof value.toJS === 'function' ? value.toJS() : value;
  }

  /* ───────── 편집기 ───────── */

  var STYLE_ID = 'soyu-body-style';
  var UI_CSS = [
    '.soyu-body { --soyu-accent: #365d90; --soyu-line: color-mix(in srgb, currentColor 22%, transparent); --soyu-tint: color-mix(in srgb, currentColor 6%, transparent); display: flex; flex-direction: column; gap: 8px; min-width: 0; }',
    '.soyu-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }',
    '.soyu-tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-right: auto; }',
    '.soyu-body button { flex: none; font: inherit; font-size: 14px; min-height: 36px; padding: 0 14px; border: 1px solid var(--soyu-line); border-radius: 999px; background: transparent; color: inherit; cursor: pointer; white-space: nowrap; }',
    '.soyu-body button[aria-selected="true"] { background: var(--soyu-accent); border-color: var(--soyu-accent); color: #fff; }',
    '.soyu-body button:disabled { opacity: 0.45; cursor: default; }',
    '.soyu-body button:focus-visible, .soyu-body input:focus-visible { outline: 2px solid var(--soyu-accent); outline-offset: 2px; }',
    '.soyu-note { margin: 0; font-size: 13px; line-height: 1.5; opacity: 0.8; min-height: 1.5em; }',
    '.soyu-note[data-kind="warn"] { opacity: 1; color: #a8552a; }',
    '.soyu-panel[hidden] { display: none; }',
    '.soyu-frame-box { border: 1px solid var(--soyu-line); border-radius: 8px; overflow: hidden; background: #fffbfb; }',
    '.soyu-frame-box iframe { display: block; width: 100%; height: min(72vh, 900px); border: 0; }',
    '.soyu-code .cm-editor { height: min(72vh, 900px); }',
    '.soyu-code textarea { box-sizing: border-box; width: 100%; height: min(72vh, 900px); font: 13px/1.6 ui-monospace, Menlo, Consolas, monospace; padding: 8px; border: 1px solid var(--soyu-line); border-radius: 8px; background: transparent; color: inherit; }',
    '.soyu-find { display: flex; flex-direction: column; gap: 8px; }',
    '.soyu-find-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }',
    '.soyu-find input { font: inherit; font-size: 15px; min-height: 36px; padding: 0 10px; flex: 1 1 10rem; min-width: 0; border: 1px solid var(--soyu-line); border-radius: 8px; background: transparent; color: inherit; }',
    '.soyu-hits { list-style: none; margin: 0; padding: 0; max-height: min(52vh, 640px); overflow: auto; border: 1px solid var(--soyu-line); border-radius: 8px; }',
    '.soyu-hits:empty { display: none; }',
    '.soyu-hits li { display: flex; gap: 8px; align-items: center; padding: 6px 10px; border-bottom: 1px solid var(--soyu-line); font-size: 14px; line-height: 1.5; }',
    '.soyu-hits li:last-child { border-bottom: 0; }',
    '.soyu-hits .soyu-hit-text { flex: 1 1 auto; min-width: 0; text-align: left; border: 0; border-radius: 6px; min-height: 0; padding: 4px 6px; white-space: normal; word-break: keep-all; overflow-wrap: anywhere; }',
    '.soyu-hits mark { background: #ffe08a; color: #222; border-radius: 3px; padding: 0 2px; }',
    '.soyu-alt { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }',
    '.soyu-alt[hidden] { display: none; }',
    '.soyu-alt input { font: inherit; font-size: 15px; min-height: 36px; padding: 0 10px; flex: 1 1 12rem; min-width: 0; border: 1px solid var(--soyu-line); border-radius: 8px; background: transparent; color: inherit; }',
  ].join('\n');

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === 'text') node.textContent = attrs[key];
      else if (key === 'class') node.className = attrs[key];
      else if (attrs[key] === true) node.setAttribute(key, '');
      else if (attrs[key] !== false && attrs[key] != null) node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }

  var codeEditorLoading = null;
  function loadCodeEditor() {
    if (window.SoyuCodeEditor) return Promise.resolve(window.SoyuCodeEditor);
    if (!codeEditorLoading) {
      codeEditorLoading = new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = BASE + 'lib/codemirror.js';
        script.onload = function () { window.SoyuCodeEditor ? resolve(window.SoyuCodeEditor) : reject(new Error('no editor')); };
        script.onerror = function () { codeEditorLoading = null; reject(new Error('load failed')); };
        document.head.appendChild(script);
      });
    }
    return codeEditorLoading;
  }

  function createEditor(root, options) {
    if (!document.getElementById(STYLE_ID)) {
      document.head.appendChild(el('style', { id: STYLE_ID, text: UI_CSS }));
    }

    var props = options; // { value, onChange, getAsset, pickFile, entry }
    var model = new Model(props.value);
    var view = 'visual';
    var renderedSource = null; // 액자에 지금 그려져 있는 원문
    var pairing = null; // align() 결과
    var edit = null; // 지금 고치는 중인 글자 { index, span, before, caret }
    var armed = null; // 단추 안의 글자를 한 번 누른 상태 { node, time }
    var lastSpot = null; // 마지막으로 누른 자리 { index, offset } (그림 넣기, HTML 칸으로 넘어갈 때 쓴다)
    var code = null; // 코드 편집기
    var codeArea = null; // 코드 편집기를 받지 못했을 때의 글상자
    var codeTimer = null;
    var emitTimer = null;
    var destroyed = false;

    /* ── 뼈대 ── */
    var tabVisual = el('button', { type: 'button', role: 'tab', 'aria-selected': 'true', text: '보이는 대로' });
    var tabCode = el('button', { type: 'button', role: 'tab', 'aria-selected': 'false', text: 'HTML' });
    var tabFind = el('button', { type: 'button', role: 'tab', 'aria-selected': 'false', text: '찾아 바꾸기' });
    var imageButton = el('button', { type: 'button', text: '그림 넣기' });
    var note = el('p', { class: 'soyu-note', 'aria-live': 'polite' });

    var altInput = el('input', { type: 'text', placeholder: '그림 설명 (그림을 못 볼 때 읽히는 글, 비워도 돼요)', 'aria-label': '그림 설명' });
    var altOk = el('button', { type: 'button', text: '넣기' });
    var altCancel = el('button', { type: 'button', text: '그만두기' });
    var altRow = el('div', { class: 'soyu-alt', hidden: true }, [altInput, altOk, altCancel]);

    var frame = el('iframe', { title: '본문을 보이는 대로 고치기' });
    var panelVisual = el('div', { class: 'soyu-panel soyu-frame-box', role: 'tabpanel' }, [frame]);
    var panelCode = el('div', { class: 'soyu-panel soyu-code', role: 'tabpanel', hidden: true });

    var findInput = el('input', { type: 'text', placeholder: '찾을 말', 'aria-label': '찾을 말' });
    var replaceInput = el('input', { type: 'text', placeholder: '바꿀 말', 'aria-label': '바꿀 말' });
    var replaceAll = el('button', { type: 'button', text: '모두 바꾸기', disabled: true });
    var hitList = el('ul', { class: 'soyu-hits' });
    var panelFind = el('div', { class: 'soyu-panel soyu-find', role: 'tabpanel', hidden: true }, [
      el('div', { class: 'soyu-find-row' }, [findInput, replaceInput, replaceAll]),
      hitList,
    ]);

    root.appendChild(el('div', { class: 'soyu-bar' }, [
      el('div', { class: 'soyu-tabs', role: 'tablist' }, [tabVisual, tabCode, tabFind]),
      imageButton,
    ]));
    root.appendChild(note);
    root.appendChild(altRow);
    root.appendChild(panelVisual);
    root.appendChild(panelCode);
    root.appendChild(panelFind);

    function say(text, kind) {
      note.textContent = text || '';
      if (kind) note.setAttribute('data-kind', kind); else note.removeAttribute('data-kind');
    }

    function emit() {
      props.onChange(model.source);
    }

    /* ── 보이는 대로 ── */

    function frameDoc() {
      try { return frame.contentDocument; } catch (e) { return null; }
    }

    function defaultNote() {
      if (view === 'code') return say('원문을 그대로 고쳐요. 찾기는 Ctrl+F(맥은 ⌘F)예요.');
      if (view === 'find') return say('본문의 글자에서만 찾아요. 태그와 속성은 건드리지 않아요.');
      if (!pairing) return say('');
      // 여기는 이미 있는 글자를 고치는 칸이다. 누를 글자가 없으면 그렇다고 알려 준다.
      if (!model.source.trim()) return say('본문이 비어 있어요. 여기는 이미 있는 글자를 고치는 칸이라, 새로 쓸 때는 HTML 칸에서 써 주세요.');
      if (!pairing.total) return say('이 글에는 고칠 글자가 없어요(그림이나 꾸밈만 있어요). 다른 것은 HTML 칸에서 고쳐요.');
      var missed = pairing.total - pairing.paired;
      if (missed > 0) {
        say('글자를 눌러 바로 고쳐요. 이 글에는 화면에서 고칠 수 없는 곳이 ' + missed + '군데 있어요. 그곳은 HTML 칸에서 고쳐요.', 'warn');
      } else {
        say('글자를 눌러 바로 고쳐요. Enter를 누르거나 다른 곳을 누르면 반영돼요. Esc는 되돌리기예요.');
      }
    }

    function decorate(doc) {
      // 블로그 빌드가 그림으로 바꿔 주는 자리([삽화N], ![설명](주소))에 그림을 작게 보여 준다. 원문은 그대로다.
      var items = plain(props.entry && props.entry.getIn && props.entry.getIn(['data', 'illust'])) || [];
      pairing.map.forEach(function (index, node) {
        var text = node.data;
        var found = [];
        var m;
        MARKER.lastIndex = 0;
        while ((m = MARKER.exec(text))) {
          var item = items[parseInt(m[1], 10) - 1];
          var it = item && typeof item === 'object' ? item : { image: item };
          if (it && it.image) found.push({ src: it.image, label: '삽화 ' + m[1] + (it.alt ? ' · ' + it.alt : '') });
        }
        MD_IMAGE.lastIndex = 0;
        while ((m = MD_IMAGE.exec(text))) found.push({ src: m[2], label: m[1] || '그림' });
        if (!found.length || !node.parentNode) return;
        var after = node.nextSibling;
        found.forEach(function (one) {
          var box = doc.createElement('span');
          box.className = 'soyu-decor';
          box.setAttribute('contenteditable', 'false');
          var img = doc.createElement('img');
          img.src = assetUrl(props.getAsset, one.src);
          img.alt = '';
          box.appendChild(img);
          box.appendChild(doc.createTextNode(one.label));
          node.parentNode.insertBefore(box, after);
        });
      });

      // 막 올려서 아직 블로그에 없는 그림도 보이게 한다.
      Array.prototype.forEach.call(doc.querySelectorAll('img[src^="/"]'), function (img) {
        var path = img.getAttribute('src');
        var url = assetUrl(props.getAsset, path);
        if (url && url !== path) img.src = url;
      });
    }

    function fitWidgets(doc) {
      Array.prototype.forEach.call(doc.querySelectorAll('.bp-risu'), function (box) {
        box.style.zoom = '';
        var have = box.clientWidth;
        var need = box.scrollWidth;
        if (have > 0 && need > have + 1) box.style.zoom = String(have / need);
      });
    }

    function scrollToToken(index, flash) {
      var doc = frameDoc();
      var token = model.tokens[index];
      if (!doc || !token || !token.node || !token.node.parentNode) return;
      var range = doc.createRange();
      range.selectNodeContents(token.node);
      var rect = range.getBoundingClientRect();
      var win = doc.defaultView;
      win.scrollTo(0, Math.max(0, win.scrollY + rect.top - win.innerHeight / 3));
      var host = token.node.parentNode;
      if (flash && host.classList) {
        host.classList.remove('soyu-flash');
        void host.offsetWidth;
        host.classList.add('soyu-flash');
      }
    }

    function paint(then) {
      var keepScroll = 0;
      var oldDoc = frameDoc();
      if (renderedSource !== null && oldDoc && oldDoc.defaultView) keepScroll = oldDoc.defaultView.scrollY;
      edit = null;
      renderedSource = model.source;
      var painted = model.source;
      frame.onload = function () {
        if (destroyed || painted !== renderedSource) return;
        var doc = frameDoc();
        if (!doc || !doc.querySelector('style[data-soyu]')) return; // 아직 빈 문서다
        pairing = align(model, doc);
        decorate(doc);
        fitWidgets(doc);
        doc.addEventListener('click', onFrameClick, true);
        doc.addEventListener('selectionchange', onFrameSelection);
        doc.addEventListener('keydown', onFrameKey);
        if (doc.defaultView) {
          doc.defaultView.addEventListener('resize', function () { fitWidgets(doc); });
          if (keepScroll) doc.defaultView.scrollTo(0, keepScroll);
        }
        defaultNote();
        if (then) then();
      };
      frame.srcdoc = frameDocument(model);
    }

    function caretOffsetIn(span, node, offset) {
      // span 안에서 (node, offset)까지의 글자 수
      var doc = span.ownerDocument;
      var range = doc.createRange();
      range.selectNodeContents(span);
      try { range.setEnd(node, offset); } catch (e) { return span.textContent.length; }
      return range.toString().length;
    }

    function onFrameSelection() {
      if (!edit) return;
      var doc = frameDoc();
      var selection = doc && doc.getSelection();
      if (selection && selection.rangeCount && edit.span.contains(selection.anchorNode)) {
        edit.caret = caretOffsetIn(edit.span, selection.anchorNode, selection.anchorOffset);
      }
    }

    // 액자 안에서 저장 단축키(Ctrl+S, ⌘S)를 누르면 브라우저의 "페이지 저장"이 뜬다.
    // 그걸 막고, 고치던 글자를 반영한 다음 편집 화면의 저장 단추를 대신 눌러 준다.
    // 저장 단추는 Sveltia가 단축키를 적어 둔 표시(aria-keyshortcuts)로 찾는다. 못 찾으면 반영만 한다.
    function onFrameKey(event) {
      if (!(event.ctrlKey || event.metaKey) || String(event.key).toLowerCase() !== 's') return;
      event.preventDefault();
      if (edit) commitEdit();
      setTimeout(function () {
        var buttons = document.querySelectorAll('button[aria-keyshortcuts]');
        for (var i = 0; i < buttons.length; i++) {
          if (/^(control|meta|accel)\+s$/i.test(buttons[i].getAttribute('aria-keyshortcuts'))) {
            if (!buttons[i].disabled) buttons[i].click();
            return;
          }
        }
        say('고친 글자를 반영했어요. 저장은 위의 저장 단추를 눌러 주세요.');
      }, 200);
    }

    function onFrameClick(event) {
      var doc = frameDoc();
      if (!doc) return;
      var target = event.target;
      if (edit && edit.span.contains(target)) return; // 고치는 글자 안에서의 누름은 브라우저에 맡긴다

      var link = target.closest ? target.closest('a') : null;
      if (link) event.preventDefault(); // 편집 중에 링크를 따라가지 않는다

      var hit = caretAt(doc, event.clientX, event.clientY);
      if (!hit || !hit.node || hit.node.nodeType !== 3) return;
      if (!pairing || !pairing.map.has(hit.node)) {
        if (/\S/.test(hit.node.data) && pointOnNode(doc, hit.node, event.clientX, event.clientY) && !(hit.node.parentNode.closest && hit.node.parentNode.closest('.soyu-decor'))) {
          say('여기는 화면에서 바로 고칠 수 없어요. HTML 칸에서 고쳐 주세요.', 'warn');
        }
        return;
      }
      if (!pointOnNode(doc, hit.node, event.clientX, event.clientY)) return;

      // 누르면 무언가 일어나는 것(선택지 단추, 접는 제목) 안의 글자는 한 번 누르면 원래 하던 일을 하고,
      // 곧바로 한 번 더 누르면 고친다. 그래야 선택지를 눌러 다른 갈래의 글을 볼 수 있다.
      var active = hit.node.parentNode.closest ? hit.node.parentNode.closest('label, summary, button') : null;
      if (active) {
        var now = Date.now();
        if (!armed || armed.node !== hit.node || now - armed.time > 3000) {
          armed = { node: hit.node, time: now };
          say('이 글자는 누르는 단추예요. 고치려면 한 번 더 눌러 주세요.');
          return;
        }
        event.preventDefault(); // 두 번째 누름은 단추로 치지 않는다
      }
      armed = null;
      startEdit(hit.node, hit.offset);
    }

    function startEdit(node, offset) {
      if (edit) commitEdit();
      var doc = node.ownerDocument;
      var index = pairing.map.get(node);
      if (index == null || !node.parentNode) return;

      var span = doc.createElement('span');
      span.className = 'soyu-edit';
      span.setAttribute('contenteditable', 'plaintext-only');
      if (span.contentEditable !== 'plaintext-only') span.setAttribute('contenteditable', 'true');
      span.setAttribute('spellcheck', 'false');
      node.parentNode.insertBefore(span, node);
      span.appendChild(node);

      // shown: 화면에 지금 보이는 글자. 원문 쪽 글자(token.dec)와 길이가 늘 같다(브라우저가 끼워 넣는
      // 끊기지 않는 빈칸만 보통 빈칸으로 다르다). rawBefore: Esc로 되돌릴 때 쓸 원문 그대로.
      edit = {
        index: index, span: span, shown: node.data, rawBefore: model.tokens[index].raw,
        caret: Math.min(offset, node.data.length), dirty: false,
      };
      lastSpot = { index: index, offset: edit.caret };

      span.addEventListener('keydown', function (event) {
        if (event.isComposing || event.keyCode === 229) return; // 한글을 조합하는 중
        if (event.key === 'Enter') { event.preventDefault(); span.blur(); }
        else if (event.key === 'Escape') { event.preventDefault(); cancelEdit(); }
      });
      span.addEventListener('beforeinput', function (event) {
        var type = event.inputType || '';
        if (type === 'insertParagraph' || type === 'insertLineBreak' || type.indexOf('format') === 0) event.preventDefault();
      });
      span.addEventListener('paste', function (event) {
        // 붙여 넣는 것은 글자만, 줄바꿈은 빈칸으로.
        event.preventDefault();
        var text = (event.clipboardData && event.clipboardData.getData('text/plain')) || '';
        doc.execCommand('insertText', false, text.replace(/[\r\n]+/g, ' '));
      });
      span.addEventListener('drop', function (event) { event.preventDefault(); });
      span.addEventListener('input', function () { if (edit && edit.span === span) syncEdit(); });
      span.addEventListener('blur', function () { if (edit && edit.span === span) commitEdit(); });

      span.focus();
      try {
        var selection = doc.getSelection();
        var range = doc.createRange();
        range.setStart(node, edit.caret);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (e) { /* 자리를 못 잡아도 고칠 수는 있다 */ }
      say('고치는 중이에요. Enter를 누르거나 다른 곳을 누르면 반영돼요. Esc는 되돌리기예요.');
    }

    function finishEdit(text) {
      // 고치던 span을 걷어 내고 글자 마디 하나로 되돌린다.
      var current = edit;
      edit = null;
      var span = current.span;
      var doc = span.ownerDocument;
      var token = model.tokens[current.index];
      var node = doc.createTextNode(text);
      if (span.parentNode) span.parentNode.replaceChild(node, span);
      if (token.node) pairing.map.delete(token.node);
      pairing.map.forEach(function (index, key) { if (index === current.index) pairing.map.delete(key); });
      token.node = node;
      pairing.map.set(node, current.index);
      return current;
    }

    // 글자를 칠 때마다 불린다. 방금 달라진 한 군데만 원문에 반영한다.
    // 한꺼번에 모아서 반영하면, 두 군데를 고쳤을 때 그 사이의 원문(이름표, 줄바꿈)까지 새로 적게 된다.
    function syncEdit() {
      var now = edit.span.textContent;
      if (now === edit.shown) return;
      var span = changedSpan(edit.shown, now);
      model.replaceIn(edit.index, span.from, span.to, now.slice(span.from, now.length - span.tail));
      edit.shown = now;
      edit.dirty = true;
      renderedSource = model.source;
      clearTimeout(emitTimer);
      emitTimer = setTimeout(emit, 300);
    }

    function commitEdit() {
      if (!edit) return;
      syncEdit();
      var index = edit.index;
      var caret = edit.caret;
      var dirty = edit.dirty;
      var token = model.tokens[index];
      finishEdit(token.dec);
      lastSpot = { index: index, offset: Math.min(caret, token.dec.length) };
      if (dirty) {
        clearTimeout(emitTimer);
        emit();
      }
      defaultNote();
    }

    function cancelEdit() {
      if (!edit) return;
      var token = model.tokens[edit.index];
      if (edit.dirty) {
        model.splice(token.start, token.end, edit.rawBefore, edit.index); // 원문을 고치기 전 그대로
        renderedSource = model.source;
        clearTimeout(emitTimer);
        emit();
      }
      finishEdit(token.dec);
      defaultNote();
    }

    /* ── HTML ── */

    function codeValue() {
      if (code) return code.getValue();
      if (codeArea) return codeArea.value;
      return model.source;
    }

    function onCodeChange() {
      clearTimeout(codeTimer);
      codeTimer = setTimeout(function () {
        var text = codeValue();
        if (text === model.source) return;
        model.load(text);
        lastSpot = null;
        emit();
      }, 250);
    }

    function flushCode() {
      clearTimeout(codeTimer);
      if (!code && !codeArea) return;
      var text = codeValue();
      if (text !== model.source) {
        model.load(text);
        lastSpot = null;
        emit();
      }
    }

    function openCode(selectFrom, selectTo) {
      function ready() {
        if (code) {
          code.setValue(model.source);
          code.focus();
          // 막 보이기 시작한 편집기는 아직 크기를 재지 못했다. 한 박자 뒤에 골라야 그 자리로 화면이 간다.
          if (selectFrom != null) setTimeout(function () { if (code && view === 'code') code.select(selectFrom, selectTo); }, 80);
        } else if (codeArea) {
          codeArea.value = model.source;
          if (selectFrom != null) { codeArea.focus(); codeArea.setSelectionRange(selectFrom, selectTo); }
        }
      }
      if (code || codeArea) return ready();
      say('코드 편집기를 불러오는 중…');
      loadCodeEditor().then(function (api) {
        if (destroyed || code || codeArea) return;
        code = api.create({ parent: panelCode, doc: model.source, onChange: onCodeChange });
        ready();
        if (view === 'code') defaultNote();
      }).catch(function () {
        if (destroyed || code || codeArea) return;
        // 코드 편집기를 받지 못했을 때: 색은 없지만 고칠 수는 있는 글상자.
        codeArea = el('textarea', { spellcheck: 'false', 'aria-label': '본문 HTML' });
        codeArea.addEventListener('input', onCodeChange);
        panelCode.appendChild(codeArea);
        ready();
        if (view === 'code') say('색 입히는 편집기를 불러오지 못해서 기본 글상자로 열었어요. 고치고 저장하는 데는 문제없어요.', 'warn');
      });
    }

    /* ── 찾아 바꾸기 ── */

    function findAll(query) {
      var hits = [];
      if (!query) return hits;
      model.tokens.forEach(function (token, index) {
        var from = 0;
        var at;
        while ((at = token.dec.indexOf(query, from)) >= 0) {
          hits.push({ index: index, at: at });
          from = at + query.length;
        }
      });
      return hits;
    }

    function showHits() {
      var query = findInput.value;
      var hits = findAll(query);
      hitList.textContent = '';
      replaceAll.disabled = !hits.length;
      if (!query) return say('본문의 글자에서만 찾아요. 태그와 속성은 건드리지 않아요.');
      say(hits.length ? hits.length + '곳을 찾았어요.' + (hits.length > 300 ? ' 처음 300곳만 보여 줘요.' : '') : '찾는 말이 없어요. 태그 사이에 걸친 말은 HTML 칸에서 찾아 주세요.');

      hits.slice(0, 300).forEach(function (hit) {
        var text = model.tokens[hit.index].dec;
        var start = Math.max(0, hit.at - 24);
        var end = Math.min(text.length, hit.at + query.length + 40);
        var show = el('button', { type: 'button', class: 'soyu-hit-text', title: '화면에서 보기' });
        show.appendChild(document.createTextNode((start > 0 ? '…' : '') + text.slice(start, hit.at)));
        show.appendChild(el('mark', { text: text.slice(hit.at, hit.at + query.length) }));
        show.appendChild(document.createTextNode(text.slice(hit.at + query.length, end) + (end < text.length ? '…' : '')));
        show.addEventListener('click', function () {
          lastSpot = { index: hit.index, offset: hit.at };
          setView('visual', function () { scrollToToken(hit.index, true); });
        });
        var one = el('button', { type: 'button', text: '바꾸기' });
        one.addEventListener('click', function () {
          model.replaceIn(hit.index, hit.at, hit.at + query.length, replaceInput.value);
          emit();
          showHits();
        });
        hitList.appendChild(el('li', {}, [show, one]));
      });
    }

    function replaceEvery() {
      var query = findInput.value;
      var hits = findAll(query);
      if (!hits.length) return;
      // 뒤에서부터 바꿔야 앞쪽 자리가 밀리지 않는다.
      for (var i = hits.length - 1; i >= 0; i--) {
        model.replaceIn(hits[i].index, hits[i].at, hits[i].at + query.length, replaceInput.value);
      }
      emit();
      showHits();
      say(hits.length + '곳을 바꿨어요.');
    }

    /* ── 그림 넣기 ── */

    var pendingImage = null; // { value, offset }

    function insertionOffset() {
      if (view === 'code') {
        if (code) return code.getSelection().from;
        if (codeArea) return codeArea.selectionStart;
      }
      if (lastSpot && model.tokens[lastSpot.index]) return model.sourceOffset(lastSpot.index, lastSpot.offset);
      return null;
    }

    function pickImage() {
      if (edit) commitEdit();
      flushCode();
      var offset = insertionOffset();
      if (offset == null) return say('그림을 넣을 자리의 글자를 먼저 눌러 주세요.', 'warn');
      if (!props.pickFile) return say('여기서는 그림을 고를 수 없어요.', 'warn');
      props.pickFile({ kind: 'image', accept: 'image/*' }).then(function (picked) {
        var file = Array.isArray(picked) ? picked[0] : picked;
        if (!file || !file.value) return;
        pendingImage = { value: file.value, offset: offset, source: model.source };
        altInput.value = '';
        altRow.hidden = false;
        altInput.focus();
        say('그림 설명을 적고 「넣기」를 눌러 주세요.');
      }).catch(function () {
        say('그림을 가져오지 못했어요. 다시 해 보세요.', 'warn');
      });
    }

    function placeImage() {
      var image = pendingImage;
      pendingImage = null;
      altRow.hidden = true;
      if (!image) return;
      if (image.source !== model.source) return say('그사이에 본문이 바뀌어서 넣지 않았어요. 자리를 다시 눌러 주세요.', 'warn');
      // 본문 삽화와 같은 모양(_plugins/post-illustrations.rb): 문단 안에서도 올바른 태그가 되도록 span을 블록처럼 쓴다.
      var html = '<span class="post-illust" style="display: block; text-align: center; margin: 1.2em 0;">'
        + '<img src="' + escapeAttr(image.value) + '" alt="' + escapeAttr(altInput.value.trim()) + '"></span>';
      model.load(model.source.slice(0, image.offset) + html + model.source.slice(image.offset));
      lastSpot = null;
      emit();
      if (view === 'code') openCode(image.offset, image.offset + html.length);
      else if (view === 'visual') paint();
      say('그림을 넣었어요. 저장하면 그림도 함께 올라가요.');
    }

    /* ── 칸 바꾸기 ── */

    function setView(next, then) {
      if (edit) commitEdit();
      if (view === 'code') flushCode();
      view = next;
      tabVisual.setAttribute('aria-selected', String(next === 'visual'));
      tabCode.setAttribute('aria-selected', String(next === 'code'));
      tabFind.setAttribute('aria-selected', String(next === 'find'));
      panelVisual.hidden = next !== 'visual';
      panelCode.hidden = next !== 'code';
      panelFind.hidden = next !== 'find';
      imageButton.disabled = next === 'find';

      if (next === 'visual') {
        if (renderedSource !== model.source) paint(then);
        else {
          var shown = frameDoc();
          if (shown) fitWidgets(shown); // 숨겨져 있던 동안에는 폭을 잴 수 없었다
          defaultNote();
          if (then) then();
        }
      } else if (next === 'code') {
        var from = null;
        var to = null;
        if (lastSpot && model.tokens[lastSpot.index]) {
          from = model.tokens[lastSpot.index].start;
          to = model.tokens[lastSpot.index].end;
        }
        defaultNote();
        openCode(from, to);
      } else {
        showHits();
        findInput.focus();
      }
    }

    tabVisual.addEventListener('click', function () {
      var spot = null;
      if (view === 'code') {
        flushCode();
        if (code) spot = model.tokenAt(code.getSelection().from);
      }
      setView('visual', function () { if (spot != null && spot >= 0) scrollToToken(spot, true); });
    });
    tabCode.addEventListener('click', function () { setView('code'); });
    tabFind.addEventListener('click', function () { setView('find'); });
    imageButton.addEventListener('click', pickImage);
    altOk.addEventListener('click', placeImage);
    altCancel.addEventListener('click', function () { pendingImage = null; altRow.hidden = true; defaultNote(); });
    altInput.addEventListener('keydown', function (event) {
      if (event.isComposing || event.keyCode === 229) return;
      if (event.key === 'Enter') { event.preventDefault(); placeImage(); }
    });
    findInput.addEventListener('input', showHits);
    replaceAll.addEventListener('click', replaceEvery);

    paint();

    // 시험할 때 들여다보는 창(편집 화면은 쓰지 않는다).
    root.__soyu = {
      source: function () { return model.source; },
      pairing: function () { return pairing ? { total: pairing.total, paired: pairing.paired } : null; },
      view: function () { return view; },
      codeSelection: function () { return code ? code.getSelection() : null; },
    };

    return {
      // Sveltia가 새 값을 건넬 때마다 불린다. 우리가 방금 내보낸 값이면 아무 일도 하지 않는다.
      update: function (nextProps) {
        props = nextProps;
        var value = String(nextProps.value == null ? '' : nextProps.value);
        if (value === model.source) return;
        if (edit) cancelEdit();
        model.load(value);
        lastSpot = null;
        if (view === 'visual') paint();
        else if (view === 'code') { if (code) code.setValue(value); else if (codeArea) codeArea.value = value; }
        else showHits();
      },
      destroy: function () {
        destroyed = true;
        clearTimeout(codeTimer);
        clearTimeout(emitTimer);
        if (code) code.destroy();
      },
    };
  }

  /* ───────── Sveltia에 알리기 ───────── */

  function controlProps(p) {
    return { value: p.value, onChange: p.onChange, getAsset: p.getAsset, pickFile: p.pickFile, entry: p.entry };
  }

  var BodyControl = createClass({
    componentDidMount: function () { this.editor = createEditor(this.root, controlProps(this.props)); },
    componentDidUpdate: function () { if (this.editor) this.editor.update(controlProps(this.props)); },
    componentWillUnmount: function () { if (this.editor) this.editor.destroy(); },
    render: function () {
      var self = this;
      return h('div', { className: 'soyu-body', id: this.props.forID, ref: function (node) { if (node) self.root = node; } });
    },
  });

  CMS.registerFieldType('bloghtml', BodyControl);

  // 시험할 때 쓰려고 속을 내놓는다(편집 화면은 쓰지 않는다).
  window.SoyuBodyEditor = { scan: scan, decode: decode, Model: Model, align: align, frameDocument: frameDocument };
})();
