import { JobPreviewCard } from "../../../shared/components/JobPreviewCard";
import type { JobRequest } from "../../../shared/domain/models";

type ResidentJobRequestsProps = {
  jobs: JobRequest[];
};

export function ResidentJobRequests({ jobs }: ResidentJobRequestsProps) {
  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">My requests</p>
        <h2>Resident job requests</h2>
      </div>

      {jobs.length > 0 ? (
        <div className="card-grid">
          {jobs.map((job) => (
            <JobPreviewCard
              key={job.id}
              job={job}
              showBudget
              showSource
              showRequesterType
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">No resident requests yet.</p>
      )}
    </section>
  );
}
