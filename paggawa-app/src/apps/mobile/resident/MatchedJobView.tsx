import { useState, type FormEvent } from "react";
import { MatchStatusBadge } from "../../../shared/components/MatchStatusBadge";
import type {
  JobRequest,
  Match,
  Review,
  WorkerProfile,
} from "../../../shared/domain/models";
import type { CompleteMatchedJobInput } from "../../../shared/state/prototypeState";
import { formatCreatedDate } from "../../../shared/utils/formatting";

type MatchedJobViewProps = {
  job: JobRequest;
  match: Match;
  onCompleteMatchedJob: (input: CompleteMatchedJobInput) => Review | undefined;
  review?: Review;
  worker?: WorkerProfile;
};

export function MatchedJobView({
  job,
  match,
  onCompleteMatchedJob,
  review,
  worker,
}: MatchedJobViewProps) {
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");
  const isCompleted = match.status === "completed";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!comment.trim()) {
      setFormError("A short review is required.");
      return;
    }

    const parsedRating = Number(rating);

    if (!Number.isFinite(parsedRating)) {
      setFormError("Select a rating from 1 to 5.");
      return;
    }

    const completedReview = onCompleteMatchedJob({
      matchId: match.id,
      rating: parsedRating,
      comment,
    });

    if (!completedReview) {
      setFormError("Only active matched work can be completed.");
      return;
    }

    setFormError("");
    setComment("");
  }

  return (
    <section
      className="matched-job-panel"
      aria-label={`Matched job details for ${job.title}`}
    >
      <div className="card-row">
        <div className="section-heading">
          <p className="eyebrow">Confirmed match</p>
          <h2>{worker?.displayName ?? "Matched worker"}</h2>
        </div>
        <MatchStatusBadge status={match.status} />
      </div>

      <dl className="detail-list">
        <div>
          <dt>Job</dt>
          <dd>{job.title}</dd>
        </div>
        <div>
          <dt>Approximate area</dt>
          <dd>{job.areaLabel}</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>{formatCreatedDate(match.createdAt)}</dd>
        </div>
      </dl>

      <p className="coordination-note">
        Coordination details unlocked after match. Resident and worker may now
        coordinate schedule and exact location outside this prototype.
      </p>

      {review ? (
        <div className="review-summary" aria-label="Resident review">
          <div className="card-row">
            <strong>Resident review</strong>
            <span className="status-pill">{review.rating}/5 rating</span>
          </div>
          <p>{review.comment}</p>
          <time dateTime={review.createdAt}>
            Completed {formatCreatedDate(review.createdAt)}
          </time>
        </div>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="section-heading">
            <p className="eyebrow">Completion review</p>
            <h2>Mark work completed</h2>
          </div>

          <div className="form-grid">
            <label className="form-field">
              <span>Rating</span>
              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                disabled={isCompleted}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Fair</option>
                <option value="2">2 - Needs improvement</option>
                <option value="1">1 - Poor</option>
              </select>
            </label>

            <label className="form-field form-field-wide">
              <span>Review</span>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Work was completed and the schedule was clear."
                rows={3}
                required
                disabled={isCompleted}
              />
            </label>
          </div>

          {formError && (
            <p className="form-error compact-error" role="alert">
              {formError}
            </p>
          )}

          <button type="submit" className="primary-button" disabled={isCompleted}>
            Mark completed and save review
          </button>
        </form>
      )}
    </section>
  );
}
