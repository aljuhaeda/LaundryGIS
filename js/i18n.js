// Bilingual ID/EN. Shared by all pages.
//   - [data-i18n="key"]            -> element.innerHTML = string (HTML allowed)
//   - [data-i18n-attr="attr:key"]  -> element.setAttribute(attr, string)
//   - window.t(key, vars)          -> string for JS-rendered content ({x} interpolation)
//   - "i18n:changed" event fires on switch; render scripts re-run on it.
// ID is the default. Choice persists to localStorage; the inline pre-paint
// script in each <head> sets <html lang> early.
(function () {
  "use strict";

  var DICT = {
    id: {
      "nav.home": "Beranda",
      "nav.map": "Peta GIS",
      "nav.data": "Data Laundry",
      "nav.dashboard": "Dashboard",
      "nav.features": "Fitur",
      "nav.team": "Tim",
      "nav.cta": "Buka Peta",

      "foot.tagline":
        'Proyek WebGIS untuk mata kuliah Sistem Informasi Geografis. Data 28 layanan laundry dikumpulkan melalui survei lapangan di sekitar UIN Maulana Malik Ibrahim Malang. Peta oleh <a href="https://leafletjs.com/">Leaflet</a> &amp; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>. © <span class="js-year"></span> LaundryUIN.',

      "hero.eyebrow": "WebGIS · UIN Maulana Malik Ibrahim Malang",
      "hero.title": "Cari laundry terbaik di sekitar <em>UIN Malang</em>",
      "hero.sub":
        "Peta interaktif 28 layanan laundry di sekitar kampus, lengkap dengan harga per kilo dan waktu pengerjaan. Data dari survei lapangan, bukan iklan.",
      "hero.meta":
        "28 lokasi&nbsp;/&nbsp;Rp4–30rb per kg&nbsp;/&nbsp;selesai 2–24 jam&nbsp;/&nbsp;10 kelurahan",

      "metrics.n1label": "titik laundry terpetakan",
      "metrics.v2": "Rp4–30rb",
      "metrics.n2label": "kisaran harga per kg",
      "metrics.v3": "2–24 jam",
      "metrics.n3label": "rentang waktu pengerjaan",
      "metrics.n4label": "kelurahan terjangkau",

      "about.eyebrow": "Tentang",
      "about.h": "Portal informasi sebaran laundry di sekitar UIN Malang",
      "about.p1":
        "LaundryUIN memberikan gambaran menyeluruh tentang sebaran layanan laundry di sekitar kampus. Setiap titik pada peta berasal dari survei lapangan: nama, alamat, harga per kilo, dan perkiraan waktu pengerjaan.",
      "about.p2":
        "Tujuannya sederhana: memudahkan mahasiswa membandingkan pilihan laundry terdekat tanpa harus keliling satu per satu.",
      "about.dt1": "Sumber data",
      "about.dd1": "Survei lapangan (LaundryUIN.csv)",
      "about.dt2": "Cakupan",
      "about.dd2": "28 titik · 10 kelurahan",
      "about.dt3": "Peta",
      "about.dd3": "Leaflet + OpenStreetMap",
      "about.dt4": "Backend",
      "about.dd4": "Tidak ada — berjalan penuh di browser",

      "map.eyebrow": "Peta",
      "map.h": "Semua 28 laundry dalam satu peta",

      "featured.eyebrow": "Pilihan",
      "featured.h": "Yang termurah dan tercepat",
      "featured.cheapH": "Paling murah",
      "featured.cheapSpan": "per kg",
      "featured.fastH": "Paling cepat",
      "featured.fastSpan": "selesai",

      "explore.eyebrow": "Jelajahi",
      "explore.h": "Tiga cara menemukan laundry-mu",
      "explore.c1h": "Peta GIS",
      "explore.c1p":
        "Lihat sebaran seluruh laundry pada peta interaktif. Klik penanda untuk alamat, harga, dan waktu pengerjaan.",
      "explore.c1go": "Buka peta →",
      "explore.c2h": "Data Laundry",
      "explore.c2p": "Tabel lengkap yang bisa dicari dan diurutkan.",
      "explore.c2go": "Lihat tabel →",
      "explore.c3h": "Dashboard",
      "explore.c3p": "Saring berdasarkan tingkat harga dan kecepatan layanan.",
      "explore.c3go": "Buka dashboard →",

      "cta.h": "Temukan laundry terdekat sekarang",
      "cta.p":
        "Buka peta, cari yang paling dekat dari kos atau kampus, bandingkan harganya.",

      "peta.eyebrow": "Peta · WebGIS",
      "peta.h1": "Peta laundry sekitar UIN Malang",
      "peta.lead":
        "28 titik hasil survei lapangan. Klik penanda untuk melihat alamat, harga per kilogram, dan perkiraan waktu pengerjaan.",

      "data.eyebrow": "Data",
      "data.h1": "Data lengkap laundry sekitar UIN Malang",
      "data.lead":
        "Seluruh 28 titik hasil survei lapangan dalam satu tabel. Cari berdasarkan nama atau alamat.",
      "data.searchLabel": "Cari",
      "data.searchPlaceholder": "Nama atau alamat laundry…",
      "data.thName": "Nama",
      "data.thAddr": "Alamat",
      "data.thPrice": "Harga/kg",
      "data.thTime": "Pengerjaan",

      "kat.eyebrow": "Dashboard",
      "kat.h1": "Saring berdasarkan harga dan kecepatan",
      "kat.lead":
        "Dua atribut yang tersedia di dataset survei: tingkat harga per kilogram dan kecepatan pengerjaan.",
      "kat.priceLabel": "Kategori Harga",
      "kat.priceAll": "Semua harga",
      "kat.priceBudget": "Budget (≤ Rp6rb/kg)",
      "kat.priceMid": "Menengah (Rp7–10rb/kg)",
      "kat.pricePremium": "Premium (> Rp10rb/kg)",
      "kat.speedLabel": "Kecepatan Pengerjaan",
      "kat.speedAll": "Semua kecepatan",
      "kat.speedFast": "Cepat (≤ 6 jam)",
      "kat.speedStd": "Standar (> 6 jam)",

      "feat.eyebrow": "Fitur",
      "feat.h1": "Kenapa pakai LaundryUIN?",
      "feat.lead":
        "Memetakan 28 layanan laundry nyata di sekitar UIN Malang — alamat, harga per kilogram, dan estimasi waktu pengerjaan — supaya mahasiswa bisa membandingkan pilihan sebelum berangkat, bukan menebak-nebak. Semua berjalan langsung di browser tanpa server tambahan.",
      "feat.c1h": "28 lokasi terpetakan",
      "feat.c1p":
        "Setiap lokasi dicatat dengan koordinat asli hasil survei di sekitar UIN Malang.",
      "feat.c2h": "Harga transparan",
      "feat.c2p":
        "Harga per kilogram ditampilkan apa adanya, tanpa perlu menghubungi tiap laundry satu per satu.",
      "feat.c3h": "Filter kecepatan pengerjaan",
      "feat.c3p":
        "Bandingkan laundry cepat (≤ 6 jam) dan standar (> 6 jam) langsung dari dashboard.",
      "feat.c4h": "Pencarian cepat",
      "feat.c4p": "Cari berdasarkan nama atau alamat langsung dari tabel data laundry.",
      "feat.c5h": "Tanpa server tambahan",
      "feat.c5p":
        "Peta dan dashboard berjalan langsung di browser, tidak butuh instalasi backend untuk digunakan.",
      "feat.c6h": "Proyek tugas GIS",
      "feat.c6p":
        "Data spasial diolah dengan QGIS, lalu disederhanakan menjadi aplikasi web mandiri.",
      "feat.btn": "Lihat Peta",

      "team.eyebrow": "Tim",
      "team.h1": "Pengembang LaundryUIN",
      "team.lead": "Proyek satu orang untuk mata kuliah Sistem Informasi Geografis.",
      "team.role":
        "AI/ML Engineer · Teknik Informatika, UIN Maulana Malik Ibrahim Malang",
      "team.bio":
        "LaundryGIS dibuat sebagai proyek mata kuliah GIS — pengumpulan dan pra-pemrosesan data di QGIS, penyimpanan spasial di PostgreSQL/PostGIS, dan front end ini. Penjelasan teknis lengkap ada di README proyek.",

      "js.perKgB": "Rp<b>{p}</b>rb/kg",
      "js.doneB": "selesai <b>{h}</b> jam",
      "js.priceCol": "Rp{p}rb",
      "js.hours": "{h} jam",
      "js.popupStats": "Rp{p}rb/kg · selesai {h} jam",
      "js.count": "{n} laundry ditemukan",
      "js.emptyTable": "Tidak ada laundry yang cocok.",
      "js.emptyKat": "Tidak ada laundry yang cocok dengan filter ini.",
      "js.uinPopup": "UIN Maulana Malik Ibrahim Malang",

      "a11y.menu": "Buka menu",
      "a11y.lang": "Ganti bahasa",
      "a11y.themeDark": "Beralih ke tema gelap",
      "a11y.themeLight": "Beralih ke tema terang",
    },

    en: {
      "nav.home": "Home",
      "nav.map": "GIS Map",
      "nav.data": "Laundry Data",
      "nav.dashboard": "Dashboard",
      "nav.features": "Features",
      "nav.team": "Team",
      "nav.cta": "Open Map",

      "foot.tagline":
        'A WebGIS project for a Geographic Information Systems course. Data on 28 laundry services collected via field survey around UIN Maulana Malik Ibrahim Malang, Indonesia. Map by <a href="https://leafletjs.com/">Leaflet</a> &amp; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>. © <span class="js-year"></span> LaundryUIN.',

      "hero.eyebrow": "WebGIS · UIN Maulana Malik Ibrahim Malang",
      "hero.title": "Find the best laundry near <em>UIN Malang</em>",
      "hero.sub":
        "An interactive map of 28 laundry services around campus, with price per kilo and turnaround time. Data from a field survey, not ads.",
      "hero.meta":
        "28 locations&nbsp;/&nbsp;Rp4–30k per kg&nbsp;/&nbsp;2–24 h turnaround&nbsp;/&nbsp;10 sub-districts",

      "metrics.n1label": "laundry points mapped",
      "metrics.v2": "Rp4–30k",
      "metrics.n2label": "price range per kg",
      "metrics.v3": "2–24 h",
      "metrics.n3label": "turnaround range",
      "metrics.n4label": "sub-districts covered",

      "about.eyebrow": "About",
      "about.h": "A directory of laundry services around UIN Malang",
      "about.p1":
        "LaundryUIN gives a complete picture of the laundry services around campus. Every point on the map comes from a field survey: name, address, price per kilo, and estimated turnaround time.",
      "about.p2":
        "The goal is simple: help students compare nearby laundry options without walking to each one.",
      "about.dt1": "Data source",
      "about.dd1": "Field survey (LaundryUIN.csv)",
      "about.dt2": "Coverage",
      "about.dd2": "28 points · 10 sub-districts",
      "about.dt3": "Map",
      "about.dd3": "Leaflet + OpenStreetMap",
      "about.dt4": "Backend",
      "about.dd4": "None — runs entirely in the browser",

      "map.eyebrow": "Map",
      "map.h": "All 28 laundries on one map",

      "featured.eyebrow": "Picks",
      "featured.h": "Cheapest and fastest",
      "featured.cheapH": "Cheapest",
      "featured.cheapSpan": "per kg",
      "featured.fastH": "Fastest",
      "featured.fastSpan": "turnaround",

      "explore.eyebrow": "Explore",
      "explore.h": "Three ways to find your laundry",
      "explore.c1h": "GIS Map",
      "explore.c1p":
        "See every laundry on an interactive map. Click a marker for address, price, and turnaround time.",
      "explore.c1go": "Open map →",
      "explore.c2h": "Laundry Data",
      "explore.c2p": "A full table you can search and sort.",
      "explore.c2go": "View table →",
      "explore.c3h": "Dashboard",
      "explore.c3p": "Filter by price tier and service speed.",
      "explore.c3go": "Open dashboard →",

      "cta.h": "Find the nearest laundry now",
      "cta.p":
        "Open the map, find the closest one to your place or campus, and compare prices.",

      "peta.eyebrow": "Map · WebGIS",
      "peta.h1": "Laundry map around UIN Malang",
      "peta.lead":
        "28 points from a field survey. Click a marker for address, price per kilogram, and estimated turnaround time.",

      "data.eyebrow": "Data",
      "data.h1": "Full laundry data around UIN Malang",
      "data.lead":
        "All 28 field-survey points in one table. Search by name or address.",
      "data.searchLabel": "Search",
      "data.searchPlaceholder": "Laundry name or address…",
      "data.thName": "Name",
      "data.thAddr": "Address",
      "data.thPrice": "Price/kg",
      "data.thTime": "Turnaround",

      "kat.eyebrow": "Dashboard",
      "kat.h1": "Filter by price and speed",
      "kat.lead":
        "The two attributes available in the survey dataset: price tier per kilogram and turnaround speed.",
      "kat.priceLabel": "Price tier",
      "kat.priceAll": "All prices",
      "kat.priceBudget": "Budget (≤ Rp6k/kg)",
      "kat.priceMid": "Mid (Rp7–10k/kg)",
      "kat.pricePremium": "Premium (> Rp10k/kg)",
      "kat.speedLabel": "Turnaround speed",
      "kat.speedAll": "All speeds",
      "kat.speedFast": "Fast (≤ 6 h)",
      "kat.speedStd": "Standard (> 6 h)",

      "feat.eyebrow": "Features",
      "feat.h1": "Why use LaundryUIN?",
      "feat.lead":
        "It maps 28 real laundry services around UIN Malang — address, price per kilogram, and estimated turnaround — so students can compare options before setting out instead of guessing. Everything runs directly in the browser with no extra server.",
      "feat.c1h": "28 locations mapped",
      "feat.c1p":
        "Every location recorded with real coordinates from a field survey around UIN Malang.",
      "feat.c2h": "Transparent pricing",
      "feat.c2p":
        "Price per kilogram shown as-is, without contacting each laundry one by one.",
      "feat.c3h": "Turnaround-speed filter",
      "feat.c3p":
        "Compare fast laundries (≤ 6 h) and standard ones (> 6 h) straight from the dashboard.",
      "feat.c4h": "Quick search",
      "feat.c4p": "Search by name or address directly from the laundry data table.",
      "feat.c5h": "No extra server",
      "feat.c5p":
        "The map and dashboard run directly in the browser, with no backend to install.",
      "feat.c6h": "GIS coursework project",
      "feat.c6p":
        "Spatial data processed in QGIS, then simplified into a standalone web app.",
      "feat.btn": "View map",

      "team.eyebrow": "Team",
      "team.h1": "LaundryUIN developer",
      "team.lead": "A one-person project for a Geographic Information Systems course.",
      "team.role":
        "AI/ML Engineer · Informatics, UIN Maulana Malik Ibrahim Malang",
      "team.bio":
        "LaundryGIS was built as a GIS coursework project — data collection and preprocessing in QGIS, spatial storage in PostgreSQL/PostGIS, and this front end. The full technical writeup is in the project README.",

      "js.perKgB": "Rp<b>{p}</b>k/kg",
      "js.doneB": "<b>{h}</b> h turnaround",
      "js.priceCol": "Rp{p}k",
      "js.hours": "{h} h",
      "js.popupStats": "Rp{p}k/kg · {h} h turnaround",
      "js.count": "{n} laundries found",
      "js.emptyTable": "No matching laundry.",
      "js.emptyKat": "No laundry matches these filters.",
      "js.uinPopup": "UIN Maulana Malik Ibrahim Malang",

      "a11y.menu": "Open menu",
      "a11y.lang": "Change language",
      "a11y.themeDark": "Switch to dark theme",
      "a11y.themeLight": "Switch to light theme",
    },
  };

  var lang = "id";
  try {
    var stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "id") lang = stored;
  } catch (e) {}
  if (lang === "id" && (document.documentElement.lang === "en")) lang = "en";

  function t(key, vars) {
    var table = DICT[lang] || DICT.id;
    var s = table[key];
    if (s == null) s = DICT.id[key];
    if (s == null) return key;
    if (vars) {
      s = s.replace(/\{(\w+)\}/g, function (m, k) {
        return vars[k] != null ? vars[k] : m;
      });
    }
    return s;
  }

  function fillYears() {
    var y = String(new Date().getFullYear());
    document.querySelectorAll(".js-year").forEach(function (el) {
      el.textContent = y;
    });
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var s = t(el.getAttribute("data-i18n"));
      if (s != null) el.innerHTML = s;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var i = pair.indexOf(":");
        if (i < 0) return;
        var attr = pair.slice(0, i).trim();
        var key = pair.slice(i + 1).trim();
        var s = t(key);
        if (s != null) el.setAttribute(attr, s);
      });
    });
    fillYears();

    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.textContent = lang === "id" ? "EN" : "ID";
      btn.setAttribute("aria-label", t("a11y.lang"));
    }
    document.documentElement.lang = lang;
  }

  function setLang(l) {
    if (l !== "en" && l !== "id") return;
    lang = l;
    try {
      localStorage.setItem("lang", l);
    } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang: l } }));
  }

  window.t = t;
  window.i18n = {
    get: function () {
      return lang;
    },
    set: setLang,
  };

  apply();

  var toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      setLang(lang === "id" ? "en" : "id");
    });
  }
})();
