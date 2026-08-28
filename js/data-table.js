// Renders LAUNDRY_DATA as a searchable table. Depends on i18n.js (t).
// Replaces the original iframe embed of a local-only Mapstore dashboard.
function initLaundryTable(tableBodyId, searchInputId) {
  const tbody = document.getElementById(tableBodyId);
  const searchInput = document.getElementById(searchInputId);
  const T = window.t || ((k) => k);
  let query = "";

  function currentRows() {
    if (!query) return LAUNDRY_DATA;
    return LAUNDRY_DATA.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.address.toLowerCase().includes(query)
    );
  }

  function render() {
    const data = currentRows();
    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="4" class="empty">${T("js.emptyTable")}</td></tr>`;
      return;
    }
    tbody.innerHTML = data
      .map(
        (l) => `
        <tr>
          <td>${l.name}</td>
          <td>${l.address}</td>
          <td class="num">${T("js.priceCol", { p: l.pricePerKg })}</td>
          <td class="num">${T("js.hours", { h: l.turnaroundHours })}</td>
        </tr>`
      )
      .join("");
  }

  render();

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      query = searchInput.value.trim().toLowerCase();
      render();
    });
  }

  document.addEventListener("i18n:changed", render);
}
