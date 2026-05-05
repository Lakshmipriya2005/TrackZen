// src/pages/ScreenTime.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Screen Time Input — dynamic multi-entry form to log daily app usage.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { Icon } from "./shared";

// ── App suggestions datalist ──────────────────────────────────────────────────
const APP_SUGGESTIONS = [
  "Instagram", "YouTube", "WhatsApp", "Twitter / X", "TikTok",
  "Netflix", "Chrome", "Safari", "Spotify", "LinkedIn",
  "Gmail", "Snapchat", "Reddit", "Discord", "Telegram",
];

// ── Tips Panel ────────────────────────────────────────────────────────────────
function TipsPanel() {
  const tips = [
    {
      emoji: "🌙",
      title: "Night usage matters",
      body: "Blue light after 9 PM delays your sleep cycle by up to 2 hours.",
    },
    {
      emoji: "📊",
      title: "Track honestly",
      body: "Even a rough estimate is far better than no data at all.",
    },
    {
      emoji: "🎯",
      title: "Set a daily goal",
      body: "Aim for under 5h total. Start with a 10% weekly reduction.",
    },
    {
      emoji: "🔔",
      title: "Passive vs active",
      body: "Scrolling burns ~2× more time than intentional app usage.",
    },
  ];

  return (
    <div className="card" style={{ height: "fit-content" }}>
      <div className="card-label" style={{ marginBottom: 16 }}>💡 Quick Tips</div>
      {tips.map((t) => (
        <div key={t.title} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 16 }}>{t.emoji}</span>
            <span style={{ fontWeight: 600, fontSize: 13, color: "var(--ink)" }}>{t.title}</span>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.55, paddingLeft: 26 }}>
            {t.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── App Entry Row ─────────────────────────────────────────────────────────────
function AppEntryRow({ entry, onUpdate, onRemove, canRemove }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr auto",
      gap: 12,
      alignItems: "flex-end",
      background: "var(--warm)",
      borderRadius: "var(--r-sm)",
      padding: "14px 16px",
      marginBottom: 10,
      animation: "slideIn .25s ease",
    }}>
      {/* App Name */}
      <div>
        <label className="form-label" style={{ fontSize: 11 }}>App Name</label>
        <input
          className="form-input"
          list={`apps-${entry.id}`}
          placeholder="e.g. Instagram"
          value={entry.app}
          onChange={(e) => onUpdate(entry.id, "app", e.target.value)}
        />
        <datalist id={`apps-${entry.id}`}>
          {APP_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
        </datalist>
      </div>

      {/* Hours */}
      <div>
        <label className="form-label" style={{ fontSize: 11 }}>Hours Used</label>
        <input
          className="form-input"
          type="number"
          min="0"
          max="24"
          step="0.5"
          placeholder="1.5"
          value={entry.hours}
          onChange={(e) => onUpdate(entry.id, "hours", e.target.value)}
        />
      </div>

      {/* Time of Day */}
      <div>
        <label className="form-label" style={{ fontSize: 11 }}>Time of Day</label>
        <select
          className="form-select"
          value={entry.period}
          onChange={(e) => onUpdate(entry.id, "period", e.target.value)}
        >
          <option value="morning">🌅 Morning</option>
          <option value="afternoon">☀️ Afternoon</option>
          <option value="night">🌙 Night</option>
        </select>
      </div>

      {/* Remove */}
      <div style={{ paddingBottom: 1 }}>
        <button
          className="btn btn-ghost"
          onClick={() => onRemove(entry.id)}
          disabled={!canRemove}
          style={{ opacity: canRemove ? 1 : 0.3, cursor: canRemove ? "pointer" : "not-allowed" }}
          title="Remove entry"
        >
          <Icon.Trash />
        </button>
      </div>
    </div>
  );
}

