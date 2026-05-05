// src/pages/Progress.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Progress — habit score ring, weekly/monthly tabs, bar charts, AI summary.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { MOCK, BarChart, ScoreRing, Icon } from "./shared";

// ── Weekly chart data ─────────────────────────────────────────────────────────
const MONTHLY_BARS = [
  { day: "Wk 1", hrs: 6.8, color: "#c97c7c" },
  { day: "Wk 2", hrs: 5.9, color: "#d4874e" },
  { day: "Wk 3", hrs: 5.4, color: "#7c9e8a" },
  { day: "Wk 4", hrs: 4.9, color: "#7c9e8a" },
];

// ── Progress bars data ────────────────────────────────────────────────────────
const WEEKLY_PROGRESS = [
  { label: "Instagram",  pct: 42, variant: "rose" },
  { label: "YouTube",    pct: 36, variant: "amber" },
  { label: "WhatsApp",   pct: 24, variant: "lilac" },
  { label: "Other Apps", pct: 18, variant: "" },
];

const MONTHLY_PROGRESS = [
  { label: "Screen Goal Met",    pct: 68, variant: "" },
  { label: "Journal Streak",     pct: 85, variant: "amber" },
  { label: "No-Phone Mornings",  pct: 57, variant: "lilac" },
  { label: "Curfew Compliance",  pct: 40, variant: "rose" },
];

// ── AI Monthly Insights ───────────────────────────────────────────────────────
const MONTHLY_AI = [
  "Screen time dropped 14% from Week 1 to Week 4 — a consistent positive trend.",
  "Journal entries correlate strongly with lower screen time the following day.",
  "Night-time usage (after 10 PM) remains your single biggest habit to address.",
  "Recommendation: Set a 9 PM phone-down reminder for the next 14 days.",
];

// ── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, unit, delta, deltaType }) {
  return (
    <div className="card">
      <div className="card-label">{label}</div>
      <div className="card-value" style={{ color: deltaType === "good" ? "var(--sage)" : undefined }}>
        {value}
        {unit && <span className="card-unit">{unit}</span>}
      </div>
      {delta && (
        <div className={`card-delta ${deltaType === "bad" ? "delta-up" : "delta-dn"}`}>
          {deltaType === "bad" ? "▲" : "▼"} {delta}
        </div>
      )}
    </div>
  );
}

// ── Progress Bar Section ──────────────────────────────────────────────────────
function ProgressBars({ data }) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.label} className="prog-row">
          <div className="prog-label">
            <span>{item.label}</span>
            <span>{item.pct}%</span>
          </div>
          <div className="prog-track">
            <div className={`prog-fill ${item.variant}`} style={{ width: `${item.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Habit Calendar Heatmap (simple) ──────────────────────────────────────────
function HeatmapRow() {
  // 28 days: 1 = good day (under goal), 0 = bad, null = no data
  const days = [1,0,1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,1,1];
  const dayLabels = ["M","T","W","T","F","S","S"];

  return (
    <div className="card" style={{ marginTop: 0 }}>
      <div className="card-label" style={{ marginBottom: 14 }}>📅 Month Overview</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 8 }}>
        {dayLabels.map((d, i) => (
          <div key={i} style={{ fontSize: 10, textAlign: "center", color: "var(--ink-soft)", fontWeight: 600 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {days.map((d, i) => (
          <div key={i} title={d === 1 ? "Goal met ✓" : "Over goal"} style={{
            height: 28,
            borderRadius: 5,
            background: d === 1 ? "var(--sage)" : "#f5e3e3",
            opacity: d === 1 ? 0.75 : 0.6,
            cursor: "default",
            transition: "opacity .18s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "1"}
          onMouseLeave={e => e.currentTarget.style.opacity = d === 1 ? "0.75" : "0.6"}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 11.5, color: "var(--ink-soft)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: "var(--sage)", opacity: 0.75 }} />
          Goal met
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: "#f5e3e3" }} />
          Over goal
        </div>
      </div>
    </div>
  );
}

// ── Progress Page (default export) ───────────────────────────────────────────
export default function Progress() {
  const [tab, setTab] = useState("weekly");
  const progressData = tab === "weekly" ? WEEKLY_PROGRESS : MONTHLY_PROGRESS;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          Your <em>Progress</em>
        </h1>
        <p className="page-subtitle">
          Weekly and monthly trends, habit scores, and AI-generated improvement insights.
        </p>
      </div>

      {/* Top stats row */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {/* Score ring */}
        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ScoreRing score={MOCK.habitScore} improvement={MOCK.improvement} />
        </div>

        <StatCard
          label="Weekly Average"
          value={MOCK.weeklyAvg}
          unit="hrs / day"
          delta="0.8h from last week"
          deltaType="dn"
        />
        <StatCard
          label="Monthly Improvement"
          value={`+${MOCK.improvement}`}
          unit="%"
          delta="Steady downward trend"
          deltaType="good"
        />
      </div>

      {/* Charts row */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Progress bars with tab switcher */}
        <div className="card">
          <div className="tab-bar">
            <button
              className={`tab-btn ${tab === "weekly" ? "active" : ""}`}
              onClick={() => setTab("weekly")}
            >
              Weekly
            </button>
            <button
              className={`tab-btn ${tab === "monthly" ? "active" : ""}`}
              onClick={() => setTab("monthly")}
            >
              Monthly
            </button>
          </div>
          <div className="card-label" style={{ marginBottom: 18 }}>
            {tab === "weekly" ? "App Usage Breakdown" : "Habit Completion Rate"}
          </div>
          <ProgressBars data={progressData} />
        </div>

        {/* Monthly trend bar chart */}
        <div className="card">
          <div className="card-label" style={{ marginBottom: 18 }}>Monthly Screen Time Trend</div>
          <BarChart data={MONTHLY_BARS} />
          <div style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}>
            {[
              ["Best Week",    "Week 4",  "4.9h avg"],
              ["Worst Week",   "Week 1",  "6.8h avg"],
              ["Journal Days", "19 / 28", "68%"],
              ["Goal Hit Days","11 / 28", "39%"],
            ].map(([label, val, sub]) => (
              <div key={label} className="stat-box">
                <div className="stat-box-label">{label}</div>
                <div className="stat-box-val">{val}</div>
                <div className="stat-box-sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap calendar */}
      <div style={{ marginBottom: 24 }}>
        <HeatmapRow />
      </div>

      {/* AI Monthly Summary */}
      <div className="card insight-card">
        <div className="insight-tag">
          <Icon.Spark /> Monthly AI Summary
        </div>
        <div className="insight-title">You've made real progress this month 🌱</div>
        <ul className="insight-list">
          {MONTHLY_AI.map((ins, i) => (
            <li key={i} className="insight-item">
              <div className="insight-dot" />
              {ins}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}