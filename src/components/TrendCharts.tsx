"use client";

import { useMemo } from "react";
import { IncidentRecord } from "@/context/FilterContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";

interface TrendChartsProps {
  records: IncidentRecord[];
}

export default function TrendCharts({ records }: TrendChartsProps) {
  // 1. Prepare Bar Chart Data: Crime Type Counts
  const barChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    records.forEach((r) => {
      counts[r.crimeType] = (counts[r.crimeType] || 0) + r.count;
    });

    return Object.entries(counts)
      .map(([crimeType, count]) => ({
        crimeType,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [records]);

  // 2. Prepare Line Chart Data: Incidents Timeline Over Time
  const lineChartData = useMemo(() => {
    const timeline: Record<string, number> = {};

    records.forEach((r) => {
      const dateKey = r.date.length >= 7 ? r.date.substring(0, 7) : r.date;
      timeline[dateKey] = (timeline[dateKey] || 0) + r.count;
    });

    return Object.entries(timeline)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [records]);

  const tooltipStyle = {
    backgroundColor: "#111",
    borderColor: "#2a2a2a",
    borderRadius: "6px",
    color: "#e8e8e8",
    fontSize: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. BAR CHART: Crime Type Counts */}
      <div
        className="animate-on-scroll p-6 rounded space-y-4 shadow-xl"
        style={{
          background: "var(--cl-surface)",
          border: "1px solid var(--cl-border)",
        }}
      >
        <div
          className="flex items-center justify-between pb-3"
          style={{ borderBottom: "1px solid var(--cl-border)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded"
              style={{
                background: "var(--cl-red-dim)",
                border: "1px solid rgba(214,40,40,0.2)",
              }}
            >
              <BarChart3 className="w-5 h-5" style={{ color: "var(--cl-red)" }} />
            </div>
            <div>
              <h3
                className="text-base font-bold"
                style={{ color: "var(--cl-text)" }}
              >
                Crime Type Counts
              </h3>
              <p className="text-xs" style={{ color: "var(--cl-text-3)" }}>
                Total cases grouped by offence head.
              </p>
            </div>
          </div>
          <span
            className="text-xs font-mono font-semibold px-2.5 py-1 rounded"
            style={{
              background: "var(--cl-bg)",
              border: "1px solid var(--cl-border)",
              color: "var(--cl-text-2)",
            }}
          >
            {barChartData.length} Categories
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          {barChartData.length === 0 ? (
            <div
              className="h-full flex items-center justify-center text-xs"
              style={{ color: "var(--cl-text-3)" }}
            >
              No crime category records match current filter
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis
                  dataKey="crimeType"
                  stroke="#5c5c5c"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis stroke="#5c5c5c" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#d62828", fontWeight: "bold" }}
                  formatter={(value: any) => [`${value} Cases`, "Incident Count"]}
                />
                <Bar dataKey="count" fill="#d62828" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 2. AREA CHART: Incidents Timeline */}
      <div
        className="animate-on-scroll anim-delay-1 p-6 rounded space-y-4 shadow-xl"
        style={{
          background: "var(--cl-surface)",
          border: "1px solid var(--cl-border)",
        }}
      >
        <div
          className="flex items-center justify-between pb-3"
          style={{ borderBottom: "1px solid var(--cl-border)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded"
              style={{
                background: "var(--cl-red-dim)",
                border: "1px solid rgba(214,40,40,0.2)",
              }}
            >
              <TrendingUp className="w-5 h-5" style={{ color: "var(--cl-red)" }} />
            </div>
            <div>
              <h3
                className="text-base font-bold"
                style={{ color: "var(--cl-text)" }}
              >
                Incidents Over Time
              </h3>
              <p className="text-xs" style={{ color: "var(--cl-text-3)" }}>
                Chronological trend & timeline volume.
              </p>
            </div>
          </div>
          <span
            className="text-xs font-mono font-semibold px-2.5 py-1 rounded"
            style={{
              background: "var(--cl-bg)",
              border: "1px solid var(--cl-border)",
              color: "var(--cl-text-2)",
            }}
          >
            Timeline Curve
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          {lineChartData.length === 0 ? (
            <div
              className="h-full flex items-center justify-center text-xs"
              style={{ color: "var(--cl-text-3)" }}
            >
              No date records match current filter
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={lineChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorRedCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#d62828" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#d62828" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis
                  dataKey="date"
                  stroke="#5c5c5c"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis stroke="#5c5c5c" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#d62828", fontWeight: "bold" }}
                  formatter={(value: any) => [`${value} Incidents`, "Volume"]}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#d62828"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRedCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
