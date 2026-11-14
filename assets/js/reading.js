/*
 * 글 읽기 도우미 (_includes/reading.html 과 한 쌍)
 *
 * 1. 진행 막대: 본문을 얼마나 읽었는지 화면 맨 위에 얇게 보여 준다.
 * 2. 이어 읽기: 읽던 자리를 이 브라우저에만(localStorage) 기억했다가,
 *    글을 다시 열면 "읽던 곳으로" 단추를 띄운다. 화면을 멋대로 옮기지는 않는다.
 *    자리는 "화면 맨 위에 있던 글자"로 기억한다. 그림이 늦게 떠서 글 길이가 달라져도,
 *    접힌 장(details) 안이어도 같은 문장으로 돌아가기 위해서다.
 *    그 글자를 찾지 못할 때(글을 고쳤거나, 액자 속 작품일 때)만 몇 %였는지로 돌아간다.
 *
 *    자리는 화면이 잠깐(1.5초) 멈춰 있을 때만 적는다. 메뉴나 검색을 쓰려고 맨 위로 훑어
 *    올라가는 동안에는 적지 않으므로, 읽던 자리가 그대로 남는다.
 * 3. 훑어보기: 검색 결과를 눌러 글 속 어느 자리로 날아온 것은 "읽던 자리"가 아니다.
 *    거기서 한 화면 반 넘게 읽어 나가기 전에는 기억을 바꾸지 않고, 돌아갈 단추를 띄워 둔다.
 *
 * 4. 글자 크기: 글 머리의 가·가·가 단추로 본문을 작게, 보통, 크게.
 *
 * 서버로 보내는 것은 없다. 그래서 기억은 기기마다 따로다.
 * 저장을 못 하는 환경(사생활 보호 창 등)에서는 진행 막대만 움직인다.
 */
