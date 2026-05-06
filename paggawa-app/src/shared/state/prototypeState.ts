import { barangays, jobRequests, users, workerProfiles } from "../data/seedData";
import type { JobRequest, User, WorkerProfile } from "../domain/models";

export type SurfaceKey = "mobile" | "quest";
export type MobileMode = "resident" | "worker";

export type ShellSummary = {
  totalWorkers: number;
  totalOpenJobs: number;
  registeredWorkers: number;
  assistedRequests: number;
};

export const privacyDisplayRules = [
  "Approximate location only",
  "No contact details in previews",
  "No exact address before match",
];

export const laneOneValidationRules = [
  "Surface selector is visible",
  "Paggawa Mobile can switch Resident and Worker dashboards",
  "Paggawa Quest barangay dashboard is visible",
  "Shared mock data appears in both surfaces",
  "No creation, matching, payment, GPS, chat, backend, or auth behavior exists",
];

export const prototypeData = {
  barangays,
  users,
  workerProfiles,
  jobRequests,
};

export function getShellSummary(): ShellSummary {
  return {
    totalWorkers: workerProfiles.length,
    totalOpenJobs: getOpenJobRequests().length,
    registeredWorkers: getRegisteredWorkers().length,
    assistedRequests: getAssistedRequests().length,
  };
}

export function getOpenJobRequests(): JobRequest[] {
  return jobRequests.filter((job) => job.status === "open");
}

export function getResidentPreviewWorkers(): WorkerProfile[] {
  return workerProfiles.filter((worker) => worker.approximateDistanceKm <= 3.2);
}

export function getRegisteredWorkers(): WorkerProfile[] {
  return workerProfiles.filter((worker) => worker.registryStatus === "registered");
}

export function getAssistedRequests(): JobRequest[] {
  return jobRequests.filter((job) => job.requesterType === "barangay_assisted");
}

export function getWorkerDashboardProfile(): WorkerProfile {
  return workerProfiles[0];
}

export function getUserById(userId: string): User | undefined {
  return users.find((user) => user.id === userId);
}

export function hasLaneOnePublicPreviewFields(job: JobRequest): boolean {
  return Boolean(
    job.areaLabel &&
      typeof job.approximateDistanceKm === "number" &&
      job.privacyNote,
  );
}
