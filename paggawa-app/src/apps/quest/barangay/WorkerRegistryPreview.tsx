import { SkillBadge } from "../../../shared/components/SkillBadge";
import { TrustSignalBadge } from "../../../shared/components/TrustSignalBadge";
import type { ComplaintNote, WorkerProfile } from "../../../shared/domain/models";
import type { CreateBarangayNoteInput } from "../../../shared/state/prototypeState";
import { getWorkerTrustSignals } from "../../../shared/state/prototypeState";
import {
  formatDistance,
  formatExperience,
  formatRating,
  formatReferralCount,
  formatReviewCount,
  formatServiceRadius,
} from "../../../shared/utils/formatting";
import { BarangayNotesPanel } from "./BarangayNotesPanel";

type WorkerRegistryPreviewProps = {
  notes: ComplaintNote[];
  onCreateBarangayNote: (input: CreateBarangayNoteInput) => ComplaintNote;
  workers: WorkerProfile[];
};

export function WorkerRegistryPreview({
  notes,
  onCreateBarangayNote,
  workers,
}: WorkerRegistryPreviewProps) {
  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">Worker registry</p>
        <h2>Registered worker visibility</h2>
      </div>

      <div className="registry-list">
        {workers.map((worker) => (
          <article className="registry-row" key={worker.id}>
            <div className="registry-header">
              <div>
                <span className="status-pill">
                  {worker.barangayRegistered
                    ? "Barangay-registered"
                    : "Community-referred"}
                </span>
                <h3>{worker.displayName}</h3>
                <p>{worker.headline}</p>
              </div>
              <span className="category-pill">{worker.primaryCategory}</span>
            </div>

            <div className="skill-list" aria-label={`${worker.displayName} skills`}>
              {worker.skillCategories.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>

            <p className="registry-bio">{worker.bio}</p>

            <dl className="registry-metrics">
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

            <div className="trust-list" aria-label={`${worker.displayName} trust signals`}>
              {getWorkerTrustSignals(worker).map((signal) => (
                <TrustSignalBadge key={signal} label={signal} />
              ))}
            </div>

            <p className="availability-note">{worker.availabilityNote}</p>

            <BarangayNotesPanel
              notes={notes}
              targetId={worker.id}
              targetLabel={worker.displayName}
              targetType="worker"
              onCreateBarangayNote={onCreateBarangayNote}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
