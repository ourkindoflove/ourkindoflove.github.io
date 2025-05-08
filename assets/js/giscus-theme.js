(function () {
  const light = "light_high_contrast";
  const dark  = "transparent_dark";

  function setTheme() {
    const isDark = document.documentElement.getAttribute("data-mode") === "dark";
    const theme  = isDark ? dark : light;
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;

    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }

  // ① iframe 생성 시 한 번만 테마 설정
  const iframeObserver = new MutationObserver((mutations, obs) => {
    if (document.querySelector("iframe.giscus-frame")) {
      setTheme();
      obs.disconnect();
    }
  });
  iframeObserver.observe(document.body, { childList: true, subtree: true });

  // ② data-mode 속성 변화를 감지해서 (라이트↔다크) 테마 교체
  const modeObserver = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.type === "attributes" && m.attributeName === "data-mode") {
        const oldMode = m.oldValue;
        const newMode = document.documentElement.getAttribute("data-mode");
        if (oldMode !== newMode) {
          setTheme();
        }
      }
    });
  });
  modeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-mode"],
    attributeOldValue: true
  });
})();
