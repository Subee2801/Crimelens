"use client";

import React, { useState, useMemo } from "react";
import { useFilter, IncidentRecord } from "@/context/FilterContext";
import FilterPanel from "@/components/FilterPanel";
import { TableSkeleton } from "@/components/Skeletons";
import {
  Database,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileSpreadsheet,
  Calendar,
  ShieldAlert,
  MapPin,
} from "lucide-react";

export default function DataPage() {
  const { filteredRecords, loading, searchTerm, setSearchTerm } = useFilter();

  const [sortColumn, setSortColumn] = useState<keyof IncidentRecord>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const aVal = a[sortColumn] ?? "";
      const bVal = b[sortColumn] ?? "";
      if (typeof aVal === "number" && typeof bVal === "number")
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      const sa = String(aVal).toLowerCase();
      const sb = String(bVal).toLowerCase();
      if (sa < sb) return sortDirection === "asc" ? -1 : 1;
      if (sa > sb) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRecords, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / pageSize));
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (col: keyof IncidentRecord) => {
    if (sortColumn === col) setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortColumn(col); setSortDirection("asc"); }
  };

  const SortIcon = ({ col }: { col: keyof IncidentRecord }) =>
    sortColumn !== col ? (
      <ArrowUpDown className="w-3 h-3" style={{ color: "var(--cl-text-3)" }} />
    ) : sortDirection === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
    ) : (
      <ArrowDown className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
    );

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6">

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
            <Database className="w-4 h-4" /> CSV Dataset Pipeline
          </p>
          <h1
            className="text-2xl sm:text-3xl font-extrabold"
            style={{
              color: "var(--cl-text)",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            Incident Data Table
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--cl-text-3)" }}>
            Sortable, paginated, and filter-synced log of all crime records.
          </p>
        </div>
        <span
          className="self-start sm:self-auto px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap"
          style={{
            background: "var(--cl-surface)",
            border: "1px solid var(--cl-border)",
            color: "var(--cl-text-2)",
          }}
        >
          {loading ? "Loading…" : `${filteredRecords.length} Records`}
        </span>
      </div>

      {/* Filter panel */}
      <FilterPanel />

      {/* Table or skeleton */}
      {loading ? (
        <TableSkeleton rows={10} />
      ) : (
        <div
          className="rounded overflow-hidden shadow-xl animate-on-scroll"
          style={{
            background: "var(--cl-surface)",
            border: "1px solid var(--cl-border)",
          }}
        >
          {/* Toolbar */}
          <div
            className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
            style={{
              borderBottom: "1px solid var(--cl-border)",
              background: "var(--cl-surface)",
            }}
          >
            <div className="relative w-full sm:w-80">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--cl-text-3)" }}
              />
              <input
                type="text"
                placeholder="Search date, crime, neighborhood…"
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
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--cl-text-3)" }}
            >
              <span>Rows:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded px-2 py-2 text-xs font-mono focus:outline-none"
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
              >
                {[10, 15, 25, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Scrollable table */}
          <div className="table-scroll-wrapper">
            {sortedRecords.length === 0 ? (
              <div className="py-20 text-center space-y-2 px-4">
                <FileSpreadsheet
                  className="w-10 h-10 mx-auto"
                  style={{ color: "var(--cl-text-3)" }}
                />
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--cl-text-2)" }}
                >
                  No matching records
                </p>
                <p className="text-xs" style={{ color: "var(--cl-text-3)" }}>
                  Adjust filters to see more results.
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[600px] text-left text-xs">
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
                      [
                        { col: "date" as const,         label: "Date",         Icon: Calendar,    right: false },
                        { col: "crimeType" as const,    label: "Crime Type",   Icon: ShieldAlert, right: false },
                        { col: "neighborhood" as const, label: "Neighborhood", Icon: MapPin,       right: false },
                        { col: "state" as const,        label: "State / UT",   Icon: null,         right: false },
                        { col: "count" as const,        label: "Cases",        Icon: null,         right: true  },
                      ] as {
                        col: keyof IncidentRecord;
                        label: string;
                        Icon: React.ElementType | null;
                        right: boolean;
                      }[]
                    ).map(({ col, label, Icon, right }) => (
                      <th
                        key={col}
                        onClick={() => handleSort(col as keyof IncidentRecord)}
                        className={`px-5 py-4 cursor-pointer transition-colors whitespace-nowrap ${
                          right ? "text-right" : ""
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
                            right ? "justify-end" : ""
                          }`}
                        >
                          {Icon && (
                            <Icon
                              className="w-3.5 h-3.5"
                              style={{ color: "var(--cl-red)" }}
                            />
                          )}
                          <span>{label}</span>
                          <SortIcon col={col as keyof IncidentRecord} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
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
            )}
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
              Showing{" "}
              <span className="font-mono" style={{ color: "var(--cl-text-2)" }}>
                {(currentPage - 1) * pageSize + 1}
              </span>
              –
              <span className="font-mono" style={{ color: "var(--cl-text-2)" }}>
                {Math.min(currentPage * pageSize, sortedRecords.length)}
              </span>{" "}
              of{" "}
              <span className="font-mono" style={{ color: "var(--cl-text-2)" }}>
                {sortedRecords.length}
              </span>
            </span>
            <div className="flex items-center gap-2 order-1 sm:order-2">
              {[
                { Icon: ChevronsLeft,  action: () => setCurrentPage(1),            disabled: currentPage === 1 },
                { Icon: ChevronLeft,   action: () => setCurrentPage((p) => p - 1), disabled: currentPage === 1 },
                { Icon: ChevronRight,  action: () => setCurrentPage((p) => p + 1), disabled: currentPage === totalPages },
                { Icon: ChevronsRight, action: () => setCurrentPage(totalPages),   disabled: currentPage === totalPages },
              ].map(({ Icon, action, disabled }, i) => (
                <button
                  key={i}
                  onClick={action}
                  disabled={disabled}
                  className="p-2 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--cl-surface)",
                    border: "1px solid var(--cl-border)",
                    color: "var(--cl-text-2)",
                  }}
                  onMouseEnter={(e) => {
                    if (!disabled)
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
              <span
                className="font-mono px-3 py-1.5 rounded"
                style={{
                  background: "var(--cl-surface)",
                  border: "1px solid var(--cl-border)",
                  color: "var(--cl-text-2)",
                }}
              >
                {currentPage} / {totalPages}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
