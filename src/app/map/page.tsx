"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useFilter } from "@/context/FilterContext";
import FilterPanel from "@/components/FilterPanel";
import { MapSkeleton } from "@/components/Skeletons";
import {
  Map as MapIcon,
  Flame,
  MapPin,
  Compass,
  Layers,
  ShieldCheck,
} from "lucide-react";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

const CITY_COORDINATES: Record<string, [number, number]> = {
  HYDERABAD:  [17.385,  78.4867],
  MUMBAI:     [18.922,  72.8347],
  "DELHI UT": [28.6139, 77.209],
  BENGALURU:  [12.9716, 77.5946],
  CHENNAI:    [13.0827, 80.2707],
  KOLKATA:    [22.5726, 88.3639],
  PUNE:       [18.5204, 73.8567],
};

const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629];

export default function MapPage() {
  const { filteredRecords, loading, neighborhoodScores, cityCoordinates } =
    useFilter();
  const [viewMode, setViewMode] = useState<"points" | "heatmap" | "safety">(
    "points"
  );
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [tileStyle, setTileStyle] = useState<"dark" | "osm">("dark");

  const handleCityFocus = (key: string) => {
    if (key === "ALL") {
      setMapCenter(DEFAULT_CENTER);
      setMapZoom(5);
    } else if (CITY_COORDINATES[key]) {
      setMapCenter(CITY_COORDINATES[key]);
      setMapZoom(11);
    }
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6">

      {/* Page header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 animate-on-scroll"
        style={{ borderBottom: "1px solid var(--cl-border)" }}
      >
        <div>
          <p
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ color: "var(--cl-red)", letterSpacing: "0.12em" }}
          >
            <MapIcon className="w-4 h-4" /> Leaflet.js + OpenStreetMap
          </p>
          <h1
            className="text-2xl sm:text-3xl font-extrabold"
            style={{ color: "var(--cl-text)", fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Interactive Safety Map
          </h1>
        </div>

        {/* View toggle */}
        <div
          className="flex items-center gap-1.5 p-1.5 rounded self-start sm:self-auto"
          style={{
            background: "var(--cl-bg)",
            border: "1px solid var(--cl-border)",
          }}
        >
          {[
            { id: "points",  label: "Points",  Icon: MapPin },
            { id: "heatmap", label: "Heatmap", Icon: Flame },
            { id: "safety",  label: "Safety",  Icon: ShieldCheck },
          ].map(({ id, label, Icon }) => {
            const isActive = viewMode === id;
            return (
              <button
                key={id}
                onClick={() => setViewMode(id as "points" | "heatmap" | "safety")}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded text-xs font-bold transition-all"
                style={{
                  background: isActive ? "var(--cl-red)" : "transparent",
                  color: isActive ? "#fff" : "var(--cl-text-3)",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--cl-text)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--cl-text-3)";
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel />

      {/* Main content: sidebar + map */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6">

        {/* Sidebar */}
        <aside
          className="lg:col-span-1 rounded p-4 space-y-5 animate-on-scroll"
          style={{
            background: "var(--cl-surface)",
            border: "1px solid var(--cl-border)",
          }}
        >
          {/* City shortcuts */}
          <div>
            <h2
              className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: "var(--cl-text-3)", letterSpacing: "0.12em" }}
            >
              <Compass className="w-4 h-4" style={{ color: "var(--cl-red)" }} />
              Focus Region
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
              {[
                { label: "Whole Country", key: "ALL" },
                { label: "Hyderabad",    key: "HYDERABAD" },
                { label: "Mumbai",       key: "MUMBAI" },
                { label: "Delhi UT",     key: "DELHI UT" },
                { label: "Bengaluru",    key: "BENGALURU" },
                { label: "Chennai",      key: "CHENNAI" },
                { label: "Kolkata",      key: "KOLKATA" },
                { label: "Pune",         key: "PUNE" },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => handleCityFocus(c.key)}
                  className="px-3 py-2 rounded text-xs font-medium transition-all text-left truncate"
                  style={{
                    background: "var(--cl-bg)",
                    border: "1px solid var(--cl-border)",
                    color: "var(--cl-text-2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--cl-red)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--cl-red)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--cl-border)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--cl-text-2)";
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tile style */}
          <div>
            <h2
              className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: "var(--cl-text-3)", letterSpacing: "0.12em" }}
            >
              <Layers className="w-4 h-4" style={{ color: "var(--cl-red)" }} />
              Tiles Theme
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "dark", label: "Dark Canvas" },
                { id: "osm",  label: "Standard OSM" },
              ].map(({ id, label }) => {
                const isActive = tileStyle === id;
                return (
                  <button
                    key={id}
                    onClick={() => setTileStyle(id as "dark" | "osm")}
                    className="py-2 px-2.5 rounded border text-xs font-medium transition-all"
                    style={{
                      background: isActive ? "var(--cl-red-dim)" : "var(--cl-bg)",
                      border: `1px solid ${isActive ? "var(--cl-red)" : "var(--cl-border)"}`,
                      color: isActive ? "var(--cl-red)" : "var(--cl-text-3)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active map points stat */}
          <div
            className="p-3 rounded text-xs space-y-1"
            style={{
              background: "var(--cl-bg)",
              border: "1px solid var(--cl-border)",
            }}
          >
            <p style={{ color: "var(--cl-text-3)" }}>Active map points</p>
            <p
              className="text-2xl font-bold font-mono"
              style={{ color: "var(--cl-red)" }}
            >
              {loading ? "—" : filteredRecords.length}
            </p>
          </div>
        </aside>

        {/* Map Viewport */}
        <div className="lg:col-span-3 min-h-[440px] sm:min-h-[520px] animate-on-scroll anim-delay-1">
          {loading ? (
            <MapSkeleton />
          ) : (
            <MapComponent
              points={filteredRecords}
              viewMode={viewMode}
              center={mapCenter}
              zoom={mapZoom}
              tileStyle={tileStyle}
              neighborhoodScores={neighborhoodScores}
              cityCoordinates={cityCoordinates}
            />
          )}
        </div>
      </div>
    </div>
  );
}
