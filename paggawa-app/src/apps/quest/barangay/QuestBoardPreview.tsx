import { JobPreviewCard } from "../../../shared/components/JobPreviewCard";
import type { JobRequest } from "../../../shared/domain/models";

type QuestBoardPreviewProps = {
  jobs: JobRequest[];
};

export function QuestBoardPreview({ jobs }: QuestBoardPreviewProps) {
  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">Quest board</p>
        <h2>Open job requests</h2>
      </div>

      {jobs.length > 0 ? (
        <div className="card-grid">
          {jobs.map((job) => (
            <JobPreviewCard
              key={job.id}
              job={job}
              showBudget
              showRequesterType
              showSource
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">No open quest-board-ready jobs.</p>
      )}
    </section>
  );
}
