// Light/dark theme toggle. Shared by all pages.
// The inline pre-paint <script> in each page's <head> sets data-theme from
// localStorage before first paint (no flash). This file wires the button and
// the system-preference fallback.
(function () {
  "use strict";
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    return root.dataset.theme || (mq.matches ? "dark" : "light");
  }

  function label(mode) {
    var t = window.t;
    if (mode === "dark") return t ? t("a11y.themeLight") : "Switch to light theme";
    return t ? t("a11y.themeDark") : "Switch to dark theme";
  }

  function apply(mode) {
    root.dataset.theme = mode;
    try {
      localStorage.setItem("theme", mode);
    } catch (e) {}
    if (btn) {
      // Show the icon for the mode you'd switch TO.
      btn.textContent = mode === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", label(mode));
    }
  }

  apply(current());

  if (btn) {
    btn.addEventListener("click", function () {
      apply(current() === "dark" ? "light" : "dark");
    });
  }

  // Keep the button's aria-label in the active language.
  document.addEventListener("i18n:changed", function () {
    if (btn) btn.setAttribute("aria-label", label(current()));
  });
})();
