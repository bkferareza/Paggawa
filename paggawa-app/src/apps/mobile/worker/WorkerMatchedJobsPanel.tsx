import { MatchStatusBadge } from "../../../shared/components/MatchStatusBadge";
import type {
  JobRequest,
  Match,
  WorkerProfile,
} from "../../../shared/domain/models";
import {
  formatBudgetRange,
  formatCreatedDate,
  formatUrgency,
} from "../../../shared/utils/formatting";

type WorkerMatchedJobsPanelProps = {
  jobs: JobRequest[];
  matches: Match[];
  worker: WorkerProfile;
};

export function WorkerMatchedJobsPanel({
  jobs,
  matches,
  worker,
}: WorkerMatchedJobsPanelProps) {
  const workerMatches = matches.filter(
    (match) => match.workerProfileId === worker.id && match.status !== "cancelled",
  );
  const matchedJobs = workerMatches
    .map((match) => ({
      match,
      job: jobs.find((job) => job.id === match.jobRequestId),
    }))
    .filter(
      (item): item is { match: Match; job: JobRequest } =>
        typeof item.job !== "undefined",
    );

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">Matched work</p>
        <h2>Confirmed jobs</h2>
      </div>

      {matchedJobs.length > 0 ? (
        <div className="response-list">
          {matchedJobs.map(({ job, match }) => (
            <article className="matched-job-panel" key={match.id}>
              <div className="card-row">
                <div className="section-heading">
                  <p className="eyebrow">{job.category}</p>
                  <h2>{job.title}</h2>
                </div>
                <MatchStatusBadge status={match.status} />
              </div>

              <dl className="detail-list">
                <div>
                  <dt>Approximate area</dt>
                  <dd>{job.areaLabel}</dd>
                </div>
                <div>
                  <dt>Urgency</dt>
                  <dd>{formatUrgency(job.urgency)}</dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>{formatBudgetRange(job)}</dd>
                </div>
                <div>
                  <dt>Matched</dt>
                  <dd>{formatCreatedDate(match.createdAt)}</dd>
                </div>
              </dl>

              <p className="coordination-note">
                Coordination details unlocked after match. Resident and worker may now
                coordinate schedule and exact location outside this prototype.
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">No confirmed worker matches yet.</p>
      )}
    </section>
  );
}
