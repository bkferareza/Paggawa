import { useState } from "react";
import { MobileShell } from "./apps/mobile/MobileShell";
import { QuestShell } from "./apps/quest/QuestShell";
import { SurfaceSelector } from "./shared/components/SurfaceSelector";
import {
  getShellSummary,
  privacyDisplayRules,
  type SurfaceKey,
} from "./shared/state/prototypeState";

export default function App() {
  const [activeSurface, setActiveSurface] = useState<SurfaceKey | null>(null);
  const shellSummary = getShellSummary();

  return (
    <main className="app-shell">
      <header className="brand-bar">
        <div>
          <p className="eyebrow">Paggawa v0.1</p>
          <h1>Local work discovery shell</h1>
        </div>
        <div className="data-pill">
          {shellSummary.totalWorkers} workers / {shellSummary.totalOpenJobs} open jobs
        </div>
      </header>

      {activeSurface === null && (
        <SurfaceSelector summary={shellSummary} onSelect={setActiveSurface} />
      )}

      {activeSurface === "mobile" && (
        <MobileShell onBack={() => setActiveSurface(null)} />
      )}

      {activeSurface === "quest" && (
        <QuestShell onBack={() => setActiveSurface(null)} />
      )}

      <footer className="guardrail-footer" aria-label="Lane 01 privacy guardrails">
        {privacyDisplayRules.map((rule) => (
          <span key={rule}>{rule}</span>
        ))}
      </footer>
    </main>
  );
}
