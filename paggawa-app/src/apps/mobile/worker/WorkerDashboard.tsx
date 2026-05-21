import { StatCard } from "../../../shared/components/StatCard";
import type {
  JobResponse,
  JobRequest,
  Match,
  WorkerProfile,
} from "../../../shared/domain/models";
import {
  getWorkerDashboardProfile,
  type CreateJobResponseInput,
} from "../../../shared/state/prototypeState";
import { formatRating } from "../../../shared/utils/formatting";
import { NearbyJobsList } from "./NearbyJobsList";
import { WorkerMatchedJobsPanel } from "./WorkerMatchedJobsPanel";
import { WorkerProfileSummary } from "./WorkerProfileSummary";

type WorkerDashboardProps = {
  jobRequests: JobRequest[];
  jobResponses: JobResponse[];
  matches: Match[];
  onCreateJobResponse: (input: CreateJobResponseInput) => JobResponse;
  openJobRequests: JobRequest[];
  workerProfiles: WorkerProfile[];
};

export function WorkerDashboard({
  jobRequests,
  jobResponses,
  matches,
  onCreateJobResponse,
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

      <NearbyJobsList
        jobResponses={jobResponses}
        jobs={openJobRequests}
        onCreateJobResponse={onCreateJobResponse}
        worker={sampleProfile}
      />

      <WorkerMatchedJobsPanel
        jobs={jobRequests}
        matches={matches}
        worker={sampleProfile}
      />
    </div>
  );
}
