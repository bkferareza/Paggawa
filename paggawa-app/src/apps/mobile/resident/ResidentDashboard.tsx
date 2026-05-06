import { useState } from "react";
import { StatCard } from "../../../shared/components/StatCard";
import type { JobRequest, WorkerProfile } from "../../../shared/domain/models";
import {
  CURRENT_RESIDENT_USER_ID,
  getResidentJobRequests,
  getResidentPreviewWorkers,
  type CreateJobRequestInput,
} from "../../../shared/state/prototypeState";
import { CreateJobRequestForm } from "./CreateJobRequestForm";
import { NearbyWorkersView } from "./NearbyWorkersView";
import { ResidentJobRequests } from "./ResidentJobRequests";

type ResidentDashboardProps = {
  jobRequests: JobRequest[];
  onCreateJobRequest: (input: CreateJobRequestInput) => JobRequest;
  openJobRequests: JobRequest[];
  workerProfiles: WorkerProfile[];
};

export function ResidentDashboard({
  jobRequests,
  onCreateJobRequest,
  openJobRequests,
  workerProfiles,
}: ResidentDashboardProps) {
  const [lastCreatedJob, setLastCreatedJob] = useState<JobRequest | null>(null);
  const nearbyWorkers = getResidentPreviewWorkers(workerProfiles);
  const residentJobs = getResidentJobRequests(CURRENT_RESIDENT_USER_ID, jobRequests);

  return (
    <div className="dashboard-stack">
      <div className="stat-grid">
        <StatCard
          label="My requests"
          value={residentJobs.length}
          detail="Open and local-only"
          tone="blue"
        />
        <StatCard
          label="Nearby workers"
          value={nearbyWorkers.length}
          detail="Barangay-scale preview"
          tone="green"
        />
        <StatCard
          label="Open job requests"
          value={openJobRequests.length}
          detail="Visible with approximate area only"
          tone="amber"
        />
      </div>

      <CreateJobRequestForm
        onCreateJobRequest={onCreateJobRequest}
        onCreated={setLastCreatedJob}
      />

      {lastCreatedJob && (
        <p className="form-status" role="status">
          Created open request: {lastCreatedJob.title}
        </p>
      )}

      <ResidentJobRequests jobs={residentJobs} />

      <NearbyWorkersView workerProfiles={workerProfiles} />
    </div>
  );
}
