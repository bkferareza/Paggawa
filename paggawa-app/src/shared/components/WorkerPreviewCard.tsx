import type { WorkerProfile } from "../domain/models";
import { getWorkerTrustSignals } from "../state/prototypeState";
import {
  formatDistance,
  formatRating,
  formatServiceRadius,
} from "../utils/formatting";
import { SkillBadge } from "./SkillBadge";
import { TrustSignalBadge } from "./TrustSignalBadge";

type WorkerPreviewCardProps = {
  worker: WorkerProfile;
  featured?: boolean;
  selected?: boolean;
  onViewProfile?: (worker: WorkerProfile) => void;
};

export function WorkerPreviewCard({
  worker,
  featured = false,
  selected = false,
  onViewProfile,
}: WorkerPreviewCardProps) {
  return (
    <article
      className={`preview-card worker-card ${featured ? "featured" : ""} ${
        selected ? "selected" : ""
      }`}
      aria-current={selected ? "true" : undefined}
    >
      <div className="card-row">
        <span className="category-pill">{worker.primaryCategory}</span>
        <span className="status-pill">
          {worker.barangayRegistered
            ? "Barangay-registered"
            : "Community-referred"}
        </span>
      </div>
      <h3>{worker.displayName}</h3>
      <p>{worker.headline}</p>
      <div className="skill-list" aria-label="Primary skills">
        {worker.skillCategories.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
      <dl className="detail-list">
        <div>
          <dt>Approximate location</dt>
          <dd>{worker.approximateLocationLabel}</dd>
        </div>
        <div>
          <dt>Service areas</dt>
          <dd>{worker.serviceAreas.join(", ")}</dd>
        </div>
        <div>
          <dt>Distance</dt>
          <dd>{formatDistance(worker.approximateDistanceKm)}</dd>
        </div>
        <div>
          <dt>Service radius</dt>
          <dd>{formatServiceRadius(worker.serviceRadiusKm)}</dd>
        </div>
        <div>
          <dt>Completed jobs</dt>
          <dd>{worker.completedJobs}</dd>
        </div>
        <div>
          <dt>Rating</dt>
          <dd>
            {formatRating(worker.rating)}
          </dd>
        </div>
      </dl>
      <div className="trust-list" aria-label="Trust signals">
        {getWorkerTrustSignals(worker).map((signal) => (
          <TrustSignalBadge key={signal} label={signal} />
        ))}
      </div>
      <p className="availability-note">{worker.availabilityNote}</p>
      {onViewProfile && (
        <button
          type="button"
          className="secondary-button"
          onClick={() => onViewProfile(worker)}
        >
          View profile
        </button>
      )}
    </article>
  );
}
