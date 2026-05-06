import { useState } from "react";
import { ShellHeader } from "../../shared/components/ShellHeader";
import { ResidentDashboard } from "./resident/ResidentDashboard";
import { WorkerDashboard } from "./worker/WorkerDashboard";
import type { JobRequest, WorkerProfile } from "../../shared/domain/models";
import type {
  CreateJobRequestInput,
  MobileMode,
} from "../../shared/state/prototypeState";

type MobileShellProps = {
  jobRequests: JobRequest[];
  onBack: () => void;
  onCreateJobRequest: (input: CreateJobRequestInput) => JobRequest;
  openJobRequests: JobRequest[];
  workerProfiles: WorkerProfile[];
};

export function MobileShell({
  jobRequests,
  onBack,
  onCreateJobRequest,
  openJobRequests,
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
          jobRequests={jobRequests}
          onCreateJobRequest={onCreateJobRequest}
          openJobRequests={openJobRequests}
          workerProfiles={workerProfiles}
        />
      ) : (
        <WorkerDashboard
          openJobRequests={openJobRequests}
          workerProfiles={workerProfiles}
        />
      )}
    </section>
  );
}
