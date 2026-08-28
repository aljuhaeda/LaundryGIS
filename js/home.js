// Landing-page behaviour (index.html only). Vanilla, no jQuery/Bootstrap.
// Depends on: laundry-data.js (LAUNDRY_DATA), map.js (initLaundryMap), i18n.js (t).
// Mobile nav toggle lives in nav.js; theme in theme.js.

(function () {
  "use strict";

  var T = window.t || function (k) { return k; };

  // --- Featured laundries, rendered from the real dataset ---
  // Rule: cheapest 3 by price/kg, fastest 3 by turnaround. Ties broken by id.
  function card(l) {
    return (
      '<article class="laundry-card">' +
      '<div class="laundry-card__name">' + l.name + "</div>" +
      '<div class="laundry-card__addr">' + l.address + "</div>" +
      '<div class="laundry-card__stats">' +
      T("js.perKgB", { p: l.pricePerKg }) +
      " &nbsp;·&nbsp; " +
      T("js.doneB", { h: l.turnaroundHours }) +
      "</div>" +
      "</article>"
    );
  }

  function renderFeatured() {
    if (typeof LAUNDRY_DATA === "undefined") return;
    var byPrice = LAUNDRY_DATA.slice().sort(function (a, b) {
      return a.pricePerKg - b.pricePerKg || a.id - b.id;
    });
    var bySpeed = LAUNDRY_DATA.slice().sort(function (a, b) {
      return a.turnaroundHours - b.turnaroundHours || a.id - b.id;
    });
    var cheap = document.getElementById("featured-cheap");
    var fast = document.getElementById("featured-fast");
    if (cheap) cheap.innerHTML = byPrice.slice(0, 3).map(card).join("");
    if (fast) fast.innerHTML = bySpeed.slice(0, 3).map(card).join("");
  }

  renderFeatured();
  document.addEventListener("i18n:changed", renderFeatured);

  // --- Map ---
  if (typeof initLaundryMap === "function") {
    initLaundryMap("laundry-map");
  }
})();
