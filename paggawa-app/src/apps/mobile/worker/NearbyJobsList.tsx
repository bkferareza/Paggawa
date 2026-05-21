import { useMemo, useState } from "react";
import { JobPreviewCard } from "../../../shared/components/JobPreviewCard";
import type {
  JobResponse,
  JobRequest,
  WorkerProfile,
} from "../../../shared/domain/models";
import {
  getResponseByWorkerForJob,
  type CreateJobResponseInput,
} from "../../../shared/state/prototypeState";
import { WorkerJobDetail } from "./WorkerJobDetail";

type NearbyJobsListProps = {
  jobResponses: JobResponse[];
  jobs: JobRequest[];
  onCreateJobResponse: (input: CreateJobResponseInput) => JobResponse;
  worker: WorkerProfile;
};

export function NearbyJobsList({
  jobResponses,
  jobs,
  onCreateJobResponse,
  worker,
}: NearbyJobsListProps) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) ?? jobs[0] ?? null;
  const existingResponse = useMemo(
    () =>
      selectedJob
        ? getResponseByWorkerForJob(worker.id, selectedJob.id, jobResponses)
        : undefined,
    [jobResponses, selectedJob, worker.id],
  );

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">Available work</p>
        <h2>Nearby open jobs</h2>
      </div>

      {jobs.length > 0 ? (
        <div className="worker-job-layout">
          <div className="card-grid">
            {jobs.map((job) => (
              <JobPreviewCard
                key={job.id}
                job={job}
                onSelect={() => setSelectedJobId(job.id)}
                selectLabel="View details"
                selected={selectedJob?.id === job.id}
                showBudget
                showRequesterType
                showSource
              />
            ))}
          </div>

          {selectedJob && (
            <WorkerJobDetail
              key={selectedJob.id}
              existingResponse={existingResponse}
              job={selectedJob}
              onCreateJobResponse={onCreateJobResponse}
              worker={worker}
            />
          )}
        </div>
      ) : (
        <p className="empty-state">No open nearby jobs.</p>
      )}
    </section>
  );
}
