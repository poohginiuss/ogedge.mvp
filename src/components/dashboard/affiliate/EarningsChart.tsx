"use client";

import { useCallback, useRef, useState } from "react";

type Period = "Daily" | "Weekly" | "Annually";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const WEEKS_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];

const DAYS_LABELS = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

const chartDataByYear: Record<string, Record<Period, number[]>> = {
  "2023": {
    Daily: [
      400, 520, 380, 610, 750, 490, 820, 700, 900, 650, 480, 350,
      420, 580, 670, 810, 540, 390, 720, 860, 930, 510, 440, 370,
      690, 780, 850, 620, 470, 310,
    ],
    Weekly: [1000, 1500, 1200, 1800, 2200, 1400, 2500, 2100, 2700, 1800, 1100, 800],
    Annually: [1200, 2000, 1500, 2300, 2800, 1700, 3000, 2600, 3200, 2100, 1300, 900],
  },
  "2024": {
    Daily: [
      500, 680, 420, 790, 950, 600, 1050, 880, 1120, 820, 590, 430,
      550, 740, 860, 1020, 690, 480, 910, 1080, 1170, 660, 560, 450,
      870, 980, 1060, 780, 570, 390,
    ],
    Weekly: [1200, 2100, 1500, 2500, 2900, 1700, 3200, 2800, 3500, 2300, 1500, 900],
    Annually: [1500, 2500, 1800, 2800, 3200, 2000, 3500, 3100, 3800, 2600, 1700, 1100],
  },
  "2025": {
    Daily: [
      600, 820, 510, 960, 1150, 720, 1280, 1080, 1360, 1000, 710, 520,
      660, 900, 1040, 1240, 840, 580, 1100, 1310, 1420, 800, 680, 540,
      1060, 1190, 1290, 950, 690, 470,
    ],
    Weekly: [1400, 2600, 1800, 3000, 3400, 2000, 3800, 3500, 4100, 3100, 1800, 1000],
    Annually: [1800, 3100, 2200, 3400, 3800, 2300, 4200, 3900, 4500, 3400, 2000, 1200],
  },
};

const Y_TICKS = [0, 1000, 2000, 3000, 4000, 5000];
const Y_LABELS = ["0", "1k", "2k", "3k", "4k", "5k"];
const MAX_Y = 5000;

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const curr = pts[i];
    const next = pts[i + 1];
    const cpx = (curr.x + next.x) / 2;
    d += ` C${cpx},${curr.y} ${cpx},${next.y} ${next.x},${next.y}`;
  }
  return d;
}

function getTimeLabels(period: Period): string[] {
  switch (period) {
    case "Daily":
      return DAYS_LABELS;
    case "Weekly":
      return WEEKS_LABELS;
    case "Annually":
      return MONTHS;
  }
}

