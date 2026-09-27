<div align="center">
  <img src="public/hero-image.png" alt="Crimelens Cover" width="100%" />

  <br />
  <br />

  <h1>🛡️ Crimelens</h1>
  
  <p>
    <b>Geospatial Intelligence & Crime Pattern Analysis Platform for India</b>
  </p>

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://leafletjs.com/"><img src="https://img.shields.io/badge/Leaflet-React--Leaflet-199900?style=for-the-badge&logo=leaflet" alt="Leaflet" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" /></a>
  </p>
</div>

<hr />

## 📖 The Vision

**Crimelens** is a high-performance, interactive analytical dashboard engineered to interrogate the National Crime Records Bureau (NCRB) dataset. With a focus on district-level intelligence (2013 data), this platform transforms raw, monolithic government logs into an explorable, visual format. 

By mapping over **1,482 incident groups** across **35 states and UTs**, Crimelens provides researchers, journalists, and policymakers an intuitive lens to uncover geographic concentration, dominant incident patterns, and granular district profiles.

---

## ✨ Core Modules

### 🗺️ Geospatial Intelligence Map
Pinpoint incidents across India's 53+ districts. 
* **Interactive Markers:** Navigate through district-level data points.
* **Density Heatmaps:** Visualize crime concentration dynamically.
* **Safety Scores:** Proprietary algorithmic assessment of neighborhood vulnerability.

### 📊 Pattern & Trend Analysis
Uncover statistical realities through visual storytelling.
* **Categorical Dominance:** Instantly identify prevalent crime types (e.g., Property vs. Violent crimes).
* **Hotspot Highlighting:** Cross-examine regional data against national averages using intuitive Recharts visualizations.

### 🗄️ Raw Data Access
A forensic, paginated view into the NCRB database.
* **Multi-filter Sorting:** Filter by state, district, or specific IPC crime heads instantly.
* **Live Search:** Execute rapid queries on a sprawling dataset.

---

## 🚀 Quick Start

To run Crimelens locally, ensure you have Node.js (v20+) installed.

```bash
# 1. Clone the repository
git clone https://github.com/Subee2801/Crimelens.git
cd Crimelens

# 2. Install dependencies
npm install

# 3. Launch the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 🏗️ Architecture & Tech Stack

The platform is designed around a modern, React-driven ecosystem:

* **Framework:** Next.js 16 (App Router)
* **UI/Styling:** Tailwind CSS v4, Lucide React (Icons)
* **Mapping:** Leaflet & React-Leaflet, Leaflet.heat
* **Data Processing:** Papaparse (for robust client-side CSV parsing)
* **Visualization:** Recharts

### Project Structure
<details>
<summary><b>Click to view repository structure</b></summary>

```text
Crimelens/
├── public/                 # Static assets (Hero images, map icons, raw NCRB CSV data)
├── src/
│   ├── app/                # Next.js App Router (Pages for Map, Trends, Data)
│   ├── components/         # Reusable UI components (Nav, Maps, Charts, Skeletons)
│   ├── context/            # React Context (FilterContext for global state)
│   └── utils/              # Helper functions (SafetyScore algorithms)
├── package.json            # Dependencies & Scripts
└── tailwind.config.js      # Utility-first styling configuration
```
</details>

---

## 🤝 Contributing

Contributions are welcome! If you're interested in adding new data sets, improving the heat mapping algorithms, or optimizing UI performance:
1. Fork the project.
2. Create your feature branch: `git checkout -b feature/new-dataset`
3. Commit your changes: `git commit -m 'Add new dataset visualization'`
4. Push to the branch: `git push origin feature/new-dataset`
5. Open a Pull Request.

---

## 📜 License & Data Source
**Source Data:** National Crime Records Bureau (NCRB) · Ministry of Home Affairs, Govt. of India · NDSAP Open License.
