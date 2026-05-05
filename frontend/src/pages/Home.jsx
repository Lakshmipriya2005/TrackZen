// src/pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Home Dashboard — Today's summary, AI insights, weekly chart, app breakdown.
// ─────────────────────────────────────────────────────────────────────────────
import { MOCK, BarChart, Icon } from "./shared";

// ── Motivational Banner ───────────────────────────────────────────────────────
function MotiveBanner({ text, sub }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, var(--amber-lt), #ffecd4)",
      border: "1px solid #efd5b8",
      borderRadius: "var(--r)",
      padding: "22px 28px",
      display: "flex",
      alignItems: "center",
      gap: 18,
      marginBottom: 24,
    }}>
      <span style={{ fontSize: 38, flexShrink: 0 }}>✨</span>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--ink)", lineHeight: 1.4 }}>
          {text}
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, unit, delta, deltaType }) {
  return (
    <div className="card">
      <div className="card-label">{label}</div>
      <div className="card-value">
        {value}
        {unit && <span className="card-unit">{unit}</span>}
      </div>
      {delta && (
        <div className={`card-delta ${deltaType === "up" ? "delta-up" : "delta-dn"}`}>
          {deltaType === "up" ? "▲" : "▼"} {delta}
        </div>
      )}
    </div>
  );
}

// ── AI Insight Panel ──────────────────────────────────────────────────────────
function AIInsights({ insights }) {
  return (
    <div className="card insight-card">
      <div className="insight-tag">
        <Icon.Spark /> AI Insights
      </div>
      <div className="insight-title">Here's what your data reveals today</div>
      <ul className="insight-list">
        {insights.map((ins, i) => (
          <li key={i} className="insight-item">
            <div className="insight-dot" />
            {ins}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── App Breakdown Panel ───────────────────────────────────────────────────────
function AppBreakdown({ apps }) {
  return (
    <div className="card">
      <div className="card-label" style={{ marginBottom: 18 }}>App Breakdown</div>
      {apps.map((app, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: i < apps.length - 1 ? 12 : 0,
        }}>
          {/* Color dot */}
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: app.color, flexShrink: 0 }} />
          {/* Bar fill */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{app.name}</span>
              <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{app.hrs}h</span>
            </div>
            <div style={{ height: 5, background: "var(--warm)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 99,
                background: app.color,
                width: `${(app.hrs / 2.5) * 100}%`,
                opacity: 0.75,
                transition: "width .8s ease",
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Weekly Chart Card ─────────────────────────────────────────────────────────
function WeeklyChart({ data, avg }) {
  return (
    <div className="card">
      <div className="card-label" style={{ marginBottom: 18 }}>Weekly Screen Time</div>
      <BarChart data={data} />
      <div style={{
        marginTop: 18,
        paddingTop: 16,
        borderTop: "1px solid var(--border)",
        display: "flex",
        gap: 24,
        fontSize: 13,
        color: "var(--ink-soft)",
      }}>
        <span>
          Daily avg:{" "}
          <strong style={{ color: "var(--ink)" }}>{avg}h</strong>
        </span>
        <span>
          Goal:{" "}
          <strong style={{ color: "var(--sage)" }}>5h / day</strong>
        </span>
        <span>
          Over goal:{" "}
          <strong style={{ color: "var(--rose)" }}>3 days</strong>
        </span>
      </div>
    </div>
  );
}

// ── Home Page (default export) ────────────────────────────────────────────────
export default function Home() {
  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          Good morning, <em>Priya</em> 🌿
        </h1>
        <p className="page-subtitle">
          Here's your digital wellness snapshot for today — {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}.
        </p>
      </div>

      {/* Motivational Banner */}
      <MotiveBanner text={MOCK.motivation.text} sub={MOCK.motivation.sub} />

      {/* Stats Row */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <StatCard
          label="Total Screen Time"
          value={MOCK.today.totalHours}
          unit="hrs"
          delta="0.4h from yesterday"
          deltaType="up"
        />
        <StatCard
          label="Most Used App"
          value={MOCK.today.mostUsed}
          delta="2.1 hrs used today"
          deltaType="up"
        />
        <StatCard
          label="Today's Mood"
          value={MOCK.today.mood}
          delta="Logged via journal"
          deltaType="dn"
        />
      </div>

      {/* AI Insights + App Breakdown */}
      <div className="grid-auto" style={{ marginBottom: 24 }}>
        <AIInsights insights={MOCK.insights} />
        <AppBreakdown apps={MOCK.apps} />
      </div>

      {/* Weekly Chart */}
      <WeeklyChart data={MOCK.weekly} avg={MOCK.weeklyAvg} />
    </div>
  );
}