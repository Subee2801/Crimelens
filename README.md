<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=B91C1C&height=220&section=header&text=CrimeLens&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Geospatial%20Crime%20Intelligence%20for%20India&descAlignY=60&descAlign=50&descSize=20" width="100%" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=B91C1C&center=true&vCenter=true&width=700&lines=Mapping+1%2C482+Crime+Incidents+Across+India;NCRB+District-Level+Intelligence+%C2%B7+2013;Interactive+Heatmaps+%2B+Safety+Scores;Open+Government+Data%2C+Made+Explorable" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=next.js&logoColor=white" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>
  <a href="https://leafletjs.com/"><img src="https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white" /></a>
  <a href="https://recharts.org/"><img src="https://img.shields.io/badge/Recharts-Charts-FF6B6B?style=for-the-badge" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Data%20Source-NCRB%20%C2%B7%20Govt.%20of%20India-B91C1C?style=flat-square" />
  <img src="https://img.shields.io/badge/Coverage-35%20States%20%26%20UTs-B91C1C?style=flat-square" />
  <img src="https://img.shields.io/badge/Incidents-1%2C482%20Groups-B91C1C?style=flat-square" />
  <img src="https://img.shields.io/badge/License-NDSAP%20Open-22c55e?style=flat-square" />
</p>

---

## 📖 The Vision

**CrimeLens** transforms raw, monolithic National Crime Records Bureau (NCRB) logs into an explorable, visual intelligence platform. With a newspaper-editorial aesthetic and precision-first design, it lets researchers, journalists, and policymakers interrogate every district's crime profile interactively.

> India's NCRB documented **1,482 aggregated incident groups** across **35 states and union territories** in 2013. A handful of urban districts account for a disproportionate share — CrimeLens makes that visible.

---

## ✨ Platform Modules

<table>
<tr>
<td width="33%" align="center">

### 🗺️ Interactive Map
Pinpoint incidents across **53+ districts**. Switch between point markers, density heatmaps, and algorithmic safety scores.

**→ [Open Map View](/map)**

</td>
<td width="33%" align="center">

### 📊 Trends & Charts
Bar and area charts reveal which crime categories dominate, volume shifts, and which districts surface as hotspots.

**→ [Explore Trends](/trends)**

</td>
<td width="33%" align="center">

### 🗄️ Raw Data Table
Sortable, paginated, searchable table of every NCRB record. Filter by crime type, date range, and neighborhood.

**→ [Browse Data](/data)**

</td>
</tr>
</table>

---

## 🔑 Key Indicators

| Metric | Value |
|---|---|
| 📍 Total Incident Groups | **1,482** |
| 🏛️ States & UTs Covered | **35** |
| 🗺️ Geographic Districts | **53+** |
| 📅 Dataset Year | **2013 (NCRB)** |
| 🔝 Highest Volume Category | **Theft & Property Crimes** |
| 🏙️ Top Urban Districts | **Mumbai · Delhi · Bengaluru** |

---

## 🚀 Quick Start

> **Prerequisites:** Node.js v20+

```bash
# Clone the repository
git clone https://github.com/Subee2801/Crimelens.git
cd Crimelens

# Install dependencies
npm install

# Launch the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the platform.

---

## 🏗️ Tech Stack & Architecture

```
CrimeLens
├── Framework       →  Next.js 16.3  (App Router)
├── Styling         →  Tailwind CSS v4  +  Lucide React icons
├── Maps            →  Leaflet  +  React-Leaflet  +  Leaflet.heat
├── Charts          →  Recharts  (bar, area, composed)
├── Data Parsing    →  PapaParse  (client-side CSV)
├── Language        →  TypeScript 5
└── Data Source     →  NCRB dstrIPC_2013.csv  (Govt. of India)
```

<details>
<summary><b>📁 Repository Structure</b></summary>

```
Crimelens/
├── public/
│   ├── crime_data.csv          # Primary NCRB dataset
│   ├── dstrIPC_2013.csv        # District-level IPC crime data
│   └── hero-image.png          # Landing page visual
├── src/
│   ├── app/
│   │   ├── page.tsx            # Home — editorial digest + stat board
│   │   ├── map/page.tsx        # Interactive Leaflet crime map
│   │   ├── trends/page.tsx     # Recharts pattern analysis
│   │   ├── data/page.tsx       # Searchable raw data table
│   │   └── about/page.tsx      # Methodology & data limitations
│   ├── components/
│   │   ├── MapComponent.tsx    # Leaflet map + heatmap layer
│   │   ├── TrendCharts.tsx     # All chart visualizations
│   │   ├── FilterPanel.tsx     # Global filter UI
│   │   ├── AiSummaryCard.tsx   # District summary cards
│   │   ├── Navbar.tsx          # Navigation
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Skeletons.tsx       # Loading skeleton states
│   │   └── ScrollAnimator.tsx  # Scroll-triggered animations
│   ├── context/
│   │   └── FilterContext.tsx   # Global filter state (React Context)
│   └── utils/
│       └── safetyScore.ts      # Safety score algorithm
├── package.json
└── next.config.ts
```

</details>

---

## 🤝 Contributing

Contributions are welcome — especially around expanding datasets or improving the heatmap algorithm.

```bash
# 1. Fork & clone
git checkout -b feature/your-feature-name

# 2. Make your changes, then commit
git commit -m "feat: describe your change"

# 3. Push and open a Pull Request
git push origin feature/your-feature-name
```

**Areas that benefit most from contributions:**
- 🗓️ Additional NCRB years (2014–2023)
- 🌐 State-level choropleth map layer
- 🤖 AI-powered district summary generation
- 📱 Mobile-first responsive improvements

---

## 📜 Data & License

**Source:** National Crime Records Bureau (NCRB) · Ministry of Home Affairs, Government of India  
**License:** [NDSAP Open Government Data License](https://data.gov.in/government-open-data-license-india)  
**Note:** This platform is for research and educational purposes only.

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=B91C1C&height=120&section=footer&animation=fadeIn" width="100%" />
</p>

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Subee2801">Subee2801</a> · Powered by open government data</sub>
</p>
