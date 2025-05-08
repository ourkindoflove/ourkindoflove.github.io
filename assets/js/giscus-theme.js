# File: assets/js/giscus-theme.js
+ function updateGiscusTheme() {
+   const currentTheme = document.documentElement.getAttribute("data-theme");
+   const themeToSet = currentTheme === "dark"
+     ? "transparent_dark"
+     : "light_high_contrast";
+
+   const giscusIframe = document.querySelector("iframe.giscus-frame");
+   if (!giscusIframe) return;
+
+   giscusIframe.contentWindow.postMessage(
+     {
+       giscus: {
+         setConfig: {
+           theme: themeToSet
+         }
+       },
+     },
+     "https://giscus.app"
+   );
+ }
+
+ document.addEventListener("DOMContentLoaded", () => {
+   updateGiscusTheme();
+ });
+
+ document.querySelector("#mode-toggle").addEventListener("click", () => {
+   setTimeout(updateGiscusTheme, 250);
+ });
