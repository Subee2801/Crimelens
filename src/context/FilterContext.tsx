"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { calculateNeighborhoodScores, NeighborhoodScore } from "../utils/safetyScore";

export interface IncidentRecord {
  id: string;
  date: string;
  crimeType: string;
  neighborhood: string;
  state: string;
  count: number;
  lat: number;
  lng: number;
  isRepaired?: boolean;
}

const CITY_COORDINATES: Record<string, [number, number]> = {
  HYDERABAD: [17.385, 78.4867],
  MUMBAI: [18.922, 72.8347],
  "DELHI UT": [28.6139, 77.209],
  CENTRAL: [28.6448, 77.2167],
  EAST: [28.628, 77.295],
  "NEW DELHI": [28.6143, 77.2001],
  NORTH: [28.66, 77.23],
  SOUTH: [28.54, 77.2],
  WEST: [28.65, 77.12],
  BENGALURU: [12.9716, 77.5946],
  CHENNAI: [13.0827, 80.2707],
  KOLKATA: [22.5726, 88.3639],
  PUNE: [18.5204, 73.8567],
  PATNA: [25.5941, 85.1376],
  AHMEDABAD: [23.0225, 72.5714],
  SURAT: [21.1702, 72.8311],
  VADODARA: [22.3072, 73.1812],
  GUWAHATI: [26.1445, 91.7362],
  RAIPUR: [21.2514, 81.6296],
  BILASPUR: [22.0797, 82.1409],
  THANE: [19.2183, 72.9781],
  BEGUSARAI: [25.4182, 86.1272],
  BHAGALPUR: [25.2425, 87.0118],
  ADILABAD: [19.6641, 78.532],
  ANANTAPUR: [14.6819, 77.6006],
  CHITTOOR: [13.2172, 79.1003],
  CUDDAPAH: [14.4673, 78.8242],
  "EAST GODAVARI": [16.9891, 82.2475],
  GUNTUR: [16.3067, 80.4365],
  KARIMNAGAR: [18.4386, 79.1288],
  KHAMMAM: [17.2473, 80.1514],
  KURNOOL: [15.8281, 78.0373],
  NALGONDA: [17.0577, 79.2684],
  NIZAMABAD: [18.6725, 78.0941],
  PRAKASAM: [15.5057, 80.0499],
  "RANGA REDDY": [17.3, 78.5],
};

interface FilterContextType {
  allRecords: IncidentRecord[];
  filteredRecords: IncidentRecord[];
  loading: boolean;
  selectedCrimeTypes: string[];
  setSelectedCrimeTypes: React.Dispatch<React.SetStateAction<string[]>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  selectedNeighborhood: string;
  setSelectedNeighborhood: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  uniqueCrimeTypes: string[];
  uniqueNeighborhoods: string[];
  resetFilters: () => void;
  neighborhoodScores: Record<string, NeighborhoodScore>;
  cityCoordinates: Record<string, [number, number]>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [allRecords, setAllRecords] = useState<IncidentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCrimeTypes, setSelectedCrimeTypes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("2013-01-01");
  const [endDate, setEndDate] = useState<string>("2013-12-31");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Load CSV dataset once on mount
  useEffect(() => {
    const loadDataset = async () => {
      try {
        const resp = await fetch("/dstrIPC_2013.csv");
        const text = await resp.text();

        Papa.parse<Record<string, any>>(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            const list: IncidentRecord[] = [];

            results.data.forEach((row, idx) => {
              if (!row || typeof row !== "object") return;

              let isRepaired = false;
              const districtName = String(
                row["DISTRICT"] || row["District"] || row["NEIGHBORHOOD"] || ""
              )
                .trim()
                .toUpperCase();

              const stateName = String(row["STATE/UT"] || row["State"] || "India").trim();

              // Coordinates lookup
              let coords = CITY_COORDINATES[districtName];
              if (!coords) {
                if (stateName.includes("DELHI")) coords = [28.6139, 77.209];
                else if (stateName.includes("MAHARASHTRA")) coords = [19.076, 72.8777];
                else if (stateName.includes("KARNATAKA")) coords = [12.9716, 77.5946];
                else if (stateName.includes("TAMIL NADU")) coords = [13.0827, 80.2707];
                else if (stateName.includes("WEST BENGAL")) coords = [22.5726, 88.3639];
                else if (stateName.includes("BIHAR")) coords = [25.5941, 85.1376];
                else coords = [20.5937 + ((idx % 10) - 5) * 0.7, 78.9629 + ((idx % 8) - 4) * 0.7];
              }

              const jitterLat = Math.sin(idx * 1.5) * 0.05;
              const jitterLng = Math.cos(idx * 1.5) * 0.05;

              let rawDate = String(
                row["DATE"] || row["Date"] || row["YEAR"] || "2013-01-01"
              ).trim();

              if (rawDate.length === 4 && !isNaN(Number(rawDate))) {
                // Spread dates throughout 2013 for dates demo
                const month = String((idx % 12) + 1).padStart(2, "0");
                const day = String((idx % 28) + 1).padStart(2, "0");
                rawDate = `2013-${month}-${day}`;
              }

              let crimeType = String(
                row["CRIME TYPE"] || row["Crime Type"] || row["Category"] || ""
              ).trim();

              let countVal = 1;

              if (!crimeType) {
                const categories = [
                  "THEFT",
                  "BURGLARY",
                  "AUTO THEFT",
                  "ROBBERY",
                  "MURDER",
                  "ATTEMPT TO MURDER",
                  "RAPE",
                  "KIDNAPPING & ABDUCTION",
                  "CHEATING",
                  "RIOTS",
                ];
                let maxCat = "Burglary";
                let maxCnt = 0;
                categories.forEach((cat) => {
                  if (row[cat] && Number(row[cat]) > maxCnt) {
                    maxCnt = Number(row[cat]);
                    maxCat = cat.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
                  }
                });
                crimeType = maxCat;
                countVal = maxCnt || 1;
              }

              const neighborhood = String(
                row["NEIGHBORHOOD"] || row["Neighborhood"] || districtName || "District Area"
              ).trim();

              list.push({
                id: `REC-${idx + 1}`,
                date: rawDate,
                crimeType: crimeType || "IPC Offense",
                neighborhood: neighborhood || "District Center",
                state: stateName,
                count: countVal,
                lat: coords[0] + jitterLat,
                lng: coords[1] + jitterLng,
                isRepaired,
              });
            });

            setAllRecords(list);
            setLoading(false);
          },
        });
      } catch (err) {
        console.error("FilterContext data load error:", err);
        setLoading(false);
      }
    };

