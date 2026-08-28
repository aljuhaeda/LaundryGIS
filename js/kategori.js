// Category dashboard: filters LAUNDRY_DATA by price tier and turnaround
// speed (the two attributes actually present in the dataset). Depends on i18n.js (t).
// Replaces the original iframe embed of a local-only Mapstore dashboard.
function priceTier(pricePerKg) {
  if (pricePerKg <= 6) return "budget";
  if (pricePerKg <= 10) return "mid";
  return "premium";
}

function speedTier(turnaroundHours) {
  return turnaroundHours <= 6 ? "cepat" : "standar";
}

function initLaundryKategori(containerId, priceSelectId, speedSelectId, countId) {
  const container = document.getElementById(containerId);
  const priceSelect = document.getElementById(priceSelectId);
  const speedSelect = document.getElementById(speedSelectId);
  const countEl = document.getElementById(countId);
  const T = window.t || ((k) => k);

  const priceKey = { budget: "kat.priceBudget", mid: "kat.priceMid", premium: "kat.pricePremium" };
  const speedKey = { cepat: "kat.speedFast", standar: "kat.speedStd" };

  function render() {
    const priceFilter = priceSelect.value;
    const speedFilter = speedSelect.value;

    const filtered = LAUNDRY_DATA.filter((l) => {
      const matchesPrice = priceFilter === "all" || priceTier(l.pricePerKg) === priceFilter;
      const matchesSpeed = speedFilter === "all" || speedTier(l.turnaroundHours) === speedFilter;
      return matchesPrice && matchesSpeed;
    });

    countEl.textContent = T("js.count", { n: filtered.length });

    if (!filtered.length) {
      container.innerHTML = `<p class="empty">${T("js.emptyKat")}</p>`;
      return;
    }

    container.innerHTML = filtered
      .map(
        (l) => `
        <article class="info-card">
          <h3>${l.name}</h3>
          <p class="info-card__addr">${l.address}</p>
          <div class="info-card__badges">
            <span class="badge badge--price">${T(priceKey[priceTier(l.pricePerKg)])}</span>
            <span class="badge">${T(speedKey[speedTier(l.turnaroundHours)])}</span>
          </div>
        </article>`
      )
      .join("");
  }

  priceSelect.addEventListener("change", render);
  speedSelect.addEventListener("change", render);
  document.addEventListener("i18n:changed", render);
  render();
}
