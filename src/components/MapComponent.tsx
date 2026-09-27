"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { NeighborhoodScore } from "../utils/safetyScore";

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  date: string;
  crimeType: string;
  neighborhood: string;
  state: string;
  count: number;
}

interface MapComponentProps {
  points: MapPoint[];
  viewMode: "points" | "heatmap" | "safety";
  center: [number, number];
  zoom: number;
  tileStyle: "osm" | "dark";
  neighborhoodScores?: Record<string, NeighborhoodScore>;
  cityCoordinates?: Record<string, [number, number]>;
}

// Red marker icon — matches the editorial red theme
const customMarkerIcon = L.divIcon({
  className: "custom-leaflet-marker",
  html: `<div style="
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #d62828 30%, #991b1b 100%);
    border: 2px solid rgba(255,255,255,0.85);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(214, 40, 40, 0.7), 0 2px 6px rgba(0, 0, 0, 0.5);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -12],
});

export default function MapComponent({
  points,
  viewMode,
  center,
  zoom,
  tileStyle,
  neighborhoodScores = {},
  cityCoordinates = {},
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const heatLayerRef = useRef<any>(null);

  // Initialize Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
      });

      // Always default to CartoDB Dark Matter for the editorial theme
      const tileUrl =
        tileStyle === "osm"
          ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

      const attribution =
        tileStyle === "osm"
          ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

      L.tileLayer(tileUrl, {
        attribution: attribution,
        maxZoom: 19,
      }).addTo(map);

      // Zoom control at bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Map Center / Zoom
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  }, [center, zoom]);

  // Render Markers or Heatmap Layer based on viewMode & points
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (layerGroupRef.current) {
      layerGroupRef.current.clearLayers();
    }

    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }

    if (viewMode === "points") {
      // INDIVIDUAL POINTS VIEW
      points.forEach((pt) => {
        const popupContent = `
          <div style="font-family: Inter, system-ui, sans-serif; padding: 6px; min-width: 190px; background: #111; color: #e8e8e8; border-radius: 6px;">
            <div style="font-size: 10px; font-weight: 700; color: #d62828; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid #1f1f1f;">
              Incident Report
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #e8e8e8; margin-bottom: 8px; line-height: 1.3;">
              ${pt.crimeType}
            </div>
            <div style="font-size: 11px; color: #a0a0a0; margin-bottom: 3px;">
              <strong style="color:#c9c9c9;">Date:</strong> ${pt.date}
            </div>
            <div style="font-size: 11px; color: #a0a0a0; margin-bottom: 3px;">
              <strong style="color:#c9c9c9;">District:</strong> ${pt.neighborhood}
            </div>
            <div style="font-size: 10px; color: #5c5c5c; border-top: 1px solid #1f1f1f; padding-top: 5px; margin-top: 5px;">
              ${pt.state} · ${pt.lat.toFixed(4)}°, ${pt.lng.toFixed(4)}°
            </div>
          </div>
        `;

        const marker = L.marker([pt.lat, pt.lng], { icon: customMarkerIcon }).bindPopup(
          popupContent,
          { className: "cl-popup" }
        );

        if (layerGroupRef.current) {
          layerGroupRef.current.addLayer(marker);
        }
      });
    } else if (viewMode === "heatmap") {
      // HEATMAP VIEW — keep green→yellow→red gradient (standard heatmap convention)
      const heatPoints: Array<[number, number, number]> = points.map((pt) => [
        pt.lat,
        pt.lng,
        Math.min(Math.max(pt.count / 10, 0.4), 1.0),
      ]);

      if ((L as any).heatLayer) {
        heatLayerRef.current = (L as any).heatLayer(heatPoints, {
          radius: 35,
          blur: 25,
          maxZoom: 15,
          max: 1.0,
          gradient: {
            0.2: "#22c55e",
            0.4: "#84cc16",
            0.6: "#eab308",
            0.8: "#f97316",
            1.0: "#d62828",
          },
        }).addTo(map);
      }
    } else if (viewMode === "safety") {
      // SAFETY SCORE VIEW (Neighborhood Circles)
      Object.values(neighborhoodScores).forEach((scoreData) => {
        const { neighborhood, score, incidentCount } = scoreData;
        const coords = cityCoordinates[neighborhood];
        if (!coords) return;

        let color = "#d62828"; // Red for dangerous (score < 4)
        if (score >= 8) color = "#10b981";    // Green for safe
        else if (score >= 4) color = "#f59e0b"; // Amber for moderate

        const circle = L.circle(coords, {
          color: color,
          fillColor: color,
          fillOpacity: 0.35,
          radius: 12000,
          weight: 2,
        });

        const tooltipContent = `
          <div style="font-family: Inter, system-ui, sans-serif; padding: 6px; min-width: 160px; text-align: center; background: #111; color: #e8e8e8; border-radius: 6px;">
            <div style="font-size: 12px; font-weight: 800; color: #e8e8e8; margin-bottom: 4px;">
              ${neighborhood}
            </div>
            <div style="font-size: 28px; font-weight: 900; color: ${color}; margin-bottom: 2px; line-height: 1;">
              ${score.toFixed(1)} <span style="font-size: 11px; color: #5c5c5c;">/ 10</span>
            </div>
            <div style="font-size: 10px; color: #a0a0a0; font-weight: 500; margin-bottom: 5px;">
              Safety Score
            </div>
            <div style="font-size: 10px; color: #5c5c5c; border-top: 1px solid #1f1f1f; padding-top: 4px;">
              ${incidentCount} Incidents Recorded
            </div>
          </div>
        `;

        circle.bindTooltip(tooltipContent, {
          direction: "top",
          className: "custom-leaflet-tooltip",
          opacity: 1,
        });

        if (layerGroupRef.current) {
          layerGroupRef.current.addLayer(circle);
        }
      });
    }
  }, [points, viewMode, neighborhoodScores, cityCoordinates]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full min-h-[500px] z-0 rounded overflow-hidden"
      style={{
        boxShadow: "inset 0 0 0 1px var(--cl-border)",
      }}
    />
  );
}
