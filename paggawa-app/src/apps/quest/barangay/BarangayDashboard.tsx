import { JobPreviewCard } from "../../../shared/components/JobPreviewCard";
import { StatCard } from "../../../shared/components/StatCard";
import { WorkerPreviewCard } from "../../../shared/components/WorkerPreviewCard";
import {
  getAssistedRequests,
  getOpenJobRequests,
  getRegisteredWorkers,
} from "../../../shared/state/prototypeState";

export function BarangayDashboard() {
  const questBoardJobs = getOpenJobRequests();
  const registeredWorkers = getRegisteredWorkers();
  const assistedRequests = getAssistedRequests();

  return (
    <div className="dashboard-stack quest-grid">
      <div className="stat-grid">
        <StatCard
          label="Quest board"
          value={questBoardJobs.length}
          detail="Open local requests"
          tone="amber"
        />
        <StatCard
          label="Registered workers"
          value={registeredWorkers.length}
          detail="Local registry preview"
          tone="green"
        />
        <StatCard
          label="Assisted requests"
          value={assistedRequests.length}
          detail="Created through barangay help"
          tone="red"
        />
      </div>

      <section className="dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Barangay dashboard</p>
          <h2>Quest board preview</h2>
        </div>
        <div className="card-grid">
          {questBoardJobs.slice(0, 4).map((job) => (
            <JobPreviewCard key={job.id} job={job} showRequesterType />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Worker registry</p>
          <h2>Sample registry preview</h2>
        </div>
        <div className="card-grid">
          {registeredWorkers.slice(0, 4).map((worker) => (
            <WorkerPreviewCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>
    </div>
  );
}
