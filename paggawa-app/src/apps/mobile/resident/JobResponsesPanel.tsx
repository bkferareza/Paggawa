import { ResponseCard } from "../../../shared/components/ResponseCard";
import type {
  JobResponse,
  JobRequest,
  Match,
  WorkerProfile,
} from "../../../shared/domain/models";
import {
  getMatchForJob,
  getResponsesForJob,
  getWorkerById,
} from "../../../shared/state/prototypeState";

type JobResponsesPanelProps = {
  job: JobRequest;
  jobResponses: JobResponse[];
  matches: Match[];
  onAcceptWorkerResponse: (responseId: string) => Match | undefined;
  workerProfiles: WorkerProfile[];
};

export function JobResponsesPanel({
  job,
  jobResponses,
  matches,
  onAcceptWorkerResponse,
  workerProfiles,
}: JobResponsesPanelProps) {
  const responses = getResponsesForJob(job.id, jobResponses);
  const match = getMatchForJob(job.id, matches);

  return (
    <section className="response-panel" aria-label={`Worker responses for ${job.title}`}>
      <div className="section-heading">
        <p className="eyebrow">Worker responses</p>
        <h2>{responses.length} response{responses.length === 1 ? "" : "s"}</h2>
      </div>

      {responses.length > 0 ? (
        <div className="response-list">
          {responses.map((response) => {
            const worker = getWorkerById(response.workerProfileId, workerProfiles);
            const canAccept =
              !match && job.status === "open" && response.status === "sent";

            return (
              <ResponseCard
                key={response.id}
                canAccept={canAccept}
                onAccept={() => onAcceptWorkerResponse(response.id)}
                response={response}
                worker={worker}
              />
            );
          })}
        </div>
      ) : (
        <p className="empty-state">No worker responses yet.</p>
      )}

      {responses.length > 0 && !match && job.status === "open" && (
        <p className="privacy-note">
          Accepting one response creates the match and marks other responses for this
          job as rejected in the prototype.
        </p>
      )}
    </section>
  );
}
