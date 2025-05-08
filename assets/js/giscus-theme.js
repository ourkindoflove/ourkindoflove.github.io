function updateGiscusTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const themeToSet = currentTheme === "dark"
    ? "transparent_dark"
    : "light_high_contrast";

  const giscusIframe = document.querySelector("iframe.giscus-frame");
  if (!giscusIframe) return;

  giscusIframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: themeToSet
        }
      },
    },
    "https://giscus.app"
  );
}

// 페이지 로딩 후 테마 동기화
document.addEventListener("DOMContentLoaded", () => {
  updateGiscusTheme();
});

// 다크모드 토글 버튼 눌렀을 때도 동기화
document.querySelector("#mode-toggle").addEventListener("click", () => {
  setTimeout(updateGiscusTheme, 250); // 약간의 딜레이 주기
});
