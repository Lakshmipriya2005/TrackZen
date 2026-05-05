// src/components/shared.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Shared icons, mock data, BarChart, ScoreRing, and Sidebar used across pages.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

// ── Mock Data ─────────────────────────────────────────────────────────────────
export const MOCK = {
  today: { totalHours: 6.4, mostUsed: "Instagram", mood: "Productive" },
  weekly: [
    { day: "Mon", hrs: 5.2, color: "#7c9e8a" },
    { day: "Tue", hrs: 7.8, color: "#c97c7c" },
    { day: "Wed", hrs: 4.5, color: "#7c9e8a" },
    { day: "Thu", hrs: 6.1, color: "#9b8dbf" },
    { day: "Fri", hrs: 8.3, color: "#c97c7c" },
    { day: "Sat", hrs: 3.9, color: "#7c9e8a" },
    { day: "Sun", hrs: 6.4, color: "#d4874e" },
  ],
  apps: [
    { name: "Instagram", hrs: 2.1, color: "#c97c7c" },
    { name: "YouTube",   hrs: 1.8, color: "#d4874e" },
    { name: "WhatsApp",  hrs: 1.2, color: "#7c9e8a" },
    { name: "Chrome",    hrs: 0.9, color: "#9b8dbf" },
    { name: "Twitter",   hrs: 0.4, color: "#8ab4d4" },
  ],
  insights: [
    "You spent 2.1h on Instagram — 40% of that happened after 10 PM.",
    "Your total screen time is 18% higher than your weekly average.",
    "Evenings are your highest-usage window. Consider setting a digital curfew.",
    "On journal days, your screen time drops by ~25% on average.",
  ],
  motivation: {
    text: "Every hour off screen is an hour invested in yourself.",
    sub: "You're on a 6-day streak — keep it going 🌿",
  },
  weeklyAvg: 6.0,
  habitScore: 72,
  improvement: 14,
};

// ── SVG Icon Library ──────────────────────────────────────────────────────────
export const Icon = {
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  ),
  Clock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15.5 15.5"/>
    </svg>
  ),
  Journal: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="12" y2="17"/>
    </svg>
  ),
  Chart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
      <line x1="2"  y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5"  y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  ),
  Spark: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
export function Sidebar({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { key: "home",     label: "Home",        Icon: Icon.Home    },
    { key: "screen",   label: "Screen Time", Icon: Icon.Clock   },
    { key: "journal",  label: "Journal",     Icon: Icon.Journal },
    { key: "progress", label: "Progress",    Icon: Icon.Chart   },
  ];

  const navigate = (key) => {
    onNavigate(key);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{
          display: "none",
          position: "fixed", top: 16, left: 16, zIndex: 200,
          background: "var(--card)", border: "1px solid var(--border)",
          borderRadius: 8, padding: 8, cursor: "pointer",
          boxShadow: "var(--shadow)",
        }}
        className="mobile-menu-btn"
        aria-label="Open menu"
      >
        <Icon.Menu />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,.35)",
            zIndex: 99, animation: "fadeIn .2s ease",
          }}
        />
      )}

      {/* Sidebar panel */}
      <nav style={{
        width: 240,
        background: "var(--card)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "28px 0",
        position: "fixed",
        top: 0, left: 0,
        height: "100vh",
        zIndex: 100,
        transition: "transform .3s ease",
        transform: mobileOpen ? "translateX(0)" : undefined,
      }}>
        {/* Logo */}
        <div style={{ padding: "0 24px 26px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink)", lineHeight: 1.2 }}>
            habit<em style={{ color: "var(--sage)", fontStyle: "italic" }}>wise</em>
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: ".08em", textTransform: "uppercase", marginTop: 3 }}>
            AI Wellness Tracker
          </div>
        </div>

        {/* Nav */}
        <ul style={{ listStyle: "none", padding: "18px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(({ key, label, Icon: Ic }) => (
            <li
              key={key}
              onClick={() => navigate(key)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: "var(--r-sm)",
                cursor: "pointer", fontSize: 14, fontWeight: 500,
                transition: "all .18s ease",
                background: currentPage === key ? "var(--sage)" : "transparent",
                color: currentPage === key ? "#fff" : "var(--ink-mid)",
                userSelect: "none",
              }}
              onMouseEnter={e => { if (currentPage !== key) e.currentTarget.style.background = "var(--sage-dim)"; }}
              onMouseLeave={e => { if (currentPage !== key) e.currentTarget.style.background = "transparent"; }}
            >
              <Ic />
              {label}
            </li>
          ))}
        </ul>

        {/* Footer streak */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8 }}>This week</div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--amber-lt)", borderRadius: 8, padding: "7px 12px",
          }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--amber)" }}>6-day streak</span>
          </div>
        </div>
      </nav>
    </>
  );
}

// ── BarChart ──────────────────────────────────────────────────────────────────
export function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.hrs));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <div key={i} className="bar-col">
          <div className="bar-val">{d.hrs}h</div>
          <div
            className="bar"
            style={{
              height: ready ? `${(d.hrs / max) * 96}px` : "4px",
              background: d.color,
              opacity: 0.8,
              transitionDelay: `${i * 55}ms`,
            }}
          />
          <div className="bar-day">{d.day}</div>
        </div>
      ))}
    </div>
  );
}

// ── ScoreRing ─────────────────────────────────────────────────────────────────
export function ScoreRing({ score, improvement }) {
  const r    = 48;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
        Habit Score
      </div>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e8f0ec" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke="#7c9e8a" strokeWidth="10"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
        <text x="60" y="55" textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, fill: "#1e2a22" }}>
          {score}
        </text>
        <text x="60" y="76" textAnchor="middle"
          style={{ fontFamily: "DM Sans,sans-serif", fontSize: 11, fill: "#8a9e92" }}>
          /100
        </text>
      </svg>
      <div style={{ fontSize: 12, color: "var(--sage)", fontWeight: 500 }}>
        ↑ {improvement}% this month
      </div>
    </div>
  );
}