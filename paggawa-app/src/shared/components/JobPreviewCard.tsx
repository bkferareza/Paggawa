import type { JobRequest } from "../domain/models";
import {
  formatDistance,
  formatJobStatus,
  formatRequesterType,
} from "../utils/formatting";

type JobPreviewCardProps = {
  job: JobRequest;
  showRequesterType?: boolean;
};

export function JobPreviewCard({
  job,
  showRequesterType = false,
}: JobPreviewCardProps) {
  return (
    <article className="preview-card job-card">
      <div className="card-row">
        <span className="category-pill">{job.category}</span>
        <span className="status-pill">{formatJobStatus(job.status)}</span>
      </div>
      <h3>{job.title}</h3>
      <p>{job.summary}</p>
      <dl className="detail-list">
        <div>
          <dt>Area</dt>
          <dd>{job.areaLabel}</dd>
        </div>
        <div>
          <dt>Distance</dt>
          <dd>{formatDistance(job.approximateDistanceKm)}</dd>
        </div>
        <div>
          <dt>Timing</dt>
          <dd>{job.preferredTiming}</dd>
        </div>
        {showRequesterType && (
          <div>
            <dt>Request</dt>
            <dd>{formatRequesterType(job.requesterType)}</dd>
          </div>
        )}
      </dl>
      <p className="privacy-note">{job.privacyNote}</p>
    </article>
  );
}