(function () {
  'use strict';

  var host = document.getElementById('reading');
  var content = document.querySelector('article .content');
  if (!host || !content) return;

  var bar = host.querySelector('.reading-bar');
  var pill = host.querySelector('.reading-resume');
  var pillGo = host.querySelector('.reading-resume-go');
  var pillPct = host.querySelector('.reading-resume-pct');
  var pillClose = host.querySelector('.reading-resume-close');
  var key = host.getAttribute('data-key') || location.pathname;

  var STORE = 'soyu-reading';
  var PEEK = 'soyu-reading-peek'; /* 검색 결과가 "이 글은 훑어보러 가는 것"이라고 남기는 쪽지(sessionStorage) */
  var IDLE = 1500; /* 화면이 이만큼(ms) 멈춰 있으면 읽고 있는 것으로 본다. */
  var KEEP = 80; /* 자리를 기억해 두는 글의 수. 넘치면 오래된 것부터 잊는다. */
  var START = 0.03; /* 이보다 앞이면 아직 읽기 시작하지 않은 것으로 본다. */
  var END = 0.97; /* 이보다 뒤면 다 읽은 것으로 보고 자리를 잊는다. */

  /* pending: 저장돼 있던 자리. 읽는 이가 단추를 누르거나 닫을 때까지는 새 자리로 덮어쓰지 않는다. */
  var pending = null;
  var pendingEntry = null;

  /* peek: 훑어보는 중. peekFrom: 읽는 이가 처음 손을 댔을 때의 화면 자리(아직 손대지 않았으면 null). */
  var peek = false;
  var peekFrom = null;

  /* ── 자리 계산 ──
     0: 본문 첫머리가 화면 위쪽 끝에 닿았을 때
     1: 본문 끝이 화면 아래쪽 끝에 닿았을 때 */
  function range() {
    var rect = content.getBoundingClientRect();
    var view = window.innerHeight;
    var start = rect.top + window.scrollY;
    return { start: start, span: rect.height - view, view: view };
  }

  function progress(r) {
    if (r.span <= 0) return 0;
    return Math.min(1, Math.max(0, (window.scrollY - r.start) / r.span));
  }

  /* 한 화면 반보다 짧은 글에는 막대를 두지 않는다. */
  function hasBar(r) {
    return r.span >= r.view * 0.5;
  }

  /* 두 화면보다 짧은 글은 자리를 기억하지 않는다. */
  function remembers(r) {
    return r.span >= r.view;
  }

  /* ── 글자 닻 ──
     본문의 글자 마디(text node)를 앞에서부터 센 번호와, 그 마디 안에서 몇 번째 글자인지로 자리를 적는다. */
  var SKIP = { STYLE: 1, SCRIPT: 1, NOSCRIPT: 1, TEMPLATE: 1 };

  function textWalker() {
    return document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!/\S/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        if (node.parentNode && SKIP[node.parentNode.nodeName]) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
  }

  function caretAt(x, y) {
    if (document.caretPositionFromPoint) {
      var pos = document.caretPositionFromPoint(x, y);
      return pos ? { node: pos.offsetNode, offset: pos.offset } : null;
    }
    if (document.caretRangeFromPoint) {
      var range = document.caretRangeFromPoint(x, y);
      return range ? { node: range.startContainer, offset: range.startOffset } : null;
    }
    return null;
  }

  /* 글자 마디의 offset번째 글자가 화면 어디에 있는지. 보이지 않으면 null. */
  function charBox(text, offset) {
    var from = Math.max(0, Math.min(offset, text.length - 1));
    var range = document.createRange();
    range.setStart(text, from);
    range.setEnd(text, from + 1);
    var box = range.getBoundingClientRect();
    return box.width || box.height ? box : null;
  }

  /* 화면 위쪽에 보이는 글자를 찾는다. 위쪽 띠나 그림에 가릴 수 있어 몇 군데를 짚어 본다. */
  function findAnchor() {
    var rect = content.getBoundingClientRect();
    var ys = [12, 64, 120, 200];
    var xs = [0.25, 0.5, 0.75, 0.1];
    for (var i = 0; i < ys.length; i++) {
      for (var j = 0; j < xs.length; j++) {
        var hit = null;
        try { hit = caretAt(rect.left + rect.width * xs[j], ys[i]); } catch (e) {}
        if (!hit || !hit.node || hit.node.nodeType !== 3) continue;
        if (!content.contains(hit.node) || !/\S/.test(hit.node.nodeValue)) continue;
        if (hit.node.parentNode && SKIP[hit.node.parentNode.nodeName]) continue;

        var walker = textWalker();
        var index = -1, total = 0, node;
        while ((node = walker.nextNode())) {
          if (node === hit.node) index = total;
          total++;
        }
        var box = charBox(hit.node, hit.offset);
        if (index >= 0 && box) return { index: index, offset: hit.offset, total: total, y: Math.round(box.top) };
      }
    }
    return null;
  }

  /* 적어 둔 글자가 지금 화면의 어디에 있는지(화면 위쪽 끝에서의 거리). 못 찾으면 null. */
  function locateAnchor(saved) {
    var index = Number(saved[2]), offset = Number(saved[3]) || 0, total = Number(saved[4]);
    if (!(index >= 0) || !(total > 0)) return null;

    var walker = textWalker();
    var nodes = [], node;
    while ((node = walker.nextNode())) nodes.push(node);
    if (nodes.length !== total) return null; /* 글이 바뀌었다. */

    /* 닫힌 장 안에 있으면 그 장을 편다. */
    for (var el = nodes[index].parentNode; el && el !== content; el = el.parentNode) {
      if (el.nodeName === 'DETAILS' && !el.open) el.open = true;
    }

    /* 보이지 않는 마디면 조금 뒤의 보이는 마디로 간다. */
    for (var i = index; i < nodes.length && i < index + 40; i++) {
      var box = charBox(nodes[i], i === index ? offset : 0);
      if (box) return box.top;
    }
    return null;
  }

  /* ── 저장 ── */
  function readStore() {
    try {
      var data = JSON.parse(localStorage.getItem(STORE) || '{}');
      return data && typeof data === 'object' ? data : {};
    } catch (e) {
      return {};
    }
  }

  function writeStore(data) {
    try {
      var keys = Object.keys(data);
      if (keys.length > KEEP) {
        keys
          .sort(function (a, b) { return (data[a][1] || 0) - (data[b][1] || 0); })
          .slice(0, keys.length - KEEP)
          .forEach(function (old) { delete data[old]; });
      }
      localStorage.setItem(STORE, JSON.stringify(data));
    } catch (e) {
      /* 저장할 수 없으면 조용히 넘어간다. */
    }
  }

  function save() {
    if (pending !== null || peek) return;
    var r = range();
    if (!remembers(r)) return;
    var p = progress(r);
    if (p < START) return; /* 맨 위에 머문 것만으로는 기억을 바꾸지 않는다. */

    var data = readStore();
    if (p > END) {
      if (!(key in data)) return;
      delete data[key];
    } else {
      var entry = [Math.round(p * 1000) / 1000, Math.floor(Date.now() / 1000)];
      var anchor = findAnchor();
      if (anchor) entry.push(anchor.index, anchor.offset, anchor.total, anchor.y);
      data[key] = entry;
    }
    writeStore(data);
  }

  /* 화면이 멈춘 뒤에 적는다. 움직이는 동안에는 계속 미룬다. */
  var saveTimer = null;
  function saveSoon() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, IDLE);
  }

  /* ── 읽던 곳으로 단추 ── */

  /* 단추를 본문 기둥의 가운데에 둔다(컴퓨터 화면에서는 본문이 화면 가운데가 아니다). */
  function placePill() {
    if (!pill || pill.hidden) return;
    var rect = content.getBoundingClientRect();
    pill.style.left = Math.round(rect.left + rect.width / 2) + 'px';
  }

  function settle() {
    pending = null;
    pendingEntry = null;
    if (pill) pill.hidden = true;
  }

  /* 테마가 화면 이동을 부드럽게(scroll-behavior: smooth) 해 두었는데, 긴 글을 가로질러 미끄러지면
     오래 걸리고 사이의 그림을 모두 불러온다. 그래서 한 번에 옮긴다. */
  function scrollNow(y) {
    try {
      window.scrollTo({ top: y, behavior: 'instant' });
    } catch (e) {
      window.scrollTo(0, y);
    }
  }

  /* 적어 둔 자리로 화면을 옮긴다. 글자를 찾으면 그 글자가 있던 높이로, 못 찾으면 몇 %였는지로. */
  function goTo(saved) {
    var top = locateAnchor(saved);
    if (top !== null) {
      var was = Number(saved[5]);
      scrollNow(Math.round(window.scrollY + top - (isFinite(was) ? was : 12)));
      return;
    }
    var r = range();
    scrollNow(Math.round(r.start + Number(saved[0]) * r.span));
  }

  function jump() {
    var saved = pendingEntry;
    if (pending === null || !saved) return;
    peek = false;
    settle();
    goTo(saved);

    /* 그림이 늦게 뜨면 자리가 밀린다. 잠깐 동안 다시 맞추고, 읽는 이가 손대면 그만둔다. */
    if (!window.ResizeObserver) return;
    var events = ['wheel', 'touchstart', 'keydown', 'mousedown'];
    var watcher = new ResizeObserver(function () { goTo(saved); });
    function stop() {
      watcher.disconnect();
      events.forEach(function (name) { window.removeEventListener(name, stop); });
    }
    events.forEach(function (name) { window.addEventListener(name, stop, { passive: true }); });
    watcher.observe(content);
    setTimeout(stop, 4000);
  }

  function offerResume() {
    if (!pill || (location.hash && !peek)) return;
    var saved = readStore()[key];
    var ratio = saved && Number(saved[0]);
    if (!ratio || ratio <= START || ratio >= END) return;

    /* 브라우저가 이미 그 근처로 데려다 놓았으면(새로 고침, 뒤로 가기) 묻지 않는다. */
    if (!peek && progress(range()) >= ratio - 0.02) return;

    pending = ratio;
    pendingEntry = saved;
    if (pillPct) pillPct.textContent = Math.round(ratio * 100) + '%';
    pill.hidden = false;
    placePill();
  }

  /* ── 화면을 움직일 때마다 ── */
  var ticking = false;
  function update() {
    ticking = false;
    var r = range();
    var p = progress(r);

    if (bar) {
      bar.hidden = !hasBar(r);
      bar.style.setProperty('--read', p.toFixed(4));
    }

    placePill();

    if (peek) {
      /* 훑어보는 동안에는 단추를 그대로 두고 자리도 적지 않는다. 날아온 곳에서 한 화면 반 넘게 움직이면 읽기로 넘어간다. */
      if (peekFrom === null || Math.abs(window.scrollY - peekFrom) <= r.view * 1.5) return;
      peek = false;
      settle();
    }

    if (pending !== null) {
      /* 스스로 그 자리를 지나갔거나 한 화면 반 넘게 읽어 내려갔으면, 여기서부터 읽는 것으로 보고 단추를 거둔다. */
      if (p >= pending - 0.01 || window.scrollY - r.start > r.view * 1.5) settle();
    } else {
      saveSoon();
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  if (pillGo) pillGo.addEventListener('click', jump);
  if (pillClose) {
    pillClose.addEventListener('click', function () {
      peek = false;
      settle();
    });
  }

  /* 훑어보기: 다른 화면의 검색 결과에서 왔으면 쪽지가 남아 있다. */
  try {
    if (sessionStorage.getItem(PEEK) === key) {
      sessionStorage.removeItem(PEEK);
      peek = true;
    }
  } catch (e) {}

  /* 이 글을 보던 중에 검색 결과를 눌러 같은 글의 다른 자리로 가는 경우(_includes/search-loader.html 이 알린다). */
  window.addEventListener('soyu:peek', function () {
    peek = true;
    peekFrom = null;
    if (pending === null) offerResume();
  });

  ['wheel', 'touchmove', 'keydown'].forEach(function (name) {
    window.addEventListener(name, function () {
      if (peek && peekFrom === null) peekFrom = window.scrollY;
    }, { passive: true });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') save();
  });
  window.addEventListener('pagehide', save);

  /* ── 글자 크기 ──
     본문을 통째로 키우거나 줄인다(CSS zoom, 배율은 스타일 파일에 있다). 로그 글은 글자 크기를 글 안에 px로
     적어 둔 경우가 많아서, font-size 를 바꾸는 방법은 대부분의 글에서 먹지 않는다.
     고른 크기는 이 브라우저에 기억하고, 글을 열 때 _includes/reading.html 의 짧은 스크립트가 먼저 입힌다. */
  var SIZE = 'soyu-text-size';
  var root = document.documentElement;
  var sizeBox = document.querySelector('.reading-size');
  var sizeButtons = sizeBox ? Array.prototype.slice.call(sizeBox.querySelectorAll('button[data-size]')) : [];

  function currentSize() {
    return root.getAttribute('data-text-size') || 'm';
  }

  function markSize() {
    var now = currentSize();
    sizeButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-size') === now));
    });
  }

  function setSize(size) {
    if (size === currentSize()) return;
    var anchor = findAnchor(); /* 지금 보고 있던 글자. 크기를 바꾼 뒤 같은 높이에 다시 놓는다. */

    if (size === 'm') root.removeAttribute('data-text-size');
    else root.setAttribute('data-text-size', size);
    try {
      if (size === 'm') localStorage.removeItem(SIZE);
      else localStorage.setItem(SIZE, size);
    } catch (e) {}
    markSize();

    function keepPlace() {
      if (anchor) {
        var top = locateAnchor([0, 0, anchor.index, anchor.offset, anchor.total]);
        if (top !== null) scrollNow(Math.round(window.scrollY + top - anchor.y));
      }
      onScroll();
    }

    /* 상태창 폭 맞추기와 액자 높이 맞추기(_layouts/post.html)는 창 크기가 바뀔 때 다시 잰다. 그 신호를 빌린다. */
    window.dispatchEvent(new Event('resize'));
    keepPlace();
    setTimeout(keepPlace, 350);
  }

  if (sizeBox && window.CSS && CSS.supports && CSS.supports('zoom', '1.2')) {
    sizeBox.hidden = false;
    markSize();
    sizeButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        setSize(button.getAttribute('data-size'));
      });
    });
  }

  offerResume();
  update();
  /* 그림과 액자가 다 뜨면 길이가 달라지므로 한 번 더 잰다. */
  window.addEventListener('load', onScroll);
})();
