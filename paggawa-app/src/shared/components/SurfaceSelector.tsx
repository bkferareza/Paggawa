import type { ShellSummary, SurfaceKey } from "../state/prototypeState";

type SurfaceSelectorProps = {
  summary: ShellSummary;
  onSelect: (surface: SurfaceKey) => void;
};

export function SurfaceSelector({ summary, onSelect }: SurfaceSelectorProps) {
  return (
    <section className="surface-selector" aria-label="Choose Paggawa surface">
      <div className="selector-copy">
        <p className="eyebrow">Choose a surface</p>
        <h2>One prototype, two working spaces</h2>
        <p>
          Lane 02 adds local job request creation while keeping resident, worker,
          and barangay previews on the same data layer.
        </p>
      </div>

      <div className="surface-options">
        <button
          type="button"
          className="surface-option mobile-option"
          onClick={() => onSelect("mobile")}
        >
          <span className="option-kicker">Phone/mobile</span>
          <strong>Paggawa Mobile</strong>
          <span>Resident and Worker dashboards</span>
          <span className="option-metrics">
            {summary.totalWorkers} workers / {summary.totalOpenJobs} open jobs
          </span>
        </button>

        <button
          type="button"
          className="surface-option quest-option"
          onClick={() => onSelect("quest")}
        >
          <span className="option-kicker">Barangay hall</span>
          <strong>Paggawa Quest</strong>
          <span>Staff dashboard and quest board preview</span>
          <span className="option-metrics">
            {summary.assistedRequests} assisted / {summary.registeredWorkers} registered
          </span>
        </button>
      </div>
    </section>
  );
}
