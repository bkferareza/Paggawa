import type { JobResponse, WorkerProfile } from "../domain/models";
import { getWorkerTrustSignals } from "../state/prototypeState";
import {
  formatEstimatedPrice,
  formatJobResponseStatus,
} from "../utils/formatting";
import { SkillBadge } from "./SkillBadge";
import { TrustSignalBadge } from "./TrustSignalBadge";

type ResponseCardProps = {
  canAccept?: boolean;
  onAccept?: (response: JobResponse) => void;
  response: JobResponse;
  worker?: WorkerProfile;
};

export function ResponseCard({
  canAccept = false,
  onAccept,
  response,
  worker,
}: ResponseCardProps) {
  return (
    <article className="response-card">
      <div className="card-row">
        <span className="category-pill">
          {worker?.displayName ?? "Worker profile unavailable"}
        </span>
        <span className="status-pill">{formatJobResponseStatus(response.status)}</span>
      </div>

      {worker && (
        <div className="skill-list" aria-label={`${worker.displayName} skills`}>
          {worker.skillCategories.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      )}

      <p className="response-message">{response.message}</p>

      <dl className="detail-list">
        <div>
          <dt>Availability</dt>
          <dd>{response.availability}</dd>
        </div>
        <div>
          <dt>Estimated price</dt>
          <dd>{formatEstimatedPrice(response.estimatedPrice)}</dd>
        </div>
        {worker && (
          <>
            <div>
              <dt>Completed jobs</dt>
              <dd>{worker.completedJobs}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>
                {typeof worker.rating === "number"
                  ? `${worker.rating.toFixed(1)} rating`
                  : "No rating yet"}
              </dd>
            </div>
          </>
        )}
      </dl>

      {worker && (
        <div className="trust-list" aria-label={`${worker.displayName} trust signals`}>
          {getWorkerTrustSignals(worker).map((signal) => (
            <TrustSignalBadge key={signal} label={signal} />
          ))}
        </div>
      )}

      {canAccept && onAccept && (
        <button
          type="button"
          className="primary-button"
          onClick={() => onAccept(response)}
        >
          Accept worker
        </button>
      )}
    </article>
  );
}
