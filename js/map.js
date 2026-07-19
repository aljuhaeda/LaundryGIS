// Renders a Leaflet map of LAUNDRY_DATA into the given element id.
// Replaces the original iframe embed of a local (localhost-only) Mapstore
// dashboard, which only ever worked on the original author's machine.
function initLaundryMap(elementId) {
  const uinMalang = [-7.9483, 112.6104];
  const map = L.map(elementId).setView(uinMalang, 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  L.marker(uinMalang)
    .addTo(map)
    .bindPopup("<b>UIN Maulana Malik Ibrahim Malang</b>")
    .openPopup();

  LAUNDRY_DATA.forEach((laundry) => {
    L.marker([laundry.lat, laundry.lng])
      .addTo(map)
      .bindPopup(
        `<b>${laundry.name}</b><br>${laundry.address}<br>` +
        `Rp${laundry.pricePerKg}rb/kg &middot; selesai ${laundry.turnaroundHours} jam`
      );
  });

  return map;
}
