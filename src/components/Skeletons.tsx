"use client";

/**
 * Skeleton loading components for Map and Data Table views.
 * Uses animated pulse placeholders while FilterContext is loading CSV data.
 */

export function MapSkeleton() {
  return (
    <div
      className="w-full h-[480px] sm:h-[580px] rounded overflow-hidden relative"
      style={{
        background: "var(--cl-surface)",
        border: "1px solid var(--cl-border)",
      }}
    >
      {/* Simulated map grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(var(--cl-border-2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 skeleton-pulse"
        style={{
          background:
            "linear-gradient(135deg, var(--cl-surface) 0%, rgba(22,22,22,0.5) 50%, var(--cl-surface) 100%)",
        }}
      />

      {/* Simulated controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-9 h-9 rounded skeleton-pulse"
            style={{
              background: "var(--cl-bg)",
              border: "1px solid var(--cl-border)",
            }}
          />
        ))}
      </div>

      {/* Simulated legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
        <div
          className="w-32 h-6 rounded skeleton-pulse"
          style={{
            background: "var(--cl-bg)",
            border: "1px solid var(--cl-border)",
          }}
        />
        <div
          className="w-20 h-6 rounded skeleton-pulse"
          style={{
            background: "var(--cl-bg)",
            border: "1px solid var(--cl-border)",
          }}
        />
      </div>

      {/* Loading text centre */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: "var(--cl-border-2)" }}
          >
            <div
              className="w-10 h-10 rounded-full border-2 skeleton-pulse"
              style={{ borderColor: "var(--cl-border-2)" }}
            />
          </div>
          {/* Red spinning arc */}
          <div
            className="absolute inset-0 rounded-full border-t-2 animate-spin"
            style={{ borderColor: "var(--cl-red)" }}
          />
        </div>
        <div className="text-center space-y-1.5">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--cl-text-2)" }}
          >
            Loading Map Data…
          </p>
          <p className="text-xs" style={{ color: "var(--cl-text-3)" }}>
            Parsing CSV & resolving coordinates
          </p>
        </div>
        {/* Fake pin pulses */}
        {[
          { top: "35%", left: "45%" },
          { top: "55%", left: "62%" },
          { top: "28%", left: "70%" },
          { top: "68%", left: "35%" },
        ].map((pos, i) => (
          <span
            key={i}
            style={{
              top: pos.top,
              left: pos.left,
              position: "absolute",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "rgba(214,40,40,0.35)",
              animation: "skeleton-pulse 1.6s ease-in-out infinite",
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div
      className="rounded overflow-hidden"
      style={{
        background: "var(--cl-surface)",
        border: "1px solid var(--cl-border)",
      }}
    >
      {/* Toolbar skeleton */}
      <div
        className="p-4 flex items-center justify-between gap-4"
        style={{ borderBottom: "1px solid var(--cl-border)" }}
      >
        <div
          className="w-64 h-9 rounded skeleton-pulse"
          style={{ background: "var(--cl-bg)" }}
        />
        <div
          className="w-28 h-9 rounded skeleton-pulse"
          style={{ background: "var(--cl-bg)" }}
        />
      </div>

      {/* Header row skeleton */}
      <div
        className="grid grid-cols-5 gap-4 px-6 py-4"
        style={{
          background: "var(--cl-bg)",
          borderBottom: "1px solid var(--cl-border)",
        }}
      >
        {["Date", "Crime Type", "Neighborhood", "State", "Cases"].map((col) => (
          <div
            key={col}
            className="h-3 rounded skeleton-pulse"
            style={{ background: "var(--cl-border-2)" }}
          />
        ))}
      </div>

      {/* Data rows skeleton */}
      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-6 py-4"
            style={{
              borderBottom: "1px solid var(--cl-border)",
            }}
          >
            {[
              `${60 + (i % 3) * 15}%`,
              `${75 + (i % 4) * 10}%`,
              `${65 + (i % 3) * 12}%`,
              `${55 + (i % 5) * 10}%`,
              "40%",
            ].map((w, j) => (
              <div
                key={j}
                className="h-3 rounded skeleton-pulse"
                style={{
                  background: "var(--cl-bg)",
                  width: w,
                  marginLeft: j === 4 ? "auto" : undefined,
                  animationDelay: `${i * 60 + j * 20}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--cl-border)" }}
      >
        <div
          className="w-44 h-4 rounded skeleton-pulse"
          style={{ background: "var(--cl-bg)" }}
        />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded skeleton-pulse"
              style={{ background: "var(--cl-bg)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div
      className="p-6 rounded space-y-4"
      style={{
        background: "var(--cl-surface)",
        border: "1px solid var(--cl-border)",
      }}
    >
      <div
        className="flex items-center justify-between pb-3"
        style={{ borderBottom: "1px solid var(--cl-border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded skeleton-pulse"
            style={{ background: "var(--cl-bg)" }}
          />
          <div className="space-y-1.5">
            <div
              className="w-40 h-4 rounded skeleton-pulse"
              style={{ background: "var(--cl-bg)" }}
            />
            <div
              className="w-28 h-3 rounded skeleton-pulse"
              style={{ background: "var(--cl-bg)" }}
            />
          </div>
        </div>
        <div
          className="w-20 h-6 rounded skeleton-pulse"
          style={{ background: "var(--cl-bg)" }}
        />
      </div>
      {/* Simulated chart bars */}
      <div className="h-60 flex items-end gap-2 px-2 pt-4">
        {[55, 80, 45, 92, 68, 75, 40, 88, 62, 78, 50, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t skeleton-pulse"
            style={{
              height: `${h}%`,
              background: "rgba(214,40,40,0.15)",
              animationDelay: `${i * 40}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function SummarySkeleton() {
  return (
    <div
      className="rounded p-6 space-y-4"
      style={{
        background: "var(--cl-surface)",
        border: "1px solid var(--cl-border)",
        borderLeft: "3px solid var(--cl-red)",
      }}
    >
      <div
        className="flex items-center justify-between pb-3"
        style={{ borderBottom: "1px solid var(--cl-border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded skeleton-pulse"
            style={{ background: "var(--cl-bg)" }}
          />
          <div className="space-y-1.5">
            <div
              className="w-48 h-4 rounded skeleton-pulse"
              style={{ background: "var(--cl-bg)" }}
            />
            <div
              className="w-60 h-3 rounded skeleton-pulse"
              style={{ background: "var(--cl-bg)" }}
            />
          </div>
        </div>
        <div
          className="w-9 h-9 rounded skeleton-pulse"
          style={{ background: "var(--cl-bg)" }}
        />
      </div>
      <div
        className="p-4 rounded space-y-2.5"
        style={{
          background: "var(--cl-bg)",
          border: "1px solid var(--cl-border)",
        }}
      >
        {["100%", "91.6%", "83.3%", "100%", "75%"].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded skeleton-pulse"
            style={{
              background: "var(--cl-border)",
              width: w,
              animationDelay: `${i * 80}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
