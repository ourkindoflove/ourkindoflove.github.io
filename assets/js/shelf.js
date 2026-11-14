/*
 * 첫 화면 서가의 "읽던 글" 한 줄 (_includes/shelf.html 과 한 쌍).
 * 글 읽기 도우미(assets/js/reading.js)가 이 브라우저에 적어 둔 읽던 자리 가운데 가장 최근 것을 보여 준다.
 * 서버로 보내는 것은 없다. 남은 자리가 없으면 아무것도 보이지 않는다.
 */
(function () {
  'use strict';
  var line = document.getElementById('shelf-resume');
  var titles = document.getElementById('shelf-titles');
  if (!line || !titles) return;

  var saved;
  var names;
  try {
    saved = JSON.parse(localStorage.getItem('soyu-reading') || '{}');
    names = JSON.parse(titles.textContent);
  } catch (e) {
    return;
  }

  var best = null;
  Object.keys(saved || {}).forEach(function (url) {
    var entry = saved[url];
    if (!names[url] || !entry || !(entry[0] > 0)) return;
    if (!best || (entry[1] || 0) > (best.time || 0)) best = { url: url, ratio: entry[0], time: entry[1] };
  });
  if (!best) return;

  var link = line.querySelector('.shelf-resume-link');
  link.href = best.url;
  link.textContent = names[best.url];
  line.querySelector('.shelf-resume-pct').textContent = Math.round(best.ratio * 100) + '%';
  line.hidden = false;
})();
