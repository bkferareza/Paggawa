import { JobPreviewCard } from "../../../shared/components/JobPreviewCard";
import type { JobRequest } from "../../../shared/domain/models";

type NearbyJobsListProps = {
  jobs: JobRequest[];
};

export function NearbyJobsList({ jobs }: NearbyJobsListProps) {
  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">Available work</p>
        <h2>Nearby open jobs</h2>
      </div>

      {jobs.length > 0 ? (
        <div className="card-grid">
          {jobs.map((job) => (
            <JobPreviewCard
              key={job.id}
              job={job}
              showBudget
              showResponsePlaceholder
              showRequesterType
              showSource
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">No open nearby jobs.</p>
      )}
    </section>
  );
}
