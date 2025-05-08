(function () {
  const light = "light_high_contrast";
  const dark  = "transparent_dark";

  function setTheme() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const theme  = isDark ? dark : light;

    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;

    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }

  /* ① iframe 처음 뜰 때 감지 */
  const observer = new MutationObserver(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe) {
      setTheme();
      observer.disconnect(); // 한 번만 실행
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  /* ② 다크/라이트 토글 감지 */
  document.querySelector("#mode-toggle")?.addEventListener("click", () => {
    setTimeout(setTheme, 300);
  });
})();
