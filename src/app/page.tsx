import Link from "next/link";
import {
  Map,
  BarChart3,
  MapPin,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Database,
  Calendar,
  Shield,
  Newspaper,
} from "lucide-react";

/* ── Inline stat cards for the "Breaking Board" ─────────────── */
const LIVE_STATS = [
  { value: "1,482",  unit: "INCIDENTS",  label: "Total Reported Cases",   icon: AlertTriangle },
  { value: "35",     unit: "STATES",     label: "States & UTs Covered",   icon: MapPin },
  { value: "53+",    unit: "DISTRICTS",  label: "Geographic Districts",   icon: Map },
  { value: "2013",   unit: "NCRB DATA",  label: "Source: Govt. of India", icon: Calendar },
];

/* ── Feature section cards ───────────────────────────────────── */
const FEATURE_CARDS = [
  {
    icon: Map,
    tag: "GEOSPATIAL INTELLIGENCE",
    title: "Interactive Crime Map",
    deck: "Pinpoint incidents across India's 53+ districts. Switch between point markers, density heatmap, and neighborhood safety scores.",
    href: "/map",
    cta: "Open Map View",
    delay: "anim-delay-1",
  },
  {
    icon: BarChart3,
    tag: "PATTERN ANALYSIS",
    title: "Trends & Charts",
    deck: "Bar and area charts show which crime categories dominate, how volumes shift over time, and which districts surface as hotspots.",
    href: "/trends",
    cta: "Explore Trends",
    delay: "anim-delay-2",
  },
  {
    icon: Database,
    tag: "RAW DATA ACCESS",
    title: "Full Incident Logs",
    deck: "Sortable, paginated, and searchable table of every record. Filter by crime type, date range, and neighborhood simultaneously.",
    href: "/data",
    cta: "Browse Data Table",
    delay: "anim-delay-3",
  },
];

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — BREAKING BOARD (stat strip, above the fold)
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--cl-surface)",
          borderBottom: "1px solid var(--cl-border)",
        }}
      >
        {/* Masthead ticker label */}
        <div
          className="px-4 sm:px-8 py-2 flex items-center gap-3"
          style={{ borderBottom: "1px solid var(--cl-border)" }}
        >
          <span
            className="editorial-label flex items-center gap-2"
            style={{ color: "var(--cl-red)" }}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{
                background: "var(--cl-red)",
                animation: "red-pulse 2s infinite",
              }}
            />
            Live Intelligence Feed
          </span>
          <span
            className="h-3 w-px"
            style={{ background: "var(--cl-border-2)" }}
          />
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--cl-text-3)" }}
          >
            NCRB District-Level IPC Data · India · 2013
          </span>
        </div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0"
          style={{ borderColor: "var(--cl-border)" }}>
          {LIVE_STATS.map(({ value, unit, label, icon: Icon }) => (
            <div
              key={unit}
              className="px-6 py-6 flex flex-col gap-1 group relative overflow-hidden"
              style={{ borderColor: "var(--cl-border)" }}
            >
              {/* subtle red glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "var(--cl-red-dim)" }}
              />
              <div className="flex items-center gap-2 relative">
                <Icon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: "var(--cl-red)" }}
                />
                <span className="editorial-label" style={{ color: "var(--cl-text-3)" }}>
                  {unit}
                </span>
              </div>
              <p
                className="text-4xl sm:text-5xl font-black tabular-nums relative"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  color: "var(--cl-red)",
                  lineHeight: 1,
                }}
              >
                {value}
              </p>
              <p
                className="text-xs font-medium relative"
                style={{ color: "var(--cl-text-2)" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — EDITORIAL DIGEST (headline + sidebar)
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-10 sm:py-14"
        style={{ borderBottom: "1px solid var(--cl-border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Left — Main editorial headline block */}
            <div className="lg:col-span-2 animate-on-scroll">
              {/* Section kicker */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="editorial-label"
                  style={{ color: "var(--cl-red)" }}
                >
                  <Newspaper className="w-3 h-3 inline mr-1.5" />
                  Intelligence Digest
                </span>
                <span className="red-divider flex-1" />
              </div>

              {/* Main editorial headline */}
              <h1
                className="editorial-headline mb-5"
                style={{
                  color: "var(--cl-text)",
                  fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                }}
              >
                Crime Patterns Across{" "}
                <em style={{ color: "var(--cl-red)" }}>India</em>
                {" "}— NCRB District Intelligence, 2013
              </h1>

              {/* Lead paragraphs — editorial "deck" copy */}
              <div
                className="space-y-4 text-base leading-relaxed"
                style={{
                  color: "var(--cl-text-2)",
                  fontFamily: "var(--font-inter)",
                  borderLeft: "3px solid var(--cl-red)",
                  paddingLeft: "1.25rem",
                }}
              >
                <p>
                  India's National Crime Records Bureau documented{" "}
                  <strong style={{ color: "var(--cl-text)" }}>1,482 aggregated incident groups</strong>{" "}
                  across 35 states and union territories in 2013. The data, structured
                  by district and IPC crime head, reveals pronounced geographic concentration
                  — a handful of urban districts account for a disproportionate share
                  of reported volume.
                </p>
                <p>
                  Property crimes and theft-related offenses dominate the case count,
                  with violent crime categories — including murder, robbery, and dacoity —
                  forming a smaller but geographically clustered subset. This platform
                  lets you interrogate every district's profile interactively.
                </p>
              </div>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all"
                  style={{
                    background: "var(--cl-red)",
                    color: "#fff",
                    letterSpacing: "0.1em",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "var(--cl-red-dark)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "var(--cl-red)")
                  }
                >
                  <Map className="w-4 h-4" />
                  Launch Map
                </Link>
                <Link
                  href="/trends"
                  className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--cl-border-2)",
                    color: "var(--cl-text-2)",
                    letterSpacing: "0.1em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--cl-red)";
                    (e.currentTarget as HTMLElement).style.color = "var(--cl-red)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--cl-border-2)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--cl-text-2)";
                  }}
                >
                  View Trends & Data
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right — Editorial sidebar (quick facts panel) */}
            <div className="animate-on-scroll anim-delay-2">
              <div
                className="rounded p-6 h-full space-y-5"
                style={{
                  background: "var(--cl-surface)",
                  border: "1px solid var(--cl-border)",
                }}
              >
                {/* Sidebar header */}
                <div>
                  <p
                    className="editorial-label mb-3"
                    style={{ color: "var(--cl-red)" }}
                  >
                    Key Indicators
                  </p>
                  <div
                    className="h-px mb-4"
                    style={{ background: "var(--cl-border)" }}
                  />
                </div>

                {/* Sidebar stat rows */}
                {[
                  {
                    icon: TrendingUp,
                    label: "Highest Volume Category",
                    value: "Theft & Property",
                    sub: "Dominant across all districts",
                  },
                  {
                    icon: MapPin,
                    label: "Top Incident District",
                    value: "Major Urban Centers",
                    sub: "Mumbai · Delhi · Bengaluru",
                  },
                  {
                    icon: Shield,
                    label: "Coverage",
                    value: "All 35 States & UTs",
                    sub: "India-wide district breakdown",
                  },
                  {
                    icon: AlertTriangle,
                    label: "IPC Crime Categories",
                    value: "Multiple Heads",
                    sub: "Murder, Theft, Dacoity + more",
                  },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 pb-4"
                    style={{ borderBottom: "1px solid var(--cl-border)" }}
                  >
                    <div
                      className="w-7 h-7 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "var(--cl-red-dim)" }}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: "var(--cl-red)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
                        style={{ color: "var(--cl-text-3)" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--cl-text)" }}
                      >
                        {value}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--cl-text-3)" }}
                      >
                        {sub}
                      </p>
                    </div>
                  </div>
                ))}

                <Link
                  href="/about"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: "var(--cl-red)", letterSpacing: "0.12em" }}
                >
                  About This Dataset <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — PLATFORM FEATURE CARDS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="flex items-center gap-4 mb-10 animate-on-scroll">
            <div>
              <p
                className="editorial-label mb-1"
                style={{ color: "var(--cl-red)" }}
              >
                Platform Modules
              </p>
              <h2
                className="font-editorial font-bold"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  color: "var(--cl-text)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Three Ways to Investigate the Data
              </h2>
            </div>
            <div className="flex-1 h-px hidden sm:block" style={{ background: "var(--cl-border)" }} />
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border"
            style={{ borderColor: "var(--cl-border)" }}>
            {FEATURE_CARDS.map(({ icon: Icon, tag, title, deck, href, cta, delay }, i) => (
              <div
                key={href}
                className={`animate-on-scroll ${delay} group relative p-8 flex flex-col gap-5 transition-all`}
                style={{
                  background: "var(--cl-surface)",
                  borderRight: i < 2 ? `1px solid var(--cl-border)` : "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--cl-surface-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--cl-surface)";
                }}
              >
                {/* Red top accent line — grows on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 transition-all"
                  style={{
                    background: "var(--cl-red)",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />

                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center"
                      style={{ background: "var(--cl-red-dim)" }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: "var(--cl-red)" }}
                      />
                    </div>
                    <span
                      className="editorial-label"
                      style={{ color: "var(--cl-red)", letterSpacing: "0.14em" }}
                    >
                      {tag}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      color: "var(--cl-text)",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--cl-text-2)" }}
                  >
                    {deck}
                  </p>
                </div>

                <div className="mt-auto pt-5" style={{ borderTop: "1px solid var(--cl-border)" }}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
                    style={{ color: "var(--cl-red)", letterSpacing: "0.12em" }}
                  >
                    {cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — DATA SOURCE BANNER (editorial footer strip)
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-6 animate-on-scroll"
        style={{
          background: "var(--cl-surface)",
          borderTop: "1px solid var(--cl-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 rounded flex items-center justify-center shrink-0"
              style={{ background: "var(--cl-red-dim)" }}
            >
              <Shield className="w-4 h-4" style={{ color: "var(--cl-red)" }} />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--cl-text)", letterSpacing: "0.15em" }}
              >
                Official Government Data
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--cl-text-3)" }}>
                Source: NCRB · Ministry of Home Affairs, Govt. of India ·
                NDSAP Open License
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="text-xs font-semibold uppercase tracking-wider transition-colors"
            style={{ color: "var(--cl-text-3)", letterSpacing: "0.1em" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--cl-red)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--cl-text-3)")
            }
          >
            Read Methodology & Limitations →
          </Link>
        </div>
      </section>
    </div>
  );
}
