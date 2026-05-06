import { SkillBadge } from "../../../shared/components/SkillBadge";
import { TrustSignalBadge } from "../../../shared/components/TrustSignalBadge";
import type { WorkerProfile } from "../../../shared/domain/models";
import { getWorkerTrustSignals } from "../../../shared/state/prototypeState";
import {
  formatDistance,
  formatExperience,
  formatRating,
  formatReferralCount,
  formatReviewCount,
  formatServiceRadius,
} from "../../../shared/utils/formatting";

type WorkerProfileViewProps = {
  worker: WorkerProfile;
  contextLabel?: string;
  showRequestPlaceholder?: boolean;
};

export function WorkerProfileView({
  worker,
  contextLabel = "Worker profile",
  showRequestPlaceholder = true,
}: WorkerProfileViewProps) {
  return (
    <aside className="worker-profile-panel" aria-label={`${worker.displayName} profile`}>
      <div className="section-heading">
        <p className="eyebrow">{contextLabel}</p>
        <h2>{worker.displayName}</h2>
      </div>

      <p>{worker.bio}</p>

      <div className="skill-list" aria-label="Worker skills">
        {worker.skillCategories.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>

      <dl className="profile-metrics">
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
          <dt>Experience</dt>
          <dd>{formatExperience(worker.experienceYears)}</dd>
        </div>
        <div>
          <dt>Availability note</dt>
          <dd>{worker.availabilityNote}</dd>
        </div>
        <div>
          <dt>Completed jobs</dt>
          <dd>{worker.completedJobs}</dd>
        </div>
        <div>
          <dt>Rating</dt>
          <dd>{formatRating(worker.rating)}</dd>
        </div>
        <div>
          <dt>Reviews</dt>
          <dd>{formatReviewCount(worker.reviewsCount)}</dd>
        </div>
        <div>
          <dt>Referral count</dt>
          <dd>{formatReferralCount(worker.referralCount)}</dd>
        </div>
      </dl>

      <div className="profile-subsection">
        <h3>Trust signals</h3>
        <div className="trust-list">
          {getWorkerTrustSignals(worker).map((signal) => (
            <TrustSignalBadge key={signal} label={signal} />
          ))}
        </div>
      </div>

      {worker.sampleWork && worker.sampleWork.length > 0 && (
        <div className="profile-subsection">
          <h3>Sample work</h3>
          <ul className="sample-work-list">
            {worker.sampleWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {showRequestPlaceholder && (
        <button type="button" className="placeholder-button" disabled>
          Request / matching comes in a later lane
        </button>
      )}

      <p className="privacy-note">
        Public profile only. Contact details and exact address stay hidden before match.
      </p>
    </aside>
  );
}
