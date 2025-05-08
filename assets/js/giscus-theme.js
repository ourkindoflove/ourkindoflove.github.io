(function () {
  const light = "light_high_contrast";
  const dark  = "transparent_dark";

  function setTheme() {
    // Chirpy 7.x는 data-mode 를 씀
    const isDark = document.documentElement.getAttribute("data-mode") === "dark";
    const theme  = isDark ? dark : light;

    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;

    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }

  // iframe 로딩 감지
  const observer = new MutationObserver(() => {
    if (document.querySelector("iframe.giscus-frame")) {
      setTheme();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 모드 토글 버튼 클릭 시
  document.querySelector("#mode-toggle")?.addEventListener("click", () => {
    setTimeout(setTheme, 300);
  });
})();
