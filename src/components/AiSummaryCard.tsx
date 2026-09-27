"use client";

import { useMemo, useState } from "react";
import { IncidentRecord } from "@/context/FilterContext";
import {
  Sparkles,
  Bot,
  RefreshCw,
} from "lucide-react";

interface AiSummaryCardProps {
  records: IncidentRecord[];
}

export function generateDataSummary(records: IncidentRecord[]): string {
  if (records.length === 0) {
    return "No incident data is available for the currently selected filter parameters. Please widen your date range or select additional crime categories to generate analytical insights.";
  }

  const typeCounts: Record<string, number> = {};
  records.forEach((r) => {
    typeCounts[r.crimeType] = (typeCounts[r.crimeType] || 0) + r.count;
  });

  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const topCrime = sortedTypes[0]
    ? `${sortedTypes[0][0]} (${sortedTypes[0][1]} total cases)`
    : "general offences";
  const secondCrime = sortedTypes[1]
    ? `, followed by ${sortedTypes[1][0]} (${sortedTypes[1][1]} cases)`
    : "";

  const nhCounts: Record<string, number> = {};
  records.forEach((r) => {
    nhCounts[r.neighborhood] = (nhCounts[r.neighborhood] || 0) + r.count;
  });
  const sortedNh = Object.entries(nhCounts).sort((a, b) => b[1] - a[1]);
  const topNeighborhood = sortedNh[0] ? sortedNh[0][0] : "urban centers";
  const secondNeighborhood = sortedNh[1] ? ` and ${sortedNh[1][0]}` : "";

  const sortedByDate = [...records].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const midIndex = Math.floor(sortedByDate.length / 2);
  const firstHalfSum = sortedByDate
    .slice(0, midIndex)
    .reduce((acc, curr) => acc + curr.count, 0);
  const secondHalfSum = sortedByDate
    .slice(midIndex)
    .reduce((acc, curr) => acc + curr.count, 0);

  let trendDirection = "remained relatively steady";
  if (firstHalfSum > 0) {
    const percentChange = Math.round(
      ((secondHalfSum - firstHalfSum) / firstHalfSum) * 100
    );
    if (percentChange > 5) {
      trendDirection = `shown an upward trajectory (+${percentChange}%)`;
    } else if (percentChange < -5) {
      trendDirection = `decreased by ${Math.abs(percentChange)}% overall`;
    }
  }

  const startDate = sortedByDate[0]?.date || "2013-01-01";
  const endDate =
    sortedByDate[sortedByDate.length - 1]?.date || "2013-12-31";

  return (
    `Across the active period from ${startDate} to ${endDate}, ${records.length} filtered incident logs were analyzed. ` +
    `The most prevalent crime head is ${topCrime}${secondCrime}, representing the primary volume of reported activity. ` +
    `Geographically, incident density is concentrated predominantly around ${topNeighborhood}${secondNeighborhood}, which registered the highest concentration of logs. ` +
    `Overall incident rates have ${trendDirection} across the evaluated timeframe, reflecting key operational focus areas for local monitoring.`
  );
}

export default function AiSummaryCard({ records }: AiSummaryCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const summaryText = useMemo(() => generateDataSummary(records), [records]);

  const handleManualRegenerate = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  return (
    <div
      className="animate-on-scroll relative overflow-hidden rounded p-6 shadow-2xl space-y-4"
      style={{
        background: "var(--cl-surface)",
        border: "1px solid var(--cl-border)",
        borderLeft: "3px solid var(--cl-red)",
      }}
    >
      {/* Red glow orb */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(214,40,40,0.04)" }}
      />

      {/* Header */}
      <div
        className="flex items-center justify-between pb-3"
        style={{ borderBottom: "1px solid var(--cl-border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="p-2 rounded shadow-md"
            style={{
              background: "var(--cl-red-dim)",
              border: "1px solid rgba(214,40,40,0.25)",
            }}
          >
            <Bot className="w-5 h-5" style={{ color: "var(--cl-red)" }} />
          </div>
          <div>
            <h3
              className="text-base font-bold flex items-center gap-2"
              style={{ color: "var(--cl-text)" }}
            >
              AI Incident Pattern Summary
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                style={{
                  background: "var(--cl-red-dim)",
                  border: "1px solid rgba(214,40,40,0.3)",
                  color: "var(--cl-red)",
                }}
              >
                <Sparkles className="w-3 h-3" />
                Live Dynamic Synthesis
              </span>
            </h3>
            <p className="text-xs" style={{ color: "var(--cl-text-3)" }}>
              Automated natural language analysis based on current filter state.
            </p>
          </div>
        </div>

        <button
          onClick={handleManualRegenerate}
          className="p-2 rounded transition-all"
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
          title="Re-analyze Data"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Summary text */}
      <div
        className="relative p-4 rounded"
        style={{
          background: "var(--cl-bg)",
          border: "1px solid var(--cl-border)",
        }}
      >
        <p
          className="text-sm leading-relaxed font-sans"
          style={{ color: "var(--cl-text-2)" }}
        >
          {summaryText}
        </p>

        <div
          className="mt-3 pt-3 text-[11px] flex items-center justify-between"
          style={{
            borderTop: "1px solid var(--cl-border)",
            color: "var(--cl-text-3)",
          }}
        >
          <span>Pattern analysis · generateDataSummary()</span>
          <span
            className="font-mono"
            style={{ color: "var(--cl-text-2)" }}
          >
            {records.length} records evaluated
          </span>
        </div>
      </div>
    </div>
  );
}
