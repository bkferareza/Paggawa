import type { JobRequest } from "../domain/models";
import {
  formatBudgetRange,
  formatDistance,
  formatJobSource,
  formatJobStatus,
  formatRequesterType,
  formatUrgency,
} from "../utils/formatting";

type JobPreviewCardProps = {
  job: JobRequest;
  showBudget?: boolean;
  showResponsePlaceholder?: boolean;
  showRequesterType?: boolean;
  showSource?: boolean;
};

export function JobPreviewCard({
  job,
  showBudget = false,
  showResponsePlaceholder = false,
  showRequesterType = false,
  showSource = false,
}: JobPreviewCardProps) {
  return (
    <article className="preview-card job-card">
      <div className="card-row">
        <span className="category-pill">{job.category}</span>
        <span className="status-pill">{formatJobStatus(job.status)}</span>
      </div>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <dl className="detail-list">
        <div>
          <dt>Area</dt>
          <dd>{job.areaLabel}</dd>
        </div>
        <div>
          <dt>Urgency</dt>
          <dd>{formatUrgency(job.urgency)}</dd>
        </div>
        {showBudget && (
          <div>
            <dt>Budget</dt>
            <dd>{formatBudgetRange(job)}</dd>
          </div>
        )}
        {showSource && (
          <div>
            <dt>Source</dt>
            <dd>{formatJobSource(job.source)}</dd>
          </div>
        )}
        <div>
          <dt>Distance</dt>
          <dd>{formatDistance(job.approximateDistanceKm)}</dd>
        </div>
        {job.preferredTiming && (
          <div>
            <dt>Timing</dt>
            <dd>{job.preferredTiming}</dd>
          </div>
        )}
        {showRequesterType && (
          <div>
            <dt>Request</dt>
            <dd>{formatRequesterType(job.requesterType)}</dd>
          </div>
        )}
      </dl>
      {showResponsePlaceholder && (
        <button type="button" className="placeholder-button" disabled>
          Response flow comes in Lane 05
        </button>
      )}
      <p className="privacy-note">{job.privacyNote}</p>
    </article>
  );
}