export function EarningsChart() {
  const [year, setYear] = useState("2025");
  const [period, setPeriod] = useState<Period>("Annually");
  const [yearOpen, setYearOpen] = useState(false);
  const [periodOpen, setPeriodOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const data = chartDataByYear[year][period];
  const timeLabels = getTimeLabels(period);
  const total = data.reduce((a, b) => a + b, 0);
  const totalLabel = total >= 1000 ? `$${(total / 1000).toFixed(1)}k` : `$${total}`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!chartRef.current) return;
      const rect = chartRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const idx = Math.round(x * (data.length - 1));
      setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
    },
    [data.length],
  );

  return (
    <div
      className="flex flex-col gap-6 rounded-3xl border border-[#7e7eb8] p-6 backdrop-blur-[7px] lg:p-8"
      style={{
        backgroundImage:
          "linear-gradient(-65deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-body text-sm text-white/50">Earnings {year}</span>
          {/* Desktop: big text + percent inline */}
          <div className="hidden items-center gap-3 lg:flex">
            <span className="font-body text-4xl font-bold text-white">{totalLabel}</span>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dashboard/icons/growth-indicator.svg"
                  alt=""
                  className="h-3 w-3"
                />
                <span className="font-body text-sm font-bold text-[#04ce00]">1.3%</span>
              </div>
              <span className="font-body text-xs text-white/50">VS LAST YEAR</span>
            </div>
          </div>
          {/* Mobile: stacked */}
          <span className="font-body text-2xl font-bold text-white lg:hidden">{totalLabel}</span>
          <div className="flex items-center gap-1 lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/icons/growth-indicator.svg"
              alt=""
              className="h-3 w-3"
            />
            <span className="font-body text-sm font-bold text-[#04ce00]">1.3%</span>
            <span className="font-body text-xs text-white/50">VS LAST YEAR</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-center lg:gap-3">
          {/* Year dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setYearOpen(!yearOpen)}
              className="flex items-center gap-4 rounded-full bg-dark-border px-3 py-1.5"
            >
              <span className="font-body text-xs text-white">{year}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/icons/chevron-down.svg"
                alt=""
                className="h-[6px] w-[10px]"
              />
            </button>
            {yearOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 flex flex-col overflow-hidden rounded-xl bg-dark-border shadow-lg">
                {["2023", "2024", "2025"].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => {
                      setYear(y);
                      setYearOpen(false);
                    }}
                    className={`px-5 py-2 text-left font-body text-xs transition-colors hover:bg-white/10 ${
                      y === year ? "text-brand-light" : "text-white"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Period selector — desktop pills */}
          <div className="hidden items-center rounded-full bg-dark-border p-1 lg:flex">
            {(["Daily", "Weekly", "Annually"] as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPeriod(p);
                  setHoverIdx(null);
                }}
                className={`rounded-full px-4 py-1.5 font-body text-xs font-medium transition-colors ${
                  p === period ? "bg-brand-main text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {/* Period selector — mobile dropdown */}
          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setPeriodOpen(!periodOpen)}
              className="flex items-center gap-4 rounded-full bg-dark-border px-3 py-1.5"
            >
              <span className="font-body text-xs text-white">{period}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/icons/chevron-down.svg"
                alt=""
                className="h-[6px] w-[10px]"
              />
            </button>
            {periodOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 flex flex-col overflow-hidden rounded-xl bg-dark-border shadow-lg">
                {(["Daily", "Weekly", "Annually"] as Period[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPeriod(p);
                      setPeriodOpen(false);
                      setHoverIdx(null);
                    }}
                    className={`px-5 py-2 text-left font-body text-xs transition-colors hover:bg-white/10 ${
                      p === period ? "text-brand-light" : "text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart area */}
      <div className="flex gap-2">
        {/* Chart + X-axis */}
        <div className="flex flex-1 flex-col gap-2">
          <div
            ref={chartRef}
            className="relative h-[220px] w-full cursor-crosshair lg:h-[380px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverIdx(null)}
          >
            <ChartSVG data={data} hoverIdx={hoverIdx} />
            {hoverIdx !== null && (
              <ChartTooltip
                data={data}
                timeLabels={timeLabels}
                hoverIdx={hoverIdx}
              />
            )}
          </div>

          {/* Time labels */}
          <div className="flex justify-between overflow-hidden">
            {timeLabels.map((label, i) => {
              const showLabel =
                period === "Daily"
                  ? i % 5 === 0 || i === timeLabels.length - 1
                  : true;
              return (
                <span
                  key={`${period}-${label}-${i}`}
                  className={`font-body text-dark-border ${
                    period === "Daily" ? "text-[7px] lg:text-[9px]" : "text-[9px] lg:text-xs"
                  } ${showLabel ? "" : "invisible"}`}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Y-axis labels — right side */}
        <div className="flex flex-col-reverse justify-between pb-1 pt-0">
          {Y_LABELS.map((label) => (
            <span
              key={label}
              className="font-body text-[10px] leading-none text-dark-border lg:text-xs"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartSVG({
  data,
  hoverIdx,
}: {
  data: number[];
  hoverIdx: number | null;
}) {
  const px = data.map((val, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (val / MAX_Y) * 100,
  }));
  const curveLine = smoothPath(px);
  const last = px[px.length - 1];
  const curveArea = `${curveLine} L${last.x},100 L0,100 Z`;

  const hoverPt = hoverIdx !== null ? px[hoverIdx] : null;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff5c00" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff5c00" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Horizontal grid lines only */}
      {Y_TICKS.map((tick) => {
        const y = 100 - (tick / MAX_Y) * 100;
        return (
          <line
            key={tick}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#383852"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      <path d={curveArea} fill="url(#chartFill)" />
      <path
        d={curveLine}
        fill="none"
        stroke="#ff5c00"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* Hover vertical line */}
      {hoverPt && (
        <line
          x1={hoverPt.x}
          y1={hoverPt.y}
          x2={hoverPt.x}
          y2="100"
          stroke="#ff5c00"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.6"
        />
      )}
    </svg>
  );
}

function ChartTooltip({
  data,
  timeLabels,
  hoverIdx,
}: {
  data: number[];
  timeLabels: string[];
  hoverIdx: number;
}) {
  const xPct = (hoverIdx / (data.length - 1)) * 100;
  const yPct = (1 - data[hoverIdx] / MAX_Y) * 100;

  return (
    <>
      {/* Dot */}
      <div
        className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-main"
        style={{ left: `${xPct}%`, top: `${yPct}%` }}
      />
      {/* Tooltip box */}
      <div
        className="pointer-events-none absolute flex -translate-x-1/2 flex-col items-center rounded-lg border border-dark-border bg-dark-surface px-3 py-1.5 shadow-lg"
        style={{
          left: `${xPct}%`,
          top: `${yPct}%`,
          transform: `translate(-65%, calc(100% - 68px))`,
        }}
      >
        <span className="font-body text-xs text-white/70">{timeLabels[hoverIdx]}</span>
        <span className="font-body text-sm font-semibold text-white">
          ${data[hoverIdx].toLocaleString()}
        </span>
      </div>
    </>
  );
}
