// Renders a Leaflet map of LAUNDRY_DATA into the given element id. Depends on i18n.js (t).
// Replaces the original iframe embed of a local (localhost-only) Mapstore
// dashboard, which only ever worked on the original author's machine.
function initLaundryMap(elementId) {
  const T = window.t || ((k) => k);
  const uinMalang = [-7.9483, 112.6104];
  const map = L.map(elementId).setView(uinMalang, 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  const uinMarker = L.marker(uinMalang).addTo(map);
  const laundryMarkers = LAUNDRY_DATA.map((l) => ({
    marker: L.marker([l.lat, l.lng]).addTo(map),
    data: l,
  }));

  function bindPopups() {
    uinMarker.bindPopup("<b>" + T("js.uinPopup") + "</b>");
    laundryMarkers.forEach(({ marker, data: l }) => {
      marker.bindPopup(
        "<b>" + l.name + "</b><br>" + l.address + "<br>" +
        T("js.popupStats", { p: l.pricePerKg, h: l.turnaroundHours })
      );
    });
  }

  bindPopups();
  uinMarker.openPopup();
  document.addEventListener("i18n:changed", bindPopups);

  return map;
}
