import { useState } from "react";
import { StatCard } from "../../../shared/components/StatCard";
import type {
  ComplaintNote,
  JobRequest,
  QuestManageableJobStatus,
  WorkerProfile,
} from "../../../shared/domain/models";
import {
  getAssistedRequests,
  getOpenJobRequests,
  getQuestBoardJobs,
  getRegisteredWorkers,
  getWorkerRegistryWorkers,
  type CreateBarangayNoteInput,
  type CreateJobRequestInput,
  type CreateWorkerProfileInput,
} from "../../../shared/state/prototypeState";
import { AssistedJobRequestForm } from "./AssistedJobRequestForm";
import { QuestBoardView } from "./QuestBoardView";
import { WorkerRegistryPreview } from "./WorkerRegistryPreview";
import { WorkerRegistrationForm } from "./WorkerRegistrationForm";

type BarangayDashboardProps = {
  barangayNotes: ComplaintNote[];
  jobRequests: JobRequest[];
  onCreateBarangayNote: (input: CreateBarangayNoteInput) => ComplaintNote;
  onCreateJobRequest: (input: CreateJobRequestInput) => JobRequest;
  onCreateWorkerProfile: (input: CreateWorkerProfileInput) => WorkerProfile;
  onUpdateQuestJobStatus: (
    jobId: string,
    status: QuestManageableJobStatus,
  ) => void;
  workerProfiles: WorkerProfile[];
};

export function BarangayDashboard({
  barangayNotes,
  jobRequests,
  onCreateBarangayNote,
  onCreateJobRequest,
  onCreateWorkerProfile,
  onUpdateQuestJobStatus,
  workerProfiles,
}: BarangayDashboardProps) {
  const [lastCreatedJob, setLastCreatedJob] = useState<JobRequest | null>(null);
  const [lastCreatedWorker, setLastCreatedWorker] =
    useState<WorkerProfile | null>(null);
  const questBoardJobs = getOpenJobRequests(jobRequests);
  const allQuestBoardJobs = getQuestBoardJobs(jobRequests);
  const registeredWorkers = getRegisteredWorkers(workerProfiles);
  const workerRegistry = getWorkerRegistryWorkers(workerProfiles);
  const assistedRequests = getAssistedRequests(jobRequests);

  return (
    <div className="dashboard-stack quest-grid">
      <div className="stat-grid">
        <StatCard
          label="Quest board"
          value={questBoardJobs.length}
          detail="Open local requests"
          tone="amber"
        />
        <StatCard
          label="Registered workers"
          value={registeredWorkers.length}
          detail="Local registry preview"
          tone="green"
        />
        <StatCard
          label="Assisted requests"
          value={assistedRequests.length}
          detail="Created through barangay help"
          tone="red"
        />
      </div>

      <AssistedJobRequestForm
        onCreateJobRequest={onCreateJobRequest}
        onCreated={setLastCreatedJob}
      />

      {lastCreatedJob && (
        <p className="form-status" role="status">
          Created assisted request: {lastCreatedJob.title}
        </p>
      )}

      <QuestBoardView
        jobs={allQuestBoardJobs}
        notes={barangayNotes}
        onCreateBarangayNote={onCreateBarangayNote}
        onUpdateQuestJobStatus={onUpdateQuestJobStatus}
      />

      <WorkerRegistrationForm
        onCreateWorkerProfile={onCreateWorkerProfile}
        onCreated={setLastCreatedWorker}
      />

      {lastCreatedWorker && (
        <p className="form-status" role="status">
          Registered worker: {lastCreatedWorker.displayName}
        </p>
      )}

      <WorkerRegistryPreview
        notes={barangayNotes}
        onCreateBarangayNote={onCreateBarangayNote}
        workers={workerRegistry}
      />
    </div>
  );
}
