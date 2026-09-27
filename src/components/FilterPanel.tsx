"use client";

import { useState, useRef, useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import {
  Filter,
  Calendar,
  MapPin,
  ShieldAlert,
  ChevronDown,
  Check,
  RotateCcw,
  X,
  Search,
} from "lucide-react";

export default function FilterPanel() {
  const {
    allRecords,
    filteredRecords,
    selectedCrimeTypes,
    setSelectedCrimeTypes,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedNeighborhood,
    setSelectedNeighborhood,
    uniqueCrimeTypes,
    uniqueNeighborhoods,
    resetFilters,
  } = useFilter();

  const [isCrimeDropdownOpen, setIsCrimeDropdownOpen] = useState(false);
  const [crimeSearchText, setCrimeSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCrimeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCrimeTypesList = uniqueCrimeTypes.filter((type) =>
    type.toLowerCase().includes(crimeSearchText.toLowerCase())
  );

  const toggleCrimeType = (type: string) => {
    if (selectedCrimeTypes.includes(type)) {
      setSelectedCrimeTypes(selectedCrimeTypes.filter((t) => t !== type));
    } else {
      setSelectedCrimeTypes([...selectedCrimeTypes, type]);
    }
  };

  const handleSelectAllCrimeTypes = () =>
    setSelectedCrimeTypes([...uniqueCrimeTypes]);
  const handleClearCrimeTypes = () => setSelectedCrimeTypes([]);

  const activeFiltersCount =
    (selectedCrimeTypes.length > 0 ? 1 : 0) +
    (startDate !== "2013-01-01" || endDate !== "2013-12-31" ? 1 : 0) +
    (selectedNeighborhood !== "All" ? 1 : 0);

  return (
    <div
      className="w-full rounded p-5 shadow-2xl space-y-4"
      style={{
        background: "var(--cl-surface)",
        border: "1px solid var(--cl-border)",
      }}
    >
      {/* Panel Top Title Bar */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3"
        style={{ borderBottom: "1px solid var(--cl-border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="p-2 rounded"
            style={{ background: "var(--cl-red)", color: "#fff" }}
          >
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2
              className="text-sm font-bold flex items-center gap-2"
              style={{ color: "var(--cl-text)" }}
            >
              Live Dataset Filter Controls
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                style={{
                  background: "var(--cl-red-dim)",
                  border: "1px solid rgba(214,40,40,0.3)",
                  color: "var(--cl-red)",
                }}
              >
                Real-Time Synchronized
              </span>
            </h2>
            <p className="text-xs" style={{ color: "var(--cl-text-3)" }}>
              Filters update both Map markers/heatmap & Data Table live simultaneously.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="text-xs font-mono px-3 py-1.5 rounded"
            style={{
              background: "var(--cl-bg)",
              border: "1px solid var(--cl-border)",
              color: "var(--cl-text-2)",
            }}
          >
            Showing{" "}
            <span
              className="font-bold"
              style={{ color: "var(--cl-red)" }}
            >
              {filteredRecords.length}
            </span>{" "}
            of{" "}
            <span style={{ color: "var(--cl-text-3)" }}>
              {allRecords.length}
            </span>{" "}
            incidents
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all"
              style={{
                background: "var(--cl-bg)",
                border: "1px solid var(--cl-border-2)",
                color: "var(--cl-text-2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--cl-red)";
                (e.currentTarget as HTMLElement).style.color = "var(--cl-red)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--cl-border-2)";
                (e.currentTarget as HTMLElement).style.color = "var(--cl-text-2)";
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. CRIME TYPE MULTI-SELECT DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <label
            className="text-xs font-semibold mb-1.5 flex items-center gap-1.5"
            style={{ color: "var(--cl-text-2)" }}
          >
            <ShieldAlert className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
            Crime Type (Multi-Select)
          </label>

          <button
            type="button"
            onClick={() => setIsCrimeDropdownOpen(!isCrimeDropdownOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-medium transition-all"
            style={{
              background: "var(--cl-bg)",
              border: `1px solid ${selectedCrimeTypes.length > 0 ? "var(--cl-red)" : "var(--cl-border)"}`,
              color: selectedCrimeTypes.length > 0 ? "var(--cl-red)" : "var(--cl-text-2)",
            }}
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="truncate">
                {selectedCrimeTypes.length === 0
                  ? "All Crime Types"
                  : selectedCrimeTypes.length === 1
                  ? selectedCrimeTypes[0]
                  : `${selectedCrimeTypes.length} Types Selected`}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {selectedCrimeTypes.length > 0 && (
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                  style={{ background: "var(--cl-red)", color: "#fff" }}
                >
                  {selectedCrimeTypes.length}
                </span>
              )}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isCrimeDropdownOpen ? "rotate-180" : ""
                }`}
                style={{ color: "var(--cl-text-3)" }}
              />
            </div>
          </button>

          {/* Multi-Select Dropdown Popover */}
          {isCrimeDropdownOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-2 z-50 rounded p-3 space-y-2.5 max-h-72 flex flex-col backdrop-blur-xl"
              style={{
                background: "var(--cl-surface)",
                border: "1px solid var(--cl-border-2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              <div className="relative">
                <Search
                  className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--cl-text-3)" }}
                />
                <input
                  type="text"
                  placeholder="Filter crime categories..."
                  value={crimeSearchText}
                  onChange={(e) => setCrimeSearchText(e.target.value)}
                  className="w-full rounded pl-8 pr-3 py-1.5 text-xs placeholder-zinc-600 focus:outline-none"
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
                className="flex items-center justify-between text-[11px] px-1 pb-2"
                style={{ borderBottom: "1px solid var(--cl-border)" }}
              >
                <button
                  onClick={handleSelectAllCrimeTypes}
                  className="font-medium transition-colors"
                  style={{ color: "var(--cl-red)" }}
                >
                  Select All
                </button>
                <button
                  onClick={handleClearCrimeTypes}
                  className="transition-colors"
                  style={{ color: "var(--cl-text-3)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--cl-text-2)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--cl-text-3)")
                  }
                >
                  Clear Selection
                </button>
              </div>

              <div className="overflow-y-auto flex-1 space-y-1 pr-1">
                {filteredCrimeTypesList.map((type) => {
                  const isChecked = selectedCrimeTypes.includes(type);
                  return (
                    <label
                      key={type}
                      onClick={() => toggleCrimeType(type)}
                      className="flex items-center justify-between p-2 rounded text-xs cursor-pointer transition-all"
                      style={{
                        background: isChecked ? "var(--cl-red-dim)" : "transparent",
                        color: isChecked ? "var(--cl-red)" : "var(--cl-text-2)",
                        fontWeight: isChecked ? 600 : 400,
                      }}
                    >
                      <span className="truncate">{type}</span>
                      <div
                        className="w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0"
                        style={{
                          background: isChecked ? "var(--cl-red)" : "var(--cl-bg)",
                          borderColor: isChecked ? "var(--cl-red)" : "var(--cl-border-2)",
                          color: "#fff",
                        }}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 2. DATE RANGE PICKER */}
        <div>
          <label
            className="text-xs font-semibold mb-1.5 flex items-center gap-1.5"
            style={{ color: "var(--cl-text-2)" }}
          >
            <Calendar className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
            Date Range Picker
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: startDate, onChange: setStartDate },
              { value: endDate, onChange: setEndDate },
            ].map(({ value, onChange }, i) => (
              <input
                key={i}
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded px-3 py-2 text-xs font-mono focus:outline-none transition-colors"
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
            ))}
          </div>
        </div>

        {/* 3. NEIGHBORHOOD DROPDOWN */}
        <div>
          <label
            className="text-xs font-semibold mb-1.5 flex items-center gap-1.5"
            style={{ color: "var(--cl-text-2)" }}
          >
            <MapPin className="w-3.5 h-3.5" style={{ color: "var(--cl-red)" }} />
            Neighborhood / District
          </label>
          <select
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            className="w-full rounded px-3.5 py-2.5 text-xs focus:outline-none"
            style={{
              background: "var(--cl-bg)",
              border: "1px solid var(--cl-border)",
              color: "var(--cl-text-2)",
            }}
            onFocus={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--cl-red)")
            }
            onBlur={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--cl-border)")
            }
          >
            <option value="All">All Neighborhoods & Districts</option>
            {uniqueNeighborhoods.map((nh) => (
              <option key={nh} value={nh}>
                {nh}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {selectedCrimeTypes.length > 0 && (
        <div
          className="flex items-center gap-2 pt-2 overflow-x-auto"
          style={{ borderTop: "1px solid var(--cl-border)" }}
        >
          <span
            className="text-[11px] font-medium shrink-0"
            style={{ color: "var(--cl-text-3)" }}
          >
            Selected:
          </span>
          {selectedCrimeTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] shrink-0"
              style={{
                background: "var(--cl-red-dim)",
                border: "1px solid rgba(214,40,40,0.3)",
                color: "var(--cl-red)",
              }}
            >
              {type}
              <X
                className="w-3 h-3 cursor-pointer transition-opacity hover:opacity-70"
                onClick={() => toggleCrimeType(type)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
