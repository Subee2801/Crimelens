import {
  Info,
  Shield,
  Code2,
  Database,
  AlertTriangle,
  Calendar,
  Map,
  BarChart3,
  Clock,
  Users,
  FileText,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Layers,
  Globe,
  Lock,
  BookOpen,
  Cpu,
} from "lucide-react";

// ── Shared card ──────────────────────────────────────────────────────────────
function Card({
  children,
  className = "",
  redBorder = false,
}: {
  children: React.ReactNode;
  className?: string;
  redBorder?: boolean;
}) {
  return (
    <div
      className={`rounded p-6 sm:p-7 shadow-xl animate-on-scroll ${className}`}
      style={{
        background: "var(--cl-surface)",
        border: "1px solid var(--cl-border)",
        borderLeft: redBorder ? "3px solid var(--cl-red)" : "1px solid var(--cl-border)",
      }}
    >
      {children}
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <h2
      className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 mb-6"
      style={{
        color: "var(--cl-text)",
        fontFamily: "var(--font-playfair), Georgia, serif",
      }}
    >
      <Icon className="w-6 h-6 shrink-0" style={{ color: "var(--cl-red)" }} />
      {label}
    </h2>
  );
}

// ── Limitation item ───────────────────────────────────────────────────────────
function LimitationItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-0.5 p-1.5 rounded shrink-0"
        style={{
          background: "rgba(245, 158, 11, 0.1)",
          border: "1px solid rgba(245, 158, 11, 0.2)",
        }}
      >
        <AlertTriangle className="w-3.5 h-3.5" style={{ color: "#f59e0b" }} />
      </div>
      <div>
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--cl-text-2)" }}
        >
          {title}
        </p>
        <p
          className="text-xs mt-1 leading-relaxed"
          style={{ color: "var(--cl-text-3)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({
  value,
  label,
  red = false,
}: {
  value: string;
  label: string;
  red?: boolean;
}) {
  return (
    <div
      className="text-center p-4 sm:p-5 rounded space-y-1"
      style={{
        background: "var(--cl-bg)",
        border: "1px solid var(--cl-border)",
        borderTop: red ? "2px solid var(--cl-red)" : "1px solid var(--cl-border)",
      }}
    >
      <p
        className="text-2xl sm:text-3xl font-extrabold font-mono"
        style={{ color: red ? "var(--cl-red)" : "var(--cl-text)" }}
      >
        {value}
      </p>
      <p className="text-xs leading-tight" style={{ color: "var(--cl-text-3)" }}>
        {label}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-5 animate-on-scroll">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          style={{
            background: "var(--cl-red-dim)",
            border: "1px solid rgba(214,40,40,0.3)",
            color: "var(--cl-red)",
            letterSpacing: "0.15em",
          }}
        >
          <Info className="w-3.5 h-3.5" />
          About This Project
        </div>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
          style={{
            color: "var(--cl-text)",
            fontFamily: "var(--font-playfair), Georgia, serif",
          }}
        >
          About &amp; Data Sources
        </h1>
        <p
          className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          style={{ color: "var(--cl-text-2)" }}
        >
          CrimeLens is an open-data analytics platform that transforms raw
          government crime records into interactive maps, filterable tables, and
          AI-generated pattern insights — designed for researchers, journalists,
          and public-safety professionals.
        </p>
      </section>

      {/* ── Dataset overview ─────────────────────────────────────────────────── */}
      <section>
        <Card>
          <SectionHeading icon={Database} label="Dataset Overview" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatPill value="2013" label="Data year" red />
            <StatPill value="35"   label="States & UTs covered" red />
            <StatPill value="53+"  label="Cities / districts" />
            <StatPill value="IPC"  label="Legal framework" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3
                className="text-base font-bold flex items-center gap-2"
                style={{ color: "var(--cl-text)" }}
              >
                <FileText className="w-4 h-4" style={{ color: "var(--cl-red)" }} />
                Source File
              </h3>
              <div
                className="text-xs space-y-2 leading-relaxed"
                style={{ color: "var(--cl-text-2)" }}
              >
                <p>
                  <span className="font-semibold" style={{ color: "var(--cl-text)" }}>
                    File name:
                  </span>{" "}
                  <code
                    className="font-mono px-1.5 py-0.5 rounded"
                    style={{
                      background: "var(--cl-bg)",
                      color: "var(--cl-text-2)",
                    }}
                  >
                    dstrIPC_2013.csv
                  </code>
                </p>
                <p>
                  <span className="font-semibold" style={{ color: "var(--cl-text)" }}>
                    Publisher:
                  </span>{" "}
                  National Crime Records Bureau (NCRB), Ministry of Home Affairs,
                  Government of India
                </p>
                <p>
                  <span className="font-semibold" style={{ color: "var(--cl-text)" }}>
                    Portal:
                  </span>{" "}
                  <a
                    href="https://www.data.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 inline-flex items-center gap-1 transition-colors"
                    style={{ color: "var(--cl-red)" }}
                  >
                    data.gov.in <ExternalLink className="w-3 h-3" />
                  </a>{" "}
                  (India&apos;s official Open Government Data platform)
                </p>
                <p>
                  <span className="font-semibold" style={{ color: "var(--cl-text)" }}>
                    License:
                  </span>{" "}
                  NDSAP, Government of India — free for public, non-commercial,
                  and research use.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3
                className="text-base font-bold flex items-center gap-2"
                style={{ color: "var(--cl-text)" }}
              >
                <Calendar className="w-4 h-4" style={{ color: "var(--cl-red)" }} />
                Time Range &amp; Coverage
              </h3>
              <div
                className="text-xs space-y-2 leading-relaxed"
                style={{ color: "var(--cl-text-2)" }}
              >
                <p>
                  <span className="font-semibold" style={{ color: "var(--cl-text)" }}>
                    Period covered:
                  </span>{" "}
                  January 2013 – December 2013 (full calendar year)
                </p>
                <p>
                  <span className="font-semibold" style={{ color: "var(--cl-text)" }}>
                    Granularity:
                  </span>{" "}
                  Aggregated by <em>district</em> and <em>crime-head</em> category.
                </p>
                <p>
                  <span className="font-semibold" style={{ color: "var(--cl-text)" }}>
                    Geographic scope:
                  </span>{" "}
                  All Indian states and union territories, broken down to district
                  level.
                </p>
                <p>
                  <span className="font-semibold" style={{ color: "var(--cl-text)" }}>
                    Legal basis:
                  </span>{" "}
                  Offences registered under the Indian Penal Code (IPC), 1860.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ── Column schema ────────────────────────────────────────────────────── */}
      <section>
        <Card>
          <SectionHeading icon={Layers} label="Data Schema & Field Mapping" />
          <div
            className="overflow-x-auto table-scroll-wrapper rounded"
            style={{ border: "1px solid var(--cl-border)" }}
          >
            <table className="w-full min-w-[500px] text-xs text-left">
              <thead
                className="font-mono uppercase tracking-wider"
                style={{
                  background: "var(--cl-bg)",
                  color: "var(--cl-text-3)",
                  borderBottom: "1px solid var(--cl-border)",
                  letterSpacing: "0.08em",
                }}
              >
                <tr>
                  <th className="px-5 py-3.5">CSV Column</th>
                  <th className="px-5 py-3.5">App Field</th>
                  <th className="px-5 py-3.5">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["STATE/UT",       "state",        "Name of the Indian state or union territory"],
                  ["DISTRICT",       "neighborhood", "District within the state (mapped as 'Neighborhood')"],
                  ["GROUP NAME",     "crimeType",    "Broad IPC crime category (e.g., 'Dacoity', 'Murder')"],
                  ["CASES_REPORTED", "count",        "Total cases registered in that district for 2013"],
                  ["YEAR",           "date",         "Year of report (all rows: 2013). Used as 'Date' field"],
                ].map(([csv, app, desc]) => (
                  <tr
                    key={csv}
                    className="transition-colors"
                    style={{ borderBottom: "1px solid var(--cl-border)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(214,40,40,0.03)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                  >
                    <td
                      className="px-5 py-3.5 font-mono whitespace-nowrap"
                      style={{ color: "var(--cl-red)" }}
                    >
                      {csv}
                    </td>
                    <td
                      className="px-5 py-3.5 font-mono whitespace-nowrap"
                      style={{ color: "var(--cl-text-2)" }}
                    >
                      {app}
                    </td>
                    <td
                      className="px-5 py-3.5"
                      style={{ color: "var(--cl-text-3)" }}
                    >
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* ── Limitations ──────────────────────────────────────────────────────── */}
      <section>
        <Card redBorder>
          <SectionHeading icon={AlertTriangle} label="Dataset Limitations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <LimitationItem
              title="Reporting Delays & Under-Counting"
              description="Crimes reported to the NCRB depend on police stations actually filing FIRs. Studies estimate that only 15–35% of crimes in India are formally reported, meaning the true incidence rate is significantly higher than these figures suggest."
            />
            <LimitationItem
              title="Aggregated, Not Incident-Level"
              description="Each row represents the total count of a crime type for an entire district — not individual timestamps or GPS coordinates. All map points are geocoded to approximate city/district centroids, not precise crime scene locations."
            />
            <LimitationItem
              title="Single-Year Snapshot (2013)"
              description="The dataset captures only calendar year 2013. Trend analysis is computed across crime-type and district dimensions rather than true year-over-year temporal trends."
            />
            <LimitationItem
              title="IPC Categories Only"
              description="Offences recorded under Special & Local Laws (SLL) — such as the NDPS Act, cyber-crime statutes, or domestic violence legislation — are not included in this IPC-only dataset."
            />
            <LimitationItem
              title="District Boundary Changes"
              description="India's district map has changed since 2013 due to administrative reorganisations. Historical district names in this dataset may not match current geographic boundaries."
            />
            <LimitationItem
              title="No Demographic Context"
              description="Raw case counts are not normalised by population. High-count districts may simply have larger populations rather than higher per-capita crime rates. Interpret absolute figures with caution."
            />
          </div>
        </Card>
      </section>

      {/* ── Tech stack ───────────────────────────────────────────────────────── */}
      <section>
        <Card>
          <SectionHeading icon={Cpu} label="Technology Stack" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Code2,
                title: "Next.js 15 (App Router)",
                desc: "React Server Components, client islands, dynamic imports for SSR-safe Leaflet loading.",
              },
              {
                icon: Map,
                title: "Leaflet.js + OpenStreetMap",
                desc: "Free interactive maps with point markers, popups, and heatmap layer via leaflet.heat — no API key required.",
              },
              {
                icon: BarChart3,
                title: "Recharts",
                desc: "Composable React charting for bar (crime types) and area (incidents over time) trend visualisations.",
              },
              {
                icon: Database,
                title: "PapaParse",
                desc: "Streaming CSV parser with header detection, malformed-row skipping, and robust type coercion.",
              },
              {
                icon: Globe,
                title: "FilterContext (React)",
                desc: "Global shared state ensures crime-type, date-range and neighbourhood filters update all views simultaneously.",
              },
              {
                icon: Shield,
                title: "TypeScript + Tailwind CSS",
                desc: "End-to-end type safety with a utility-first, responsive design system and editorial dark-mode colour palette.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-4 rounded transition-all"
                style={{
                  background: "var(--cl-bg)",
                  border: "1px solid var(--cl-border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cl-red)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cl-border)";
                }}
              >
                <div
                  className="p-2.5 rounded shrink-0 h-fit"
                  style={{ background: "var(--cl-red-dim)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--cl-red)" }} />
                </div>
                <div>
                  <p
                    className="text-sm font-bold mb-1"
                    style={{ color: "var(--cl-text)" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--cl-text-3)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── What IS vs IS NOT in scope ───────────────────────────────────────── */}
      <section>
        <Card>
          <SectionHeading icon={BookOpen} label="Scope of This Application" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p
                className="text-sm font-bold flex items-center gap-2"
                style={{ color: "#10b981" }}
              >
                <CheckCircle2 className="w-4 h-4" /> What this app provides
              </p>
              {[
                "District-level IPC crime aggregates for all of India, 2013",
                "Interactive heatmap & point-marker map visualisation",
                "Sortable, paginated, searchable data table",
                "AI-generated natural-language pattern summaries",
                "Live-synced filters across all views",
                "Bar & area charts for distribution & time trend",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: "var(--cl-text-2)" }}
                >
                  <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: "#10b981" }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <p
                className="text-sm font-bold flex items-center gap-2"
                style={{ color: "var(--cl-red)" }}
              >
                <XCircle className="w-4 h-4" /> What this app does NOT provide
              </p>
              {[
                "Real-time or live crime feeds",
                "Individual incident records with exact times & addresses",
                "Post-2013 data or multi-year comparisons",
                "SLL (Special & Local Laws) offence categories",
                "Population-normalised or per-capita crime rates",
                "Personally identifiable information of any kind",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: "var(--cl-text-2)" }}
                >
                  <XCircle
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: "var(--cl-red)" }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* ── Useful links ─────────────────────────────────────────────────────── */}
      <section>
        <Card>
          <SectionHeading icon={ExternalLink} label="Official Data Sources & References" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "data.gov.in — India Open Data Portal",
                url: "https://www.data.gov.in",
                desc: "The official Indian Government open data repository where the NCRB district-level IPC dataset originates.",
              },
              {
                title: "NCRB — National Crime Records Bureau",
                url: "https://ncrb.gov.in",
                desc: "Primary custodian and publisher of national crime statistics in India, under the Ministry of Home Affairs.",
              },
              {
                title: "OpenStreetMap",
                url: "https://www.openstreetmap.org",
                desc: "Open, community-maintained map tiles used for the interactive geospatial view. No API key required.",
              },
              {
                title: "Leaflet.js",
                url: "https://leafletjs.com",
                desc: "Open-source JavaScript library powering the interactive map, marker clustering, and heatmap layer.",
              },
            ].map(({ title, url, desc }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded transition-all group"
                style={{
                  background: "var(--cl-bg)",
                  border: "1px solid var(--cl-border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cl-red)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cl-border)";
                }}
              >
                <ExternalLink
                  className="w-4 h-4 shrink-0 mt-0.5 transition-colors"
                  style={{ color: "var(--cl-text-3)" }}
                />
                <div>
                  <p
                    className="text-sm font-semibold mb-1 transition-colors"
                    style={{ color: "var(--cl-text-2)" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--cl-text-3)" }}
                  >
                    {desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Card>
      </section>

      {/* ── Privacy notice ───────────────────────────────────────────────────── */}
      <section className="animate-on-scroll">
        <div
          className="flex items-start gap-4 p-5 sm:p-6 rounded text-xs"
          style={{
            background: "var(--cl-surface)",
            border: "1px solid var(--cl-border)",
            borderLeft: "3px solid var(--cl-red)",
            color: "var(--cl-text-3)",
          }}
        >
          <Lock
            className="w-5 h-5 shrink-0 mt-0.5"
            style={{ color: "var(--cl-red)" }}
          />
          <div className="space-y-1.5">
            <span
              className="font-bold block text-sm"
              style={{ color: "var(--cl-text)" }}
            >
              Privacy &amp; Responsible Use Notice
            </span>
            <p className="leading-relaxed">
              This platform presents only{" "}
              <strong style={{ color: "var(--cl-text-2)" }}>
                aggregated, anonymised, district-level statistics
              </strong>{" "}
              published by the Government of India. No personally identifiable
              information (PII), names, addresses, or individual case details are
              stored, processed, or displayed. The data is used strictly for
              educational, research, and public-interest purposes in accordance with
              the{" "}
              <strong style={{ color: "var(--cl-text-2)" }}>
                National Data Sharing and Accessibility Policy (NDSAP)
              </strong>
              .
            </p>
            <p className="leading-relaxed" style={{ color: "var(--cl-text-3)" }}>
              Crime statistics should always be interpreted in their proper social
              and economic context. Raw numbers do not capture systemic factors —
              including policing patterns, population density, reporting culture, and
              socioeconomic conditions — that influence recorded crime rates.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer timestamp ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-center gap-2 text-xs pb-4"
        style={{ color: "var(--cl-text-3)" }}
      >
        <Clock className="w-3.5 h-3.5" />
        <span>
          CrimeLens · Dataset: NCRB dstrIPC_2013 · Last updated: August 2026
        </span>
      </div>
    </main>
  );
}
