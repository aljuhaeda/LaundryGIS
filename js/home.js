// Landing-page behaviour (index.html only). Vanilla, no jQuery/Bootstrap.
// Depends on: laundry-data.js (LAUNDRY_DATA), map.js (initLaundryMap).

(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // --- Featured laundries, rendered from the real dataset ---
  // Rule: cheapest 3 by price/kg, fastest 3 by turnaround. Ties broken by id.
  function card(l) {
    return (
      '<article class="laundry-card">' +
      '<div class="laundry-card__name">' +
      l.name +
      "</div>" +
      '<div class="laundry-card__addr">' +
      l.address +
      "</div>" +
      '<div class="laundry-card__stats">Rp<b>' +
      l.pricePerKg +
      "rb</b>/kg &nbsp;&middot;&nbsp; selesai <b>" +
      l.turnaroundHours +
      " jam</b></div>" +
      "</article>"
    );
  }

  if (typeof LAUNDRY_DATA !== "undefined") {
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

  // --- Map ---
  if (typeof initLaundryMap === "function") {
    initLaundryMap("laundry-map");
  }
})();
