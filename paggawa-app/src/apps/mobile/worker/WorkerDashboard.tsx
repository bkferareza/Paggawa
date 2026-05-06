import { StatCard } from "../../../shared/components/StatCard";
import type { JobRequest, WorkerProfile } from "../../../shared/domain/models";
import { getWorkerDashboardProfile } from "../../../shared/state/prototypeState";
import { formatRating } from "../../../shared/utils/formatting";
import { NearbyJobsList } from "./NearbyJobsList";
import { WorkerProfileSummary } from "./WorkerProfileSummary";

type WorkerDashboardProps = {
  openJobRequests: JobRequest[];
  workerProfiles: WorkerProfile[];
};

export function WorkerDashboard({
  openJobRequests,
  workerProfiles,
}: WorkerDashboardProps) {
  const sampleProfile = getWorkerDashboardProfile(workerProfiles);

  return (
    <div className="dashboard-stack">
      <div className="stat-grid">
        <StatCard
          label="Nearby jobs"
          value={openJobRequests.length}
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
          <h2>Profile summary</h2>
        </div>
        <WorkerProfileSummary worker={sampleProfile} />
      </section>

      <NearbyJobsList jobs={openJobRequests} />
    </div>
  );
}
