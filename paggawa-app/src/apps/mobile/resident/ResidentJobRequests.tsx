import { JobPreviewCard } from "../../../shared/components/JobPreviewCard";
import type {
  JobResponse,
  JobRequest,
  Match,
  Review,
  WorkerProfile,
} from "../../../shared/domain/models";
import {
  getMatchForJob,
  getWorkerById,
  type CompleteMatchedJobInput,
} from "../../../shared/state/prototypeState";
import { JobResponsesPanel } from "./JobResponsesPanel";
import { MatchedJobView } from "./MatchedJobView";

type ResidentJobRequestsProps = {
  jobs: JobRequest[];
  jobResponses: JobResponse[];
  matches: Match[];
  onAcceptWorkerResponse: (responseId: string) => Match | undefined;
  onCompleteMatchedJob: (input: CompleteMatchedJobInput) => Review | undefined;
  reviews: Review[];
  workerProfiles: WorkerProfile[];
};

export function ResidentJobRequests({
  jobs,
  jobResponses,
  matches,
  onAcceptWorkerResponse,
  onCompleteMatchedJob,
  reviews,
  workerProfiles,
}: ResidentJobRequestsProps) {
  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">My requests</p>
        <h2>Resident job requests</h2>
      </div>

      {jobs.length > 0 ? (
        <div className="request-flow-list">
          {jobs.map((job) => {
            const match = getMatchForJob(job.id, matches);
            const matchedWorker = match
              ? getWorkerById(match.workerProfileId, workerProfiles)
              : undefined;
            const review = match
              ? reviews.find((currentReview) => currentReview.matchId === match.id)
              : undefined;

            return (
              <div className="request-flow-item" key={job.id}>
                <JobPreviewCard
                  job={job}
                  showBudget
                  showSource
                  showRequesterType
                />
                <JobResponsesPanel
                  job={job}
                  jobResponses={jobResponses}
                  matches={matches}
                  onAcceptWorkerResponse={onAcceptWorkerResponse}
                  workerProfiles={workerProfiles}
                />
                {match && (
                  <MatchedJobView
                    job={job}
                    match={match}
                    onCompleteMatchedJob={onCompleteMatchedJob}
                    review={review}
                    worker={matchedWorker}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="empty-state">No resident requests yet.</p>
      )}
    </section>
  );
}
