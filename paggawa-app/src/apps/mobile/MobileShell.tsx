import { useState } from "react";
import { ShellHeader } from "../../shared/components/ShellHeader";
import { ResidentDashboard } from "./resident/ResidentDashboard";
import { WorkerDashboard } from "./worker/WorkerDashboard";
import type {
  JobResponse,
  JobRequest,
  Match,
  Review,
  WorkerProfile,
} from "../../shared/domain/models";
import type {
  CompleteMatchedJobInput,
  CreateJobResponseInput,
  CreateJobRequestInput,
  MobileMode,
} from "../../shared/state/prototypeState";

type MobileShellProps = {
  jobResponses: JobResponse[];
  jobRequests: JobRequest[];
  matches: Match[];
  onBack: () => void;
  onAcceptWorkerResponse: (responseId: string) => Match | undefined;
  onCompleteMatchedJob: (input: CompleteMatchedJobInput) => Review | undefined;
  onCreateJobRequest: (input: CreateJobRequestInput) => JobRequest;
  onCreateJobResponse: (input: CreateJobResponseInput) => JobResponse;
  openJobRequests: JobRequest[];
  reviews: Review[];
  workerProfiles: WorkerProfile[];
};

export function MobileShell({
  jobResponses,
  jobRequests,
  matches,
  onBack,
  onAcceptWorkerResponse,
  onCompleteMatchedJob,
  onCreateJobRequest,
  onCreateJobResponse,
  openJobRequests,
  reviews,
  workerProfiles,
}: MobileShellProps) {
  const [mode, setMode] = useState<MobileMode>("resident");

  return (
    <section className="surface-page mobile-page">
      <ShellHeader
        eyebrow="Paggawa Mobile"
        title="Phone-first demo surface"
        description="Resident and worker dashboards share the same local job request list."
        onBack={onBack}
      />

      <div className="segmented-control" role="tablist" aria-label="Mobile view">
        <button
          type="button"
          className={mode === "resident" ? "active" : ""}
          onClick={() => setMode("resident")}
          aria-selected={mode === "resident"}
        >
          Resident
        </button>
        <button
          type="button"
          className={mode === "worker" ? "active" : ""}
          onClick={() => setMode("worker")}
          aria-selected={mode === "worker"}
        >
          Worker
        </button>
      </div>

      {mode === "resident" ? (
        <ResidentDashboard
          jobResponses={jobResponses}
          jobRequests={jobRequests}
          matches={matches}
          onAcceptWorkerResponse={onAcceptWorkerResponse}
          onCompleteMatchedJob={onCompleteMatchedJob}
          onCreateJobRequest={onCreateJobRequest}
          openJobRequests={openJobRequests}
          reviews={reviews}
          workerProfiles={workerProfiles}
        />
      ) : (
        <WorkerDashboard
          jobRequests={jobRequests}
          jobResponses={jobResponses}
          matches={matches}
          onCreateJobResponse={onCreateJobResponse}
          openJobRequests={openJobRequests}
          workerProfiles={workerProfiles}
        />
      )}
    </section>
  );
}
