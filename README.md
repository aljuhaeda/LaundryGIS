# LaundryGIS — WebGIS for Laundry Services near UIN Malang

A web-based Geographic Information System (WebGIS) that maps and lists laundry services around Universitas Islam Negeri (UIN) Maulana Malik Ibrahim Malang. Built with an open-source geospatial stack — QGIS, PostgreSQL/PostGIS, GeoServer, and Mapstore.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![SCSS](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

**Problem.** Students living near UIN Malang need a fast way to find and compare nearby laundry services — including location, service types, and contact info.

**Solution.** A WebGIS application that visualizes laundry locations on an interactive map, backed by a spatial database and a serving layer built on the open-source geospatial toolchain.

## Features

- **Interactive map** — pan, zoom, and click markers to view laundry details
- **Category filtering** — filter by service type
- **Data view** — tabular view of laundry services with location and contact
- **Feature page** — description of app capabilities
- **Team page** — contributors

## Tech Stack

- **Frontend** — HTML5, SCSS/CSS, JavaScript
- **Spatial data authoring** — QGIS (open-source desktop GIS)
- **Spatial database** — PostgreSQL + PostGIS extension
- **Map server** — GeoServer (serves WMS/WFS from PostGIS)
- **Map client** — Mapstore for the dashboard

## Project Structure

```
LaundryGIS/
├── index.html         # Landing page
├── peta.html          # Interactive map view
├── kategori.html      # Category / filter view
├── data.html          # Tabular data view
├── feature.html       # Feature description page
├── team.html          # Team page
├── css/               # Compiled CSS
├── scss/              # SCSS source
├── js/                # Frontend logic
├── lib/               # Third-party libraries
├── img/               # Images and icons
├── Additional Data/   # Supplementary geospatial data
├── LICENSE
└── README.md
```

## Getting Started

**1. Clone the repo**

```bash
git clone https://github.com/aljuhaeda/LaundryGIS.git
cd LaundryGIS
```

**2. Serve the frontend**

The app is a static site — open `index.html` directly, or serve it with any local web server:

```bash
# Option A: Python
python -m http.server 8000

# Option B: PHP (matches the original XAMPP setup)
php -S localhost:8000

# Option C: Node
npx http-server .
```

Then open `http://localhost:8000` in a browser.

**3. (Optional) Backend spatial stack**

For the full WebGIS experience, install the backend:

- **PostgreSQL** with the **PostGIS** extension
- **GeoServer** — connect to your PostGIS database and publish layers
- **Mapstore** — connect to GeoServer for the dashboard

Import the geospatial data (SHP / GeoJSON) from `Additional Data/` into PostGIS via QGIS or `shp2pgsql`.

## License

MIT. See [LICENSE](LICENSE).

## Author

**Zul Iflah Al Juhaeda** — [LinkedIn](https://linkedin.com/in/aljuhaeda) · [GitHub](https://github.com/aljuhaeda)
