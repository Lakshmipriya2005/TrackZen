// src/App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Root component — wires Sidebar + page routing together.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { Sidebar } from "./pages/shared";

import Home       from "./pages/Home";
import ScreenTime from "./pages/ScreenTime";
import Journal    from "./pages/Journal";
import Progress   from "./pages/Progress";

import "./pages/global.css";

// Inline animation keyframes (only needed once, not in CSS file)
const extraCSS = document.createElement("style");
extraCSS.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 768px) {
    .mobile-menu-btn { display: flex !important; }
    nav { transform: translateX(-100%); }
    nav.open { transform: translateX(0) !important; }
  }
`;
document.head.appendChild(extraCSS);

// ── Page registry ─────────────────────────────────────────────────────────────
const PAGES = {
  home:     <Home />,
  screen:   <ScreenTime />,
  journal:  <Journal />,
  progress: <Progress />,
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app-shell">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {PAGES[currentPage]}
      </main>
    </div>
  );
}