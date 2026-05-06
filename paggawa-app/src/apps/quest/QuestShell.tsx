import { ShellHeader } from "../../shared/components/ShellHeader";
import type {
  ComplaintNote,
  JobRequest,
  QuestManageableJobStatus,
  WorkerProfile,
} from "../../shared/domain/models";
import type {
  CreateBarangayNoteInput,
  CreateJobRequestInput,
  CreateWorkerProfileInput,
} from "../../shared/state/prototypeState";
import { BarangayDashboard } from "./barangay/BarangayDashboard";

type QuestShellProps = {
  barangayNotes: ComplaintNote[];
  jobRequests: JobRequest[];
  onBack: () => void;
  onCreateBarangayNote: (input: CreateBarangayNoteInput) => ComplaintNote;
  onCreateJobRequest: (input: CreateJobRequestInput) => JobRequest;
  onCreateWorkerProfile: (input: CreateWorkerProfileInput) => WorkerProfile;
  onUpdateQuestJobStatus: (
    jobId: string,
    status: QuestManageableJobStatus,
  ) => void;
  workerProfiles: WorkerProfile[];
};

export function QuestShell({
  barangayNotes,
  jobRequests,
  onBack,
  onCreateBarangayNote,
  onCreateJobRequest,
  onCreateWorkerProfile,
  onUpdateQuestJobStatus,
  workerProfiles,
}: QuestShellProps) {
  return (
    <section className="surface-page quest-page">
      <ShellHeader
        eyebrow="Paggawa Quest"
        title="Barangay hall workspace"
        description="Assisted requests and quest-board-ready jobs share the local store."
        onBack={onBack}
      />
      <BarangayDashboard
        barangayNotes={barangayNotes}
        jobRequests={jobRequests}
        onCreateBarangayNote={onCreateBarangayNote}
        onCreateJobRequest={onCreateJobRequest}
        onCreateWorkerProfile={onCreateWorkerProfile}
        onUpdateQuestJobStatus={onUpdateQuestJobStatus}
        workerProfiles={workerProfiles}
      />
    </section>
  );
}
