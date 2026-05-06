import { useState } from "react";
import { ShellHeader } from "../../shared/components/ShellHeader";
import { ResidentDashboard } from "./resident/ResidentDashboard";
import { WorkerDashboard } from "./worker/WorkerDashboard";
import type { MobileMode } from "../../shared/state/prototypeState";

type MobileShellProps = {
  onBack: () => void;
};

export function MobileShell({ onBack }: MobileShellProps) {
  const [mode, setMode] = useState<MobileMode>("resident");

  return (
    <section className="surface-page mobile-page">
      <ShellHeader
        eyebrow="Paggawa Mobile"
        title="Phone-first demo surface"
        description="Resident and worker dashboards share the same mock data layer."
        onBack={onBack}
      />

      <div className="segmented-control" role="tablist" aria-label="Mobile view">
        <button
          type="button"
          className={mode === "resident" ? "active" : ""}
          onClick={() => setMode("resident")}
          aria-selected={mode === "resident"}
        >
          Resident
        </button>
        <button
          type="button"
          className={mode === "worker" ? "active" : ""}
          onClick={() => setMode("worker")}
          aria-selected={mode === "worker"}
        >
          Worker
        </button>
      </div>

      {mode === "resident" ? <ResidentDashboard /> : <WorkerDashboard />}
    </section>
  );
}
