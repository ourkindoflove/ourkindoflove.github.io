// admin/preview.js — Sveltia 편집 화면의 미리보기 칸: 본문 HTML을 블로그에 보이는 모습대로 그린다.
//
// 본문 칸은 HTML을 적힌 그대로 저장하는 글자 칸(text)이라 기본 미리보기는 글자만 보여 준다.
// 여기서는 본문을 HTML로 그리고, 블로그 빌드가 하는 일 중 눈에 띄는 것만 흉내 낸다.
//   - [삽화N] → 「삽화」 칸의 N번째 그림 (_plugins/post-illustrations.rb)
//   - ![설명](주소) → 그림 (_plugins/markdown-image-rescue.rb)
//   - 상태창(.bp-risu)이 칸보다 넓으면 비율 그대로 줄이기 (_layouts/post.html)
// 막 올려서 아직 커밋되지 않은 그림도 보이도록 주소는 getAsset으로 바꾼다.
// 타이핑할 때마다 다시 그리면 그림이 깜빡여서, 입력이 멈추고 0.4초 뒤에 그린다.

/* global CMS, createClass, h */
(function () {
  'use strict';

  // 블로그(Chirpy)가 모든 본문 그림에 주는 기본값: 칸 폭까지만, 비율 유지. 이게 없으면 큰 삽화가 원래 크기로 카드 밖까지 나간다.
  var PREVIEW_CSS = '.blog-preview img { max-width: 100%; height: auto; }';
  var MARKER = /\\?\[\s*삽화\s*(\d+)\s*\\?\]/g;
  var MD_IMAGE = /!\[([^\]\n]*)\]\(\s*([^\s()]+)(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g;

  function escapeAttr(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function assetUrl(getAsset, path) {
    if (!path) return '';
    try {
      var asset = getAsset(path);
      return asset ? String(asset) : path;
    } catch (e) {
      return path;
    }
  }

  function plain(value) {
    return value && typeof value.toJS === 'function' ? value.toJS() : value;
  }

  function illustHtml(item, getAsset) {
    var it = item && typeof item === 'object' ? item : { image: item };
    var width = parseInt(String(it.width == null ? '' : it.width).replace('%', ''), 10);
    var style = width >= 1 && width <= 99 ? ' style="width: ' + width + '%; height: auto;"' : '';
    return '<span class="post-illust" style="display: block; text-align: center; margin: 1.2em 0;">'
      + '<img src="' + escapeAttr(assetUrl(getAsset, it.image)) + '" alt="' + escapeAttr(it.alt) + '"' + style + '></span>';
  }

  function bodyHtml(entry, getAsset) {
    var body = String(entry.getIn(['data', 'body']) || '');
    var items = plain(entry.getIn(['data', 'illust'])) || [];
    return body
      .replace(MARKER, function (all, n) {
        var item = items[parseInt(n, 10) - 1];
        return item ? illustHtml(item, getAsset) : all;
      })
      .replace(MD_IMAGE, function (all, alt, src) {
        return '<img src="' + escapeAttr(assetUrl(getAsset, src)) + '" alt="' + escapeAttr(alt) + '">';
      });
  }

  function fitWidgets(root) {
    var list = root.querySelectorAll('.bp-risu');
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      el.style.zoom = '';
      var have = el.clientWidth, need = el.scrollWidth;
      if (have > 0 && need > have + 1) el.style.zoom = String(have / need);
    }
  }

  var PostPreview = createClass({
    componentDidMount: function () { this.paint(true); },
    componentDidUpdate: function () { this.paint(false); },
    componentWillUnmount: function () { clearTimeout(this.timer); },
    paint: function (now) {
      var self = this;
      clearTimeout(self.timer);
      self.timer = setTimeout(function () {
        if (!self.body) return;
        var html = bodyHtml(self.props.entry, self.props.getAsset);
        if (html !== self.shown) {
          self.shown = html;
          self.body.innerHTML = html;
        }
        fitWidgets(self.body);
      }, now ? 0 : 400);
    },
    render: function () {
      var self = this;
      var entry = this.props.entry;
      var cover = entry.getIn(['data', 'image']);
      var description = entry.getIn(['data', 'description']);
      return h('div', { className: 'blog-preview', style: { maxWidth: '860px', margin: '0 auto', fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif", lineHeight: 1.7, color: '#34343c' } },
        h('style', null, PREVIEW_CSS),
        h('h1', { style: { fontSize: '1.9em', fontWeight: 400, margin: '0.4em 0 0.2em' } }, entry.getIn(['data', 'title']) || ''),
        description ? h('p', { style: { color: '#6c757d', margin: '0 0 1em' } }, description) : null,
        cover ? h('img', { src: assetUrl(this.props.getAsset, cover), alt: '', style: { width: '100%', borderRadius: '6px', margin: '0 0 1.5em' } }) : null,
        h('div', { ref: function (el) { self.body = el; } })
      );
    },
  });

  CMS.registerPreviewTemplate('posts', PostPreview);
})();
