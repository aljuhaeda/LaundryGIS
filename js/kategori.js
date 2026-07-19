// Category dashboard: filters LAUNDRY_DATA by price tier and turnaround
// speed (the two attributes actually present in the dataset).
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

  const tierLabel = { budget: "Budget (≤ Rp6rb/kg)", mid: "Menengah (Rp7–10rb/kg)", premium: "Premium (> Rp10rb/kg)" };
  const speedLabel = { cepat: "Cepat (≤ 6 jam)", standar: "Standar (> 6 jam)" };

  function render() {
    const priceFilter = priceSelect.value;
    const speedFilter = speedSelect.value;

    const filtered = LAUNDRY_DATA.filter((l) => {
      const matchesPrice = priceFilter === "all" || priceTier(l.pricePerKg) === priceFilter;
      const matchesSpeed = speedFilter === "all" || speedTier(l.turnaroundHours) === speedFilter;
      return matchesPrice && matchesSpeed;
    });

    countEl.textContent = `${filtered.length} laundry ditemukan`;

    container.innerHTML = filtered
      .map(
        (l) => `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${l.name}</h5>
              <p class="card-text text-muted small">${l.address}</p>
              <span class="badge bg-primary me-1">${tierLabel[priceTier(l.pricePerKg)]}</span>
              <span class="badge bg-secondary">${speedLabel[speedTier(l.turnaroundHours)]}</span>
            </div>
          </div>
        </div>`
      )
      .join("");
  }

  priceSelect.addEventListener("change", render);
  speedSelect.addEventListener("change", render);
  render();
}
