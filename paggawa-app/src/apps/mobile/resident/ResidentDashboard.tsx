import { JobPreviewCard } from "../../../shared/components/JobPreviewCard";
import { StatCard } from "../../../shared/components/StatCard";
import { WorkerPreviewCard } from "../../../shared/components/WorkerPreviewCard";
import {
  getOpenJobRequests,
  getResidentPreviewWorkers,
} from "../../../shared/state/prototypeState";

export function ResidentDashboard() {
  const nearbyWorkers = getResidentPreviewWorkers();
  const openJobs = getOpenJobRequests();

  return (
    <div className="dashboard-stack">
      <div className="stat-grid">
        <StatCard
          label="Nearby workers"
          value={nearbyWorkers.length}
          detail="Barangay-scale preview"
          tone="green"
        />
        <StatCard
          label="Open job requests"
          value={openJobs.length}
          detail="Visible with approximate area only"
          tone="amber"
        />
      </div>

      <section className="dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Resident dashboard</p>
          <h2>Nearby worker previews</h2>
        </div>
        <div className="card-grid">
          {nearbyWorkers.slice(0, 3).map((worker) => (
            <WorkerPreviewCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Local activity</p>
          <h2>Sample open requests</h2>
        </div>
        <div className="card-grid">
          {openJobs.slice(0, 3).map((job) => (
            <JobPreviewCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
