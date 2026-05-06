import { JobPreviewCard } from "../../../shared/components/JobPreviewCard";
import { StatCard } from "../../../shared/components/StatCard";
import { WorkerPreviewCard } from "../../../shared/components/WorkerPreviewCard";
import {
  getOpenJobRequests,
  getWorkerDashboardProfile,
} from "../../../shared/state/prototypeState";
import { formatRating } from "../../../shared/utils/formatting";

export function WorkerDashboard() {
  const openJobs = getOpenJobRequests();
  const sampleProfile = getWorkerDashboardProfile();

  return (
    <div className="dashboard-stack">
      <div className="stat-grid">
        <StatCard
          label="Nearby jobs"
          value={openJobs.length}
          detail="Open requests in pilot areas"
          tone="blue"
        />
        <StatCard
          label="Completed jobs"
          value={sampleProfile.completedJobs}
          detail={`Sample rating ${formatRating(sampleProfile.rating)}`}
          tone="green"
        />
      </div>

      <section className="dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Worker dashboard</p>
          <h2>Sample profile summary</h2>
        </div>
        <WorkerPreviewCard worker={sampleProfile} featured />
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Available work</p>
          <h2>Open job previews</h2>
        </div>
        <div className="card-grid">
          {openJobs.slice(0, 4).map((job) => (
            <JobPreviewCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
