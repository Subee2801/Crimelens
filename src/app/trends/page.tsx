"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useFilter, IncidentRecord } from "@/context/FilterContext";
import FilterPanel from "@/components/FilterPanel";
import AiSummaryCard from "@/components/AiSummaryCard";
import TrendCharts from "@/components/TrendCharts";
import {
  MapSkeleton,
  TableSkeleton,
  ChartSkeleton,
  SummarySkeleton,
} from "@/components/Skeletons";
import {
  BarChart3,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MapPin,
  Flame,
  Calendar,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default function TrendsPage() {
  const { filteredRecords, loading, searchTerm, setSearchTerm } = useFilter();
  const [mapViewMode, setMapViewMode] = useState<"points" | "heatmap">("points");
  const [sortColumn, setSortColumn] = useState<keyof IncidentRecord>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const aVal = a[sortColumn] ?? "";
      const bVal = b[sortColumn] ?? "";
      if (typeof aVal === "number" && typeof bVal === "number")
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      const sa = String(aVal).toLowerCase();
      const sb = String(bVal).toLowerCase();
      return sa < sb
        ? sortDirection === "asc" ? -1 : 1
        : sa > sb
        ? sortDirection === "asc" ? 1 : -1
        : 0;
    });
  }, [filteredRecords, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / pageSize));
  const paginatedRecords = useMemo(
    () => sortedRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [sortedRecords, currentPage, pageSize]
  );

  const handleSort = (col: keyof IncidentRecord) => {
    if (sortColumn === col) setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortColumn(col); setSortDirection("asc"); }
  };

  const SortIcon = ({ col }: { col: keyof IncidentRecord }) =>
    sortColumn !== col ? (
      <ArrowUpDown className="w-3 h-3" style={{ color: "var(--cl-text-3)" }} />
    ) : sortDirection === "asc" ? (
      <ArrowUp className="w-3 h-3" style={{ color: "var(--cl-red)" }} />
    ) : (
      <ArrowDown className="w-3 h-3" style={{ color: "var(--cl-red)" }} />
    );

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 animate-on-scroll"
        style={{ borderBottom: "1px solid var(--cl-border)" }}
      >
        <div>
          <p
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ color: "var(--cl-red)", letterSpacing: "0.12em" }}
          >
            <TrendingUp className="w-4 h-4" /> Trends & AI Insights
          </p>
          <h1
            className="text-2xl sm:text-3xl font-extrabold"
            style={{
              color: "var(--cl-text)",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            Crime Trends & Pattern Insights
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--cl-text-3)" }}>
            AI summary, charts, synchronized map & data table — driven by the same live filters.
          </p>
        </div>
      </div>

      {/* 1. Filter panel */}
      <FilterPanel />

      {/* 2. AI Summary */}
      {loading ? <SummarySkeleton /> : <AiSummaryCard records={filteredRecords} />}

      {/* 3. Charts */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton /> <ChartSkeleton />
        </div>
      ) : (
        <TrendCharts records={filteredRecords} />
      )}

      {/* 4. Spatial + tabular section */}
      <div
        className="space-y-6 pt-4"
        style={{ borderTop: "1px solid var(--cl-border)" }}
      >
        <h2
          className="text-xl font-bold flex items-center gap-2 animate-on-scroll"
          style={{
            color: "var(--cl-text)",
            fontFamily: "var(--font-playfair), Georgia, serif",
          }}
        >
          <BarChart3 className="w-5 h-5" style={{ color: "var(--cl-red)" }} />
          Synchronized Spatial & Tabular Views
        </h2>

        {/* Map */}
        <div
          className="rounded p-4 space-y-4 shadow-xl animate-on-scroll"
          style={{
            background: "var(--cl-surface)",
            border: "1px solid var(--cl-border)",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3"
            style={{ borderBottom: "1px solid var(--cl-border)" }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" style={{ color: "var(--cl-red)" }} />
              <h3
                className="text-base font-bold"
                style={{ color: "var(--cl-text)" }}
              >
                Spatial Density Map
              </h3>
              <span
                className="text-xs font-mono"
                style={{ color: "var(--cl-text-3)" }}
              >
                ({filteredRecords.length} pts)
              </span>
            </div>
            <div
              className="flex items-center gap-1 p-1 rounded self-start sm:self-auto"
              style={{
                background: "var(--cl-bg)",
                border: "1px solid var(--cl-border)",
              }}
            >
              {[
                { id: "points",  label: "Points",  Icon: MapPin },
                { id: "heatmap", label: "Heatmap", Icon: Flame },
              ].map(({ id, label, Icon }) => {
                const isActive = mapViewMode === id;
                return (
                  <button
                    key={id}
                    onClick={() => setMapViewMode(id as "points" | "heatmap")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all"
                    style={{
                      background: isActive ? "var(--cl-red)" : "transparent",
                      color: isActive ? "#fff" : "var(--cl-text-3)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="h-[360px] sm:h-[420px] w-full">
            {loading ? (
              <MapSkeleton />
            ) : (
              <MapComponent
                points={filteredRecords}
                viewMode={mapViewMode}
                center={[20.5937, 78.9629]}
                zoom={5}
                tileStyle="dark"
              />
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <TableSkeleton rows={6} />
        ) : (
          <div
            className="rounded overflow-hidden shadow-xl animate-on-scroll anim-delay-1"
            style={{
              background: "var(--cl-surface)",
              border: "1px solid var(--cl-border)",
            }}
          >
            <div
              className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
              style={{ borderBottom: "1px solid var(--cl-border)" }}
            >
              <h3
                className="text-base font-bold"
                style={{ color: "var(--cl-text)" }}
              >
                Filtered Incident Logs
              </h3>
              <div className="relative w-full sm:w-72">
                <Search
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--cl-text-3)" }}
                />
                <input
                  type="text"
                  placeholder="Search table…"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded pl-9 pr-4 py-2 text-sm focus:outline-none"
                  style={{
                    background: "var(--cl-bg)",
                    border: "1px solid var(--cl-border)",
                    color: "var(--cl-text-2)",
                  }}
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "var(--cl-red)")
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "var(--cl-border)")
                  }
                />
              </div>
            </div>

            <div className="table-scroll-wrapper">
              <table className="w-full min-w-[580px] text-left text-xs">
                <thead
                  className="uppercase tracking-wider font-mono select-none"
                  style={{
                    background: "var(--cl-bg)",
                    color: "var(--cl-text-3)",
                    borderBottom: "1px solid var(--cl-border)",
                    letterSpacing: "0.08em",
                  }}
                >
                  <tr>
                    {(
                      ["date", "crimeType", "neighborhood", "state", "count"] as (keyof IncidentRecord)[]
                    ).map((col) => (
                      <th
                        key={col}
                        onClick={() => handleSort(col)}
                        className={`px-5 py-4 cursor-pointer transition-colors whitespace-nowrap ${
                          col === "count" ? "text-right" : ""
                        }`}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "var(--cl-text)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "var(--cl-text-3)")
                        }
                      >
                        <div
                          className={`flex items-center gap-1.5 ${
                            col === "count" ? "justify-end" : ""
                          }`}
                        >
                          {col === "date" && (
                            <Calendar className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
                          )}
                          {col === "crimeType" && (
                            <ShieldAlert className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
                          )}
                          {col === "neighborhood" && (
                            <MapPin className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
                          )}
                          <span>
                            {col === "crimeType"
                              ? "Crime Type"
                              : col === "neighborhood"
                              ? "Neighborhood"
                              : col === "state"
                              ? "State / UT"
                              : col === "count"
                              ? "Cases"
                              : "Date"}
                          </span>
                          <SortIcon col={col} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ color: "var(--cl-text-2)" }}>
                  {paginatedRecords.map((row) => (
                    <tr
                      key={row.id}
                      className="transition-colors"
                      style={{ borderBottom: "1px solid var(--cl-border)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "rgba(214,40,40,0.04)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "transparent")
                      }
                    >
                      <td
                        className="px-5 py-3.5 font-mono whitespace-nowrap"
                        style={{ color: "var(--cl-text-3)" }}
                      >
                        {row.date}
                      </td>
                      <td
                        className="px-5 py-3.5 font-semibold whitespace-nowrap"
                        style={{ color: "var(--cl-text)" }}
                      >
                        {row.crimeType}
                      </td>
                      <td
                        className="px-5 py-3.5 font-medium whitespace-nowrap"
                        style={{ color: "var(--cl-text-2)" }}
                      >
                        {row.neighborhood}
                      </td>
                      <td
                        className="px-5 py-3.5 whitespace-nowrap"
                        style={{ color: "var(--cl-text-3)" }}
                      >
                        {row.state}
                      </td>
                      <td
                        className="px-5 py-3.5 text-right font-mono font-bold"
                        style={{ color: "var(--cl-red)" }}
                      >
                        {row.count.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
              style={{
                borderTop: "1px solid var(--cl-border)",
                background: "var(--cl-bg)",
                color: "var(--cl-text-3)",
              }}
            >
              <span className="order-2 sm:order-1">
                Page{" "}
                <span
                  className="font-mono"
                  style={{ color: "var(--cl-text-2)" }}
                >
                  {currentPage}
                </span>{" "}
                / {totalPages} · {filteredRecords.length} total entries
              </span>
              <div className="flex items-center gap-2 order-1 sm:order-2">
                {[
                  { Icon: ChevronsLeft,  fn: () => setCurrentPage(1),            dis: currentPage === 1 },
                  { Icon: ChevronLeft,   fn: () => setCurrentPage((p) => p - 1), dis: currentPage === 1 },
                  { Icon: ChevronRight,  fn: () => setCurrentPage((p) => p + 1), dis: currentPage === totalPages },
                  { Icon: ChevronsRight, fn: () => setCurrentPage(totalPages),   dis: currentPage === totalPages },
                ].map(({ Icon, fn, dis }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    disabled={dis}
                    className="p-2 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: "var(--cl-surface)",
                      border: "1px solid var(--cl-border)",
                      color: "var(--cl-text-2)",
                    }}
                    onMouseEnter={(e) => {
                      if (!dis)
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--cl-red)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "var(--cl-border)";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
