import type { WorkerProfile } from "../domain/models";
import { getUserById } from "../state/prototypeState";
import {
  formatDistance,
  formatRating,
  formatSkills,
  formatTrustSignals,
} from "../utils/formatting";

type WorkerPreviewCardProps = {
  worker: WorkerProfile;
  featured?: boolean;
};

export function WorkerPreviewCard({
  worker,
  featured = false,
}: WorkerPreviewCardProps) {
  const user = getUserById(worker.userId);

  return (
    <article className={`preview-card worker-card ${featured ? "featured" : ""}`}>
      <div className="card-row">
        <span className="category-pill">{worker.primaryCategory}</span>
        <span className="status-pill">{formatDistance(worker.approximateDistanceKm)}</span>
      </div>
      <h3>{user?.displayName ?? "Worker profile"}</h3>
      <p>{worker.headline}</p>
      <dl className="detail-list">
        <div>
          <dt>Skills</dt>
          <dd>{formatSkills(worker.skillCategories)}</dd>
        </div>
        <div>
          <dt>Service area</dt>
          <dd>{worker.serviceAreas.join(", ")}</dd>
        </div>
        <div>
          <dt>Record</dt>
          <dd>
            {worker.completedJobs} completed / {formatRating(worker.rating)}
          </dd>
        </div>
      </dl>
      <div className="trust-list" aria-label="Trust signals">
        {formatTrustSignals(worker.trustSignals).map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
      <p className="availability-note">{worker.availabilityNote}</p>
    </article>
  );
}
