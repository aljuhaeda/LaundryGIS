// Mobile nav toggle. Shared by every page.
(function () {
  "use strict";
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") links.classList.remove("open");
  });
})();