    loadDataset();
  }, []);

  // Unique list of crime types
  const uniqueCrimeTypes = useMemo(() => {
    const set = new Set(allRecords.map((r) => r.crimeType));
    return Array.from(set).sort();
  }, [allRecords]);

  // Unique list of neighborhoods
  const uniqueNeighborhoods = useMemo(() => {
    const set = new Set(allRecords.map((r) => r.neighborhood));
    return Array.from(set).sort();
  }, [allRecords]);

  // Filtered dataset updated live whenever any filter changes
  const filteredRecords = useMemo(() => {
    return allRecords.filter((rec) => {
      // 1. Crime Type Multi-Select Filter
      if (selectedCrimeTypes.length > 0 && !selectedCrimeTypes.includes(rec.crimeType)) {
        return false;
      }

      // 2. Date Range Picker Filter
      if (startDate && rec.date < startDate) return false;
      if (endDate && rec.date > endDate) return false;

      // 3. Neighborhood Dropdown Filter
      if (selectedNeighborhood !== "All" && rec.neighborhood !== selectedNeighborhood) {
        return false;
      }

      // 4. Search term filter
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        return (
          rec.crimeType.toLowerCase().includes(query) ||
          rec.neighborhood.toLowerCase().includes(query) ||
          rec.state.toLowerCase().includes(query) ||
          rec.date.toLowerCase().includes(query) ||
          rec.id.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [allRecords, selectedCrimeTypes, startDate, endDate, selectedNeighborhood, searchTerm]);

  // Neighborhood Safety Scores
  const neighborhoodScores = useMemo(() => {
    return calculateNeighborhoodScores(filteredRecords);
  }, [filteredRecords]);

  // Reset Filters Callback
  const resetFilters = () => {
    setSelectedCrimeTypes([]);
    setStartDate("2013-01-01");
    setEndDate("2013-12-31");
    setSelectedNeighborhood("All");
    setSearchTerm("");
  };

  return (
    <FilterContext.Provider
      value={{
        allRecords,
        filteredRecords,
        loading,
        selectedCrimeTypes,
        setSelectedCrimeTypes,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedNeighborhood,
        setSelectedNeighborhood,
        searchTerm,
        setSearchTerm,
        uniqueCrimeTypes,
        uniqueNeighborhoods,
        resetFilters,
        neighborhoodScores,
        cityCoordinates: CITY_COORDINATES,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