// ── Daily Summary (calculated) ────────────────────────────────────────────────
function LiveSummary({ entries }) {
  const total = entries.reduce((sum, e) => sum + (parseFloat(e.hours) || 0), 0);
  const filled = entries.filter((e) => e.app && e.hours).length;

  if (filled === 0) return null;

  return (
    <div style={{
      background: "var(--sage-dim)",
      borderRadius: "var(--r-sm)",
      padding: "14px 18px",
      marginTop: 16,
      display: "flex",
      gap: 24,
      fontSize: 13,
      flexWrap: "wrap",
    }}>
      <div>
        <span style={{ color: "var(--ink-soft)" }}>Total logged: </span>
        <strong style={{ color: total > 6 ? "var(--rose)" : "var(--sage)" }}>{total.toFixed(1)}h</strong>
      </div>
      <div>
        <span style={{ color: "var(--ink-soft)" }}>Apps tracked: </span>
        <strong style={{ color: "var(--ink)" }}>{filled}</strong>
      </div>
      {total > 6 && (
        <div style={{ color: "var(--rose)", fontWeight: 500 }}>
          ⚠️ Above your 6h daily target
        </div>
      )}
    </div>
  );
}

// ── Screen Time Page (default export) ────────────────────────────────────────
export default function ScreenTime() {
  const [entries, setEntries] = useState([
    { id: 1, app: "", hours: "", period: "morning" },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const addEntry = () => {
    setEntries((prev) => [
      ...prev,
      { id: Date.now(), app: "", hours: "", period: "morning" },
    ]);
  };

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = (id, field, value) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSubmit = () => {
    const valid = entries.some((e) => e.app && e.hours);
    if (!valid) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          Log <em>Screen Time</em>
        </h1>
        <p className="page-subtitle">
          Track which apps you used and for how long today. AI will analyze patterns over time.
        </p>
      </div>

      <div className="grid-auto">
        {/* Left — Form */}
        <div>
          {/* Success message */}
          {submitted && (
            <div className="success-banner">
              ✓ Screen time logged successfully! AI will analyze your usage patterns.
            </div>
          )}

          <div className="card">
            {/* Form header */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", marginBottom: 20,
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>
                  Today's App Usage
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                  {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
              <button className="btn btn-secondary" onClick={addEntry} style={{ padding: "9px 16px", fontSize: 13 }}>
                <Icon.Plus /> Add App
              </button>
            </div>

            {/* Column headers (desktop) */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto",
              gap: 12, paddingLeft: 4, marginBottom: 6,
            }}>
              {["App Name", "Hours Used", "Time of Day", ""].map((h) => (
                <div key={h} style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-soft)", letterSpacing: ".06em", textTransform: "uppercase" }}>
                  {h}
                </div>
              ))}
            </div>

            {/* Entries */}
            {entries.map((entry) => (
              <AppEntryRow
                key={entry.id}
                entry={entry}
                onUpdate={updateEntry}
                onRemove={removeEntry}
                canRemove={entries.length > 1}
              />
            ))}

            {/* Live summary */}
            <LiveSummary entries={entries} />

            {/* Submit */}
            <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center" }}>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Today's Log
              </button>
              <button className="btn btn-secondary" onClick={() => setEntries([{ id: Date.now(), app: "", hours: "", period: "morning" }])}>
                Clear All
              </button>
            </div>
          </div>

          {/* Recent log preview */}
          <div className="card" style={{ marginTop: 20 }}>
            <div className="card-label" style={{ marginBottom: 14 }}>📋 Yesterday's Log</div>
            {[
              { app: "Instagram", hrs: "2.1", period: "🌙 Night" },
              { app: "YouTube",   hrs: "1.8", period: "☀️ Afternoon" },
              { app: "WhatsApp",  hrs: "1.2", period: "🌅 Morning" },
            ].map((r) => (
              <div key={r.app} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "9px 0",
                borderBottom: "1px solid var(--border)",
              }}>
                <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{r.app}</span>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>{r.period}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-mid)", minWidth: 32, textAlign: "right" }}>{r.hrs}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Tips */}
        <TipsPanel />
      </div>
    </div>
  );
}