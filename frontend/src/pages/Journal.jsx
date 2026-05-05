
// src/pages/Journal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Daily Journal — mood selector, reflection textarea, prompts, recent entries.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";

// ── Mood config ───────────────────────────────────────────────────────────────
const MOODS = [
  { key: "happy",      emoji: "😊", label: "Happy",      bg: "#fffbe8", color: "#b38c00" },
  { key: "productive", emoji: "🚀", label: "Productive",  bg: "var(--sage-dim)", color: "var(--sage)" },
  { key: "stressed",   emoji: "😤", label: "Stressed",    bg: "var(--rose-lt)",  color: "var(--rose)" },
  { key: "tired",      emoji: "😴", label: "Tired",       bg: "var(--lilac-lt)", color: "var(--lilac)" },
  { key: "anxious",    emoji: "😟", label: "Anxious",     bg: "var(--amber-lt)", color: "var(--amber)" },
];

// ── Reflection prompts ────────────────────────────────────────────────────────
const PROMPTS = [
  "What did you accomplish today?",
  "What distracted you the most?",
  "How did your phone usage affect your mood?",
  "What would you do differently tomorrow?",
  "Did you have any screen-free moments today?",
  "What gave you the most energy today?",
];

// ── Recent journal entries (mock) ─────────────────────────────────────────────
const RECENT_ENTRIES = [
  {
    date: "Yesterday",
    mood: { emoji: "😊", label: "Happy", color: "#b38c00", bg: "#fffbe8" },
    excerpt: "Had a great walk after work, kept my phone away for 3 hours in the evening. Felt much more present.",
    words: 42,
  },
  {
    date: "2 days ago",
    mood: { emoji: "😴", label: "Tired", color: "var(--lilac)", bg: "var(--lilac-lt)" },
    excerpt: "Stayed up late watching YouTube again. Felt groggy all morning. Screen time hit 8h which is bad.",
    words: 31,
  },
  {
    date: "3 days ago",
    mood: { emoji: "🚀", label: "Productive", color: "var(--sage)", bg: "var(--sage-dim)" },
    excerpt: "Focused deep work session from 9–1, very little social media. Best day this week by far.",
    words: 28,
  },
];

// ── Mood Pill ─────────────────────────────────────────────────────────────────
function MoodPill({ mood, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(mood.key === selected ? "" : mood.key)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "9px 18px",
        borderRadius: 99,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        background: mood.bg,
        color: mood.color,
        border: `2px solid ${selected === mood.key ? mood.color : "transparent"}`,
        transform: selected === mood.key ? "scale(1.05)" : "scale(1)",
        transition: "all .18s ease",
        userSelect: "none",
      }}
    >
      {mood.emoji} {mood.label}
    </div>
  );
}

// ── Recent Entry Card ─────────────────────────────────────────────────────────
function RecentEntry({ entry }) {
  return (
    <div style={{
      padding: "14px 0",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{entry.date}</span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 11, fontWeight: 600, padding: "3px 9px",
          background: entry.mood.bg, color: entry.mood.color,
          borderRadius: 99,
        }}>
          {entry.mood.emoji} {entry.mood.label}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.55 }}>{entry.excerpt}</p>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 5 }}>{entry.words} words</div>
    </div>
  );
}

// ── Journal Page (default export) ────────────────────────────────────────────
export default function Journal() {
  const [journalText, setJournalText] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const wordCount = journalText.trim()
    ? journalText.trim().split(/\s+/).length
    : 0;
  const charCount = journalText.length;

  const appendPrompt = (prompt) => {
    setJournalText((prev) =>
      prev ? `${prev}\n\n${prompt} ` : `${prompt} `
    );
  };

  const handleSubmit = () => {
    if (!journalText.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleClear = () => {
    setJournalText("");
    setSelectedMood("");
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          Daily <em>Journal</em>
        </h1>
        <p className="page-subtitle">
          Reflect on your day. AI will extract mood signals and behavior patterns from your writing.
        </p>
      </div>

      <div className="grid-auto">
        {/* Left — Entry form */}
        <div>
          {submitted && (
            <div className="success-banner">
              ✓ Journal saved! AI is scanning your entry for mood and habit patterns.
            </div>
          )}

          <div className="card">
            {/* Mood selector */}
            <div className="form-group">
              <label className="form-label">How are you feeling today?</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {MOODS.map((m) => (
                  <MoodPill
                    key={m.key}
                    mood={m}
                    selected={selectedMood}
                    onSelect={setSelectedMood}
                  />
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="form-group">
              <label className="form-label">Today's Journal Entry</label>
              <textarea
                className="form-textarea"
                placeholder="What did you do today? How was your screen usage? Any reflections on how you felt..."
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                style={{ minHeight: 200 }}
              />
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontSize: 11.5, color: "var(--ink-soft)", marginTop: 5,
              }}>
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
              </div>
            </div>

            {/* AI preview hint */}
            {journalText.length > 30 && (
              <div style={{
                background: "linear-gradient(135deg, var(--ink) 0%, #2d4035 100%)",
                borderRadius: "var(--r-sm)", padding: "12px 16px",
                marginBottom: 20, color: "#fff", fontSize: 13,
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>🤖</span>
                <span style={{ opacity: 0.9, lineHeight: 1.5 }}>
                  AI will analyze tone, mood patterns, and screen-time correlations from your entry.
                </span>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!journalText.trim()}
              >
                Save Journal Entry
              </button>
              <button className="btn btn-secondary" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right — Prompts + Recent */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Reflection Prompts */}
          <div className="card">
            <div className="card-label" style={{ marginBottom: 14 }}>✍️ Reflection Prompts</div>
            <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 12 }}>
              Click a prompt to add it to your entry.
            </p>
            {PROMPTS.map((prompt) => (
              <div
                key={prompt}
                onClick={() => appendPrompt(prompt)}
                style={{
                  padding: "10px 14px",
                  background: "var(--warm)",
                  borderRadius: "var(--r-xs)",
                  fontSize: 13,
                  color: "var(--ink-mid)",
                  marginBottom: 7,
                  cursor: "pointer",
                  transition: "background .18s, color .18s",
                  lineHeight: 1.45,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--sage-dim)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--warm)";
                  e.currentTarget.style.color = "var(--ink-mid)";
                }}
              >
                {prompt}
              </div>
            ))}
          </div>

          {/* Recent Entries */}
          <div className="card">
            <div className="card-label" style={{ marginBottom: 4 }}>📅 Recent Entries</div>
            {RECENT_ENTRIES.map((entry) => (
              <RecentEntry key={entry.date} entry={entry} />
            ))}
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "9px" }}>
                View All Entries
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}