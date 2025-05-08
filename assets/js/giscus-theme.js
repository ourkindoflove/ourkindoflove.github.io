(function(){
  const LIGHT = "light_high_contrast";
  const DARK  = "transparent_dark";

  function setTheme() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                 || document.documentElement.getAttribute("data-mode")==="dark";
    const theme = isDark ? DARK : LIGHT;
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe) {
    // iframe.src에서 origin을 뽑아 사용
    const origin = new URL(iframe.src).origin;
    iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme } } },
    origin
    );
    }
  }

  // iframe 생길 때 한 번
  new MutationObserver((m, obs) => {
    if (document.querySelector("iframe.giscus-frame")) {
      setTheme();
      obs.disconnect();
    }
  }).observe(document.body, { childList:true, subtree:true });

  // 모드 토글마다
  document.querySelector("#mode-toggle")?.addEventListener("click", setTheme);
})();
