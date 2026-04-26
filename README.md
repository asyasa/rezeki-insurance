# PT Rezeki Assurance — ERP Mock Dashboard

Static, client-side ERP dashboard for PT Rezeki Assurance (an Indonesian insurance company). **No frameworks, no build tool, no backend.**

Written entirely in vanilla HTML / CSS / JS. All data is hardcoded in `js/data.js`.

## Preview

```
.
├── index.html
├── css/style.css
└── js/
    ├── data.js    # All mock tables (nasabah, polis, klaim, keuangan, sales, ...)
    ├── util.js    # IDR formatter, table builder, tooltip, DOM helpers
    ├── charts.js  # Chart.js global config + factory functions
    ├── pages.js   # Renderers for all 37 pages
    └── app.js     # Nav tree, routing, theme, global search
```

## Running locally

Any static HTTP server works. Easiest:

```bash
# Python 3
python3 -m http.server 8080

# Node.js
npx serve .
```

Then open `http://localhost:8080/`.

## Features

- 37 pages across 12 sidebar groups (Dashboard, Nasabah, Klaim, Keuangan,
  Sales, SDM, Produk, Kemitraan, Perusahaan, Risiko, Sistem, Denah Kantor)
- Light / dark theme toggle (palette `#07beb8` family — no gradients)
- Chart.js dashboards (bar, doughnut, line, radar, stacked, horizontal)
- Interactive SVG floor plan (7 lantai, room hover tooltips)
- Custom HTML hover tooltips on every table row
- Drag-and-drop leads kanban (Hot / Warm / Cold)
- Activity heatmap for sales monitoring (30 days × agents)
- Risk matrix (probabilitas × dampak, plotted dots)
- Anomali alert cards with ESKALASI OJK badge (ANM-003)
- Org chart (HTML tree)
- Responsive sidebar (auto-collapses under 1100 px)
- Sort / search / pagination on every table
- Back-to-top button, breadcrumb, skeleton loader on page switch
- Print stylesheet (sidebar + nav hidden)

## Data

All 30+ tables live in `js/data.js` as plain JS arrays. Edit there to change
the dashboard content.

## Tech

- **Chart.js 4.4.1** (CDN)
- **RemixIcon 4.2.0** (CDN)
- Profile avatars via `ui-avatars.com`, bank/company logos via
  `logo.clearbit.com`.

## Credits

Mock data, copy, and design brief by PT Rezeki Assurance (fictional).
