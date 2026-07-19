// Renders LAUNDRY_DATA as a searchable table.
// Replaces the original iframe embed of a local-only Mapstore dashboard.
function initLaundryTable(tableBodyId, searchInputId) {
  const tbody = document.getElementById(tableBodyId);

  function render(data) {
    tbody.innerHTML = data
      .map(
        (l) => `
        <tr>
          <td>${l.name}</td>
          <td>${l.address}</td>
          <td class="text-end">Rp${l.pricePerKg},000</td>
          <td class="text-end">${l.turnaroundHours} jam</td>
        </tr>`
      )
      .join("");
  }

  render(LAUNDRY_DATA);

  const searchInput = document.getElementById(searchInputId);
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      const filtered = LAUNDRY_DATA.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q)
      );
      render(filtered);
    });
  }
}
