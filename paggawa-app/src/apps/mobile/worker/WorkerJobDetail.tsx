import { useState } from "react";
import type {
  JobResponse,
  JobRequest,
  WorkerProfile,
} from "../../../shared/domain/models";
import type { CreateJobResponseInput } from "../../../shared/state/prototypeState";
import {
  formatBudgetRange,
  formatDistance,
  formatEstimatedPrice,
  formatJobResponseStatus,
  formatJobSource,
  formatJobStatus,
  formatUrgency,
} from "../../../shared/utils/formatting";
import { JobResponseForm } from "./JobResponseForm";

type WorkerJobDetailProps = {
  existingResponse?: JobResponse;
  job: JobRequest;
  onCreateJobResponse: (input: CreateJobResponseInput) => JobResponse;
  worker: WorkerProfile;
};

export function WorkerJobDetail({
  existingResponse,
  job,
  onCreateJobResponse,
  worker,
}: WorkerJobDetailProps) {
  const [lastResponse, setLastResponse] = useState<JobResponse | null>(null);
  const visibleResponse = lastResponse ?? existingResponse;

  return (
    <aside className="worker-job-detail" aria-label={`Safe details for ${job.title}`}>
      <div className="section-heading">
        <p className="eyebrow">Safe job details</p>
        <h2>{job.title}</h2>
      </div>

      <p>{job.description}</p>

      <dl className="detail-list">
        <div>
          <dt>Category</dt>
          <dd>{job.category}</dd>
        </div>
        <div>
          <dt>Approximate area</dt>
          <dd>{job.areaLabel}</dd>
        </div>
        <div>
          <dt>Distance</dt>
          <dd>{formatDistance(job.approximateDistanceKm)}</dd>
        </div>
        <div>
          <dt>Urgency</dt>
          <dd>{formatUrgency(job.urgency)}</dd>
        </div>
        <div>
          <dt>Budget</dt>
          <dd>{formatBudgetRange(job)}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{formatJobSource(job.source)}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{formatJobStatus(job.status)}</dd>
        </div>
      </dl>

      {visibleResponse ? (
        <div className="sent-response-panel">
          <div className="card-row">
            <strong>Your response</strong>
            <span className="status-pill">
              {formatJobResponseStatus(visibleResponse.status)}
            </span>
          </div>
          <p>{visibleResponse.message}</p>
          <dl className="detail-list">
            <div>
              <dt>Availability</dt>
              <dd>{visibleResponse.availability}</dd>
            </div>
            <div>
              <dt>Estimated price</dt>
              <dd>{formatEstimatedPrice(visibleResponse.estimatedPrice)}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <JobResponseForm
          job={job}
          onCreateJobResponse={onCreateJobResponse}
          onCreated={setLastResponse}
          worker={worker}
        />
      )}

      <p className="privacy-note">
        Exact address and private contact details stay hidden before confirmed match.
      </p>
    </aside>
  );
}
