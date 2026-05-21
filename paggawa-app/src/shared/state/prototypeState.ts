import { useCallback, useEffect, useMemo, useState } from "react";
import {
  barangays,
  jobRequests as seedJobRequests,
  users,
  workerProfiles as seedWorkerProfiles,
} from "../data/seedData";
import type {
  ComplaintNote,
  JobResponse,
  JobRequest,
  JobSource,
  JobUrgency,
  Match,
  QuestManageableJobStatus,
  Review,
  RequesterType,
  SkillCategory,
  TrustSignal,
  User,
  WorkerProfile,
} from "../domain/models";

export type SurfaceKey = "mobile" | "quest";
export type MobileMode = "resident" | "worker";

export const CURRENT_RESIDENT_USER_ID = "user-resident-ana";
export const CURRENT_BARANGAY_STAFF_USER_ID = "user-staff-rosa";
export const CURRENT_WORKER_PROFILE_ID = "worker-profile-joel";

const CREATED_JOB_REQUESTS_STORAGE_KEY = "paggawa.lane02.createdJobRequests";
const CREATED_WORKER_PROFILES_STORAGE_KEY =
  "paggawa.lane04.createdWorkerProfiles";
const JOB_STATUS_UPDATES_STORAGE_KEY = "paggawa.lane04.jobStatusUpdates";
const BARANGAY_NOTES_STORAGE_KEY = "paggawa.lane04.barangayNotes";
const JOB_RESPONSES_STORAGE_KEY = "paggawa.lane05.jobResponses";
const MATCHES_STORAGE_KEY = "paggawa.lane05.matches";
const REVIEWS_STORAGE_KEY = "paggawa.lane06.reviews";

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

export const laneTwoValidationRules = [
  "Resident can create a mobile job request",
  "Barangay staff can create an assisted job request",
  "Created job requests persist with LocalStorage",
  "Worker and Quest previews show approximate discovery fields only",
  "No response, matching, payment, GPS, chat, backend, or auth behavior exists",
];

export const laneThreeValidationRules = [
  "Resident can browse nearby worker cards",
  "Resident can filter workers by skill category",
  "Resident can view a safe public worker profile",
  "Worker dashboard shows a display-only own profile summary",
  "Barangay staff can view a read-only worker registry preview",
  "No response, matching, contact unlock, reputation mutation, backend, auth, GPS, map, chat, or payment behavior exists",
];

export const laneFourValidationRules = [
  "Quest board shows mobile and barangay-assisted job requests",
  "Barangay staff can filter quest board jobs by status, category, and source",
  "Barangay staff can update only open, needs follow-up, or cancelled statuses",
  "Barangay staff can register workers into the shared local registry",
  "Barangay notes persist locally without full dispute workflow behavior",
];

export const laneFiveValidationRules = [
  "Worker can respond to an open job request",
  "Resident can review worker responses for their own requests",
  "Resident can accept one worker response and create an active match",
  "Matched jobs leave the open queue and show matched status in Quest",
  "Coordination details use a safe post-match placeholder only",
];

export const laneSixValidationRules = [
  "Resident can mark active matched work as completed",
  "Resident can leave one rating and review per match",
  "Completed work updates the worker completed-jobs count",
  "Worker rating and reviews are derived from the shared local review store",
];

export const prototypeData = {
  barangays,
  users,
  workerProfiles: seedWorkerProfiles,
  jobRequests: seedJobRequests,
};

export type CreateJobRequestInput = {
  title: string;
  category: SkillCategory;
  description: string;
  areaLabel: string;
  urgency: JobUrgency;
  source: JobSource;
  requesterType: RequesterType;
  budgetMin?: number;
  budgetMax?: number;
  createdByUserId?: string;
  assistedByBarangayStaffId?: string;
  assistedResidentLabel?: string;
};

export type CreateWorkerProfileInput = {
  displayName: string;
  skillCategories: SkillCategory[];
  serviceAreas: string[];
  approximateLocationLabel: string;
  experienceYears: number;
  bio: string;
  availabilityNote: string;
  barangayRegistered: boolean;
  identityChecked: boolean;
  communityReferred: boolean;
};

export type CreateBarangayNoteInput = {
  targetType: ComplaintNote["targetType"];
  targetId: string;
  note: string;
  createdBy?: string;
};

export type CreateJobResponseInput = {
  jobRequestId: string;
  workerProfileId: string;
  message: string;
  estimatedPrice?: number;
  availability: string;
};

export type CompleteMatchedJobInput = {
  matchId: string;
  rating: number;
  comment: string;
  residentUserId?: string;
};

export type PrototypeState = {
  shellSummary: ShellSummary;
  jobRequests: JobRequest[];
  openJobRequests: JobRequest[];
  createdJobRequests: JobRequest[];
  workerProfiles: WorkerProfile[];
  createdWorkerProfiles: WorkerProfile[];
  jobResponses: JobResponse[];
  matches: Match[];
  reviews: Review[];
  barangayNotes: ComplaintNote[];
  createJobRequest: (input: CreateJobRequestInput) => JobRequest;
  createWorkerProfile: (input: CreateWorkerProfileInput) => WorkerProfile;
  createJobResponse: (input: CreateJobResponseInput) => JobResponse;
  acceptWorkerResponse: (responseId: string) => Match | undefined;
  completeMatchedJob: (input: CompleteMatchedJobInput) => Review | undefined;
  updateQuestJobStatus: (
    jobId: string,
    status: QuestManageableJobStatus,
  ) => void;
  createBarangayNote: (input: CreateBarangayNoteInput) => ComplaintNote;
};

export function usePrototypeState(): PrototypeState {
  const [createdJobRequests, setCreatedJobRequests] = useState<JobRequest[]>(
    loadCreatedJobRequests,
  );
  const [createdWorkerProfiles, setCreatedWorkerProfiles] = useState<
    WorkerProfile[]
  >(loadCreatedWorkerProfiles);
  const [jobStatusUpdates, setJobStatusUpdates] = useState<
    Record<string, QuestManageableJobStatus>
  >(loadJobStatusUpdates);
  const [jobResponses, setJobResponses] =
    useState<JobResponse[]>(loadJobResponses);
  const [matches, setMatches] = useState<Match[]>(loadMatches);
  const [reviews, setReviews] = useState<Review[]>(loadReviews);
  const [barangayNotes, setBarangayNotes] =
    useState<ComplaintNote[]>(loadBarangayNotes);

  useEffect(() => {
    persistCreatedJobRequests(createdJobRequests);
  }, [createdJobRequests]);

  useEffect(() => {
    persistCreatedWorkerProfiles(createdWorkerProfiles);
  }, [createdWorkerProfiles]);

  useEffect(() => {
    persistJobStatusUpdates(jobStatusUpdates);
  }, [jobStatusUpdates]);

  useEffect(() => {
    persistJobResponses(jobResponses);
  }, [jobResponses]);

  useEffect(() => {
    persistMatches(matches);
  }, [matches]);

  useEffect(() => {
    persistReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    persistBarangayNotes(barangayNotes);
  }, [barangayNotes]);

  const allWorkerProfiles = useMemo(
    () => applyWorkerReputation([...seedWorkerProfiles, ...createdWorkerProfiles], reviews),
    [createdWorkerProfiles, reviews],
  );

  const allJobRequests = useMemo(
    () =>
      applyJobStatusUpdates(
        [...seedJobRequests, ...createdJobRequests],
        jobStatusUpdates,
        matches,
      ),
    [createdJobRequests, jobStatusUpdates, matches],
  );

  const openJobRequests = useMemo(
    () => getOpenJobRequests(allJobRequests),
    [allJobRequests],
  );

  const shellSummary = useMemo(
    () => getShellSummary(allJobRequests, allWorkerProfiles),
    [allJobRequests, allWorkerProfiles],
  );

  const createJobRequest = useCallback((input: CreateJobRequestInput) => {
    const newJob = buildJobRequest(input);

    setCreatedJobRequests((currentJobs) => [newJob, ...currentJobs]);

    return newJob;
  }, []);

  const createWorkerProfile = useCallback((input: CreateWorkerProfileInput) => {
    const newWorker = buildWorkerProfile(input);

    setCreatedWorkerProfiles((currentWorkers) => [newWorker, ...currentWorkers]);

    return newWorker;
  }, []);

  const updateQuestJobStatus = useCallback(
    (jobId: string, status: QuestManageableJobStatus) => {
      setJobStatusUpdates((currentUpdates) => ({
        ...currentUpdates,
        [jobId]: status,
      }));
    },
    [],
  );

  const createJobResponse = useCallback((input: CreateJobResponseInput) => {
    const newResponse = buildJobResponse(input);

    setJobResponses((currentResponses) => [newResponse, ...currentResponses]);

    return newResponse;
  }, []);

  const acceptWorkerResponse = useCallback(
    (responseId: string) => {
      const acceptedResponse = jobResponses.find(
        (response) => response.id === responseId,
      );

      if (!acceptedResponse) {
        return undefined;
      }

      const newMatch = buildMatch(acceptedResponse);

      setJobResponses((currentResponses) =>
        currentResponses.map((response) => {
          if (response.jobRequestId !== acceptedResponse.jobRequestId) {
            return response;
          }

          return {
            ...response,
            status: response.id === responseId ? "accepted" : "rejected",
          };
        }),
      );

      setMatches((currentMatches) => [
        newMatch,
        ...currentMatches.filter(
          (match) => match.jobRequestId !== acceptedResponse.jobRequestId,
        ),
      ]);

      return newMatch;
    },
    [jobResponses],
  );

  const completeMatchedJob = useCallback(
    (input: CompleteMatchedJobInput) => {
      const activeMatch = matches.find(
        (match) => match.id === input.matchId && match.status === "active",
      );

      if (!activeMatch) {
        return undefined;
      }

      const existingReview = reviews.find(
        (review) => review.matchId === activeMatch.id,
      );

      if (existingReview) {
        return existingReview;
      }

      const newReview = buildReview(activeMatch, input);

      setMatches((currentMatches) =>
        currentMatches.map((match) =>
          match.id === activeMatch.id
            ? {
                ...match,
                status: "completed",
                completedAt: newReview.createdAt,
                reviewId: newReview.id,
              }
            : match,
        ),
      );
      setReviews((currentReviews) => [newReview, ...currentReviews]);

      return newReview;
    },
    [matches, reviews],
  );

  const createBarangayNote = useCallback((input: CreateBarangayNoteInput) => {
    const newNote: ComplaintNote = {
      id: createPrototypeId("note"),
      targetType: input.targetType,
      targetId: input.targetId,
      note: input.note.trim(),
      createdBy: input.createdBy ?? CURRENT_BARANGAY_STAFF_USER_ID,
      createdAt: new Date().toISOString(),
    };

    setBarangayNotes((currentNotes) => [newNote, ...currentNotes]);

    return newNote;
  }, []);

  return {
    shellSummary,
    jobRequests: allJobRequests,
    openJobRequests,
    createdJobRequests,
    workerProfiles: allWorkerProfiles,
    createdWorkerProfiles,
    jobResponses,
    matches,
    reviews,
    barangayNotes,
    createJobRequest,
    createWorkerProfile,
    createJobResponse,
    acceptWorkerResponse,
    completeMatchedJob,
    updateQuestJobStatus,
    createBarangayNote,
  };
}

export function getShellSummary(
  allJobRequests: JobRequest[] = seedJobRequests,
  allWorkerProfiles: WorkerProfile[] = seedWorkerProfiles,
): ShellSummary {
  return {
    totalWorkers: allWorkerProfiles.length,
    totalOpenJobs: getOpenJobRequests(allJobRequests).length,
    registeredWorkers: getRegisteredWorkers(allWorkerProfiles).length,
    assistedRequests: getAssistedRequests(allJobRequests).length,
  };
}

export function getOpenJobRequests(
  allJobRequests: JobRequest[] = seedJobRequests,
): JobRequest[] {
  return allJobRequests
    .filter((job) => job.status === "open")
    .sort((firstJob, secondJob) =>
      secondJob.createdAt.localeCompare(firstJob.createdAt),
    );
}

export function getQuestBoardJobs(
  allJobRequests: JobRequest[] = seedJobRequests,
): JobRequest[] {
  return [...allJobRequests].sort((firstJob, secondJob) =>
    secondJob.createdAt.localeCompare(firstJob.createdAt),
  );
}

export function getResidentPreviewWorkers(
  allWorkerProfiles: WorkerProfile[] = seedWorkerProfiles,
): WorkerProfile[] {
  return allWorkerProfiles.filter((worker) => worker.approximateDistanceKm <= 3.2);
}

export function getResidentDiscoveryWorkers(
  selectedCategory?: SkillCategory,
  allWorkerProfiles: WorkerProfile[] = seedWorkerProfiles,
): WorkerProfile[] {
  return getResidentPreviewWorkers(allWorkerProfiles)
    .filter((worker) =>
      selectedCategory ? worker.skillCategories.includes(selectedCategory) : true,
    )
    .sort((firstWorker, secondWorker) => {
      if (firstWorker.approximateDistanceKm !== secondWorker.approximateDistanceKm) {
        return firstWorker.approximateDistanceKm - secondWorker.approximateDistanceKm;
      }

      return (secondWorker.rating ?? 0) - (firstWorker.rating ?? 0);
    });
}

export function getWorkerById(
  workerId: string,
  allWorkerProfiles: WorkerProfile[] = seedWorkerProfiles,
): WorkerProfile | undefined {
  return allWorkerProfiles.find((worker) => worker.id === workerId);
}

export function getResponsesForJob(
  jobId: string,
  allJobResponses: JobResponse[] = [],
): JobResponse[] {
  return allJobResponses
    .filter((response) => response.jobRequestId === jobId)
    .sort((firstResponse, secondResponse) =>
      secondResponse.createdAt.localeCompare(firstResponse.createdAt),
    );
}

export function getResponseByWorkerForJob(
  workerProfileId: string,
  jobRequestId: string,
  allJobResponses: JobResponse[] = [],
): JobResponse | undefined {
  return getResponsesForJob(jobRequestId, allJobResponses).find(
    (response) => response.workerProfileId === workerProfileId,
  );
}

export function getMatchForJob(
  jobId: string,
  allMatches: Match[] = [],
): Match | undefined {
  return allMatches.find(
    (match) => match.jobRequestId === jobId && match.status !== "cancelled",
  );
}

export function getWorkerRegistryWorkers(
  allWorkerProfiles: WorkerProfile[] = seedWorkerProfiles,
): WorkerProfile[] {
  return [...allWorkerProfiles].sort((firstWorker, secondWorker) => {
    if (firstWorker.registryStatus !== secondWorker.registryStatus) {
      return firstWorker.registryStatus === "registered" ? -1 : 1;
    }

    return firstWorker.displayName.localeCompare(secondWorker.displayName);
  });
}

export function getWorkerTrustSignals(worker: WorkerProfile): TrustSignal[] {
  const signals: TrustSignal[] = [];

  if (worker.barangayRegistered) {
    signals.push("Barangay-registered");
  }

  if (worker.identityChecked) {
    signals.push("Identity checked");
  }

  if (worker.communityReferred) {
    signals.push("Community-referred");
  }

  if (worker.noUnresolvedComplaints) {
    signals.push("No unresolved complaints");
  }

  return signals;
}

export function getRegisteredWorkers(
  allWorkerProfiles: WorkerProfile[] = seedWorkerProfiles,
): WorkerProfile[] {
  return allWorkerProfiles.filter((worker) => worker.registryStatus === "registered");
}

export function getAssistedRequests(
  allJobRequests: JobRequest[] = seedJobRequests,
): JobRequest[] {
  return allJobRequests
    .filter((job) => job.requesterType === "barangay_assisted")
    .sort((firstJob, secondJob) =>
      secondJob.createdAt.localeCompare(firstJob.createdAt),
    );
}

export function getResidentJobRequests(
  residentUserId: string,
  allJobRequests: JobRequest[] = seedJobRequests,
): JobRequest[] {
  return allJobRequests
    .filter((job) => job.createdByUserId === residentUserId)
    .sort((firstJob, secondJob) =>
      secondJob.createdAt.localeCompare(firstJob.createdAt),
    );
}

export function getWorkerDashboardProfile(
  allWorkerProfiles: WorkerProfile[] = seedWorkerProfiles,
): WorkerProfile {
  return (
    allWorkerProfiles.find((worker) => worker.id === CURRENT_WORKER_PROFILE_ID) ??
    allWorkerProfiles[0]
  );
}

export function getUserById(userId: string): User | undefined {
  return users.find((user) => user.id === userId);
}

export function hasSafePublicPreviewFields(job: JobRequest): boolean {
  return Boolean(
    job.areaLabel &&
      typeof job.approximateDistanceKm === "number" &&
      job.privacyNote,
  );
}

function buildJobRequest(input: CreateJobRequestInput): JobRequest {
  const normalizedArea = input.areaLabel.trim();
  const source = input.source;

  return {
    id: createPrototypeId("job"),
    title: input.title.trim(),
    category: input.category,
    description: input.description.trim(),
    status: "open",
    source,
    barangayId: getBarangayIdForArea(normalizedArea),
    areaLabel: normalizedArea,
    approximateDistanceKm: getApproximateDistanceForArea(normalizedArea),
    urgency: input.urgency,
    requesterType: input.requesterType,
    createdByUserId: input.createdByUserId,
    assistedByBarangayStaffId: input.assistedByBarangayStaffId,
    assistedResidentLabel: input.assistedResidentLabel?.trim() || undefined,
    budgetMin: input.budgetMin,
    budgetMax: input.budgetMax,
    privacyNote:
      source === "mobile"
        ? "Exact address and contact hidden before match."
        : "Assisted request shows approximate area only.",
    createdAt: new Date().toISOString(),
  };
}

function buildWorkerProfile(input: CreateWorkerProfileInput): WorkerProfile {
  const normalizedDisplayName = input.displayName.trim();
  const normalizedLocation = input.approximateLocationLabel.trim();
  const serviceAreas = input.serviceAreas
    .map((serviceArea) => serviceArea.trim())
    .filter(Boolean);
  const skillCategories = input.skillCategories;
  const primaryCategory = skillCategories[0];

  return {
    id: createPrototypeId("worker-profile"),
    userId: createPrototypeId("assisted-worker"),
    displayName: normalizedDisplayName,
    barangayId: getBarangayIdForArea(normalizedLocation),
    primaryCategory,
    skillCategories,
    headline: `${skillCategories.join(", ")} services around ${normalizedLocation}.`,
    bio: input.bio.trim(),
    serviceAreas,
    approximateLocationLabel: normalizedLocation,
    approximateDistanceKm: getApproximateDistanceForArea(normalizedLocation),
    serviceRadiusKm: 3,
    experienceYears: Math.max(0, input.experienceYears),
    barangayRegistered: input.barangayRegistered,
    identityChecked: input.identityChecked,
    communityReferred: input.communityReferred,
    trustSignals: buildTrustSignals(input),
    completedJobs: 0,
    rating: undefined,
    reviewsCount: 0,
    referralCount: 0,
    noUnresolvedComplaints: true,
    availabilityNote: input.availabilityNote.trim(),
    registryStatus: "registered",
  };
}

function buildJobResponse(input: CreateJobResponseInput): JobResponse {
  return {
    id: createPrototypeId("response"),
    jobRequestId: input.jobRequestId,
    workerProfileId: input.workerProfileId,
    message: input.message.trim(),
    estimatedPrice: input.estimatedPrice,
    availability: input.availability.trim(),
    status: "sent",
    createdAt: new Date().toISOString(),
  };
}

function buildMatch(response: JobResponse): Match {
  return {
    id: createPrototypeId("match"),
    jobRequestId: response.jobRequestId,
    workerProfileId: response.workerProfileId,
    responseId: response.id,
    status: "active",
    contactShared: true,
    createdAt: new Date().toISOString(),
  };
}

function buildReview(match: Match, input: CompleteMatchedJobInput): Review {
  return {
    id: createPrototypeId("review"),
    jobRequestId: match.jobRequestId,
    matchId: match.id,
    workerProfileId: match.workerProfileId,
    residentUserId: input.residentUserId ?? CURRENT_RESIDENT_USER_ID,
    rating: clampReviewRating(input.rating),
    comment: input.comment.trim(),
    createdAt: new Date().toISOString(),
  };
}

function buildTrustSignals(input: CreateWorkerProfileInput): TrustSignal[] {
  const signals: TrustSignal[] = [];

  if (input.barangayRegistered) {
    signals.push("Barangay-registered");
  }

  if (input.identityChecked) {
    signals.push("Identity checked");
  }

  if (input.communityReferred) {
    signals.push("Community-referred");
  }

  signals.push("No unresolved complaints");

  return signals;
}

function getBarangayIdForArea(areaLabel: string): string {
  const normalizedArea = areaLabel.toLowerCase();
  const matchingBarangay = barangays.find((barangay) =>
    barangay.pilotAreas.some(
      (pilotArea) => pilotArea.toLowerCase() === normalizedArea,
    ),
  );

  return matchingBarangay?.id ?? barangays[0].id;
}

function getApproximateDistanceForArea(areaLabel: string): number {
  const distanceByArea = new Map<string, number>([
    ["anabu", 0.7],
    ["anabu area", 0.7],
    ["bucandala", 1.2],
    ["bucandala area", 1.2],
    ["malagasang", 1.9],
    ["malagasang area", 1.9],
    ["bayan luma", 2.8],
    ["bayan luma area", 2.8],
    ["poblacion", 2.4],
    ["poblacion area", 2.4],
  ]);

  return distanceByArea.get(areaLabel.toLowerCase()) ?? 2.5;
}

function applyJobStatusUpdates(
  jobs: JobRequest[],
  jobStatusUpdates: Record<string, QuestManageableJobStatus>,
  matches: Match[] = [],
): JobRequest[] {
  const visibleMatchesByJobId = new Map(
    matches
      .filter((match) => match.status !== "cancelled")
      .map((match) => [match.jobRequestId, match]),
  );

  return jobs.map((job) => {
    const match = visibleMatchesByJobId.get(job.id);

    return {
      ...job,
      status: match
        ? match.status === "completed"
          ? "completed"
          : "matched"
        : jobStatusUpdates[job.id] ?? job.status,
      matchedWorkerId: match?.workerProfileId,
    };
  });
}

function applyWorkerReputation(
  workerProfiles: WorkerProfile[],
  reviews: Review[] = [],
): WorkerProfile[] {
  return workerProfiles.map((worker) => {
    const workerReviews = reviews.filter(
      (review) => review.workerProfileId === worker.id,
    );

    if (workerReviews.length === 0) {
      return worker;
    }

    const existingRatingTotal =
      typeof worker.rating === "number" ? worker.rating * worker.reviewsCount : 0;
    const newRatingTotal = workerReviews.reduce(
      (total, review) => total + review.rating,
      0,
    );
    const reviewsCount = worker.reviewsCount + workerReviews.length;

    return {
      ...worker,
      completedJobs: worker.completedJobs + workerReviews.length,
      rating: Number(((existingRatingTotal + newRatingTotal) / reviewsCount).toFixed(1)),
      reviewsCount,
    };
  });
}

function clampReviewRating(rating: number): number {
  if (!Number.isFinite(rating)) {
    return 5;
  }

  return Math.min(5, Math.max(1, Math.round(rating)));
}

function createPrototypeId(prefix: string): string {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function loadCreatedJobRequests(): JobRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedJobs = window.localStorage.getItem(CREATED_JOB_REQUESTS_STORAGE_KEY);

    if (!storedJobs) {
      return [];
    }

    const parsedJobs: unknown = JSON.parse(storedJobs);

    if (!Array.isArray(parsedJobs)) {
      return [];
    }

    return parsedJobs.filter(isStoredJobRequest);
  } catch {
    return [];
  }
}

function persistCreatedJobRequests(createdJobs: JobRequest[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    CREATED_JOB_REQUESTS_STORAGE_KEY,
    JSON.stringify(createdJobs),
  );
}

function loadCreatedWorkerProfiles(): WorkerProfile[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedWorkers = window.localStorage.getItem(
      CREATED_WORKER_PROFILES_STORAGE_KEY,
    );

    if (!storedWorkers) {
      return [];
    }

    const parsedWorkers: unknown = JSON.parse(storedWorkers);

    if (!Array.isArray(parsedWorkers)) {
      return [];
    }

    return parsedWorkers.filter(isStoredWorkerProfile);
  } catch {
    return [];
  }
}

function persistCreatedWorkerProfiles(createdWorkers: WorkerProfile[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    CREATED_WORKER_PROFILES_STORAGE_KEY,
    JSON.stringify(createdWorkers),
  );
}

function loadJobStatusUpdates(): Record<string, QuestManageableJobStatus> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedUpdates = window.localStorage.getItem(
      JOB_STATUS_UPDATES_STORAGE_KEY,
    );

    if (!storedUpdates) {
      return {};
    }

    const parsedUpdates: unknown = JSON.parse(storedUpdates);

    if (typeof parsedUpdates !== "object" || parsedUpdates === null) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsedUpdates).filter(([, status]) =>
        isQuestManageableJobStatus(status),
      ),
    );
  } catch {
    return {};
  }
}

function persistJobStatusUpdates(
  jobStatusUpdates: Record<string, QuestManageableJobStatus>,
): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    JOB_STATUS_UPDATES_STORAGE_KEY,
    JSON.stringify(jobStatusUpdates),
  );
}

function loadBarangayNotes(): ComplaintNote[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedNotes = window.localStorage.getItem(BARANGAY_NOTES_STORAGE_KEY);

    if (!storedNotes) {
      return [];
    }

    const parsedNotes: unknown = JSON.parse(storedNotes);

    if (!Array.isArray(parsedNotes)) {
      return [];
    }

    return parsedNotes.filter(isStoredComplaintNote);
  } catch {
    return [];
  }
}

function loadJobResponses(): JobResponse[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedResponses = window.localStorage.getItem(JOB_RESPONSES_STORAGE_KEY);

    if (!storedResponses) {
      return [];
    }

    const parsedResponses: unknown = JSON.parse(storedResponses);

    if (!Array.isArray(parsedResponses)) {
      return [];
    }

    return parsedResponses.filter(isStoredJobResponse);
  } catch {
    return [];
  }
}

function persistJobResponses(responses: JobResponse[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    JOB_RESPONSES_STORAGE_KEY,
    JSON.stringify(responses),
  );
}

function loadMatches(): Match[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedMatches = window.localStorage.getItem(MATCHES_STORAGE_KEY);

    if (!storedMatches) {
      return [];
    }

    const parsedMatches: unknown = JSON.parse(storedMatches);

    if (!Array.isArray(parsedMatches)) {
      return [];
    }

    return parsedMatches.filter(isStoredMatch);
  } catch {
    return [];
  }
}

function persistMatches(matches: Match[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches));
}

function loadReviews(): Review[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedReviews = window.localStorage.getItem(REVIEWS_STORAGE_KEY);

    if (!storedReviews) {
      return [];
    }

    const parsedReviews: unknown = JSON.parse(storedReviews);

    if (!Array.isArray(parsedReviews)) {
      return [];
    }

    return parsedReviews.filter(isStoredReview);
  } catch {
    return [];
  }
}

function persistReviews(reviews: Review[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}

function persistBarangayNotes(notes: ComplaintNote[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(BARANGAY_NOTES_STORAGE_KEY, JSON.stringify(notes));
}

function isStoredJobRequest(value: unknown): value is JobRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleJob = value as Partial<JobRequest>;

  return Boolean(
    possibleJob.id &&
      possibleJob.title &&
      possibleJob.category &&
      possibleJob.description &&
      possibleJob.status === "open" &&
      possibleJob.source &&
      possibleJob.areaLabel &&
      possibleJob.urgency &&
      possibleJob.createdAt,
  );
}

function isStoredWorkerProfile(value: unknown): value is WorkerProfile {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleWorker = value as Partial<WorkerProfile>;

  return Boolean(
    possibleWorker.id &&
      possibleWorker.userId &&
      possibleWorker.displayName &&
      possibleWorker.barangayId &&
      possibleWorker.primaryCategory &&
      Array.isArray(possibleWorker.skillCategories) &&
      possibleWorker.bio &&
      Array.isArray(possibleWorker.serviceAreas) &&
      possibleWorker.approximateLocationLabel &&
      typeof possibleWorker.approximateDistanceKm === "number" &&
      typeof possibleWorker.serviceRadiusKm === "number" &&
      typeof possibleWorker.experienceYears === "number" &&
      typeof possibleWorker.barangayRegistered === "boolean" &&
      typeof possibleWorker.identityChecked === "boolean" &&
      typeof possibleWorker.communityReferred === "boolean" &&
      typeof possibleWorker.completedJobs === "number" &&
      typeof possibleWorker.referralCount === "number" &&
      typeof possibleWorker.noUnresolvedComplaints === "boolean" &&
      possibleWorker.availabilityNote &&
      possibleWorker.registryStatus === "registered",
  );
}

function isStoredComplaintNote(value: unknown): value is ComplaintNote {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleNote = value as Partial<ComplaintNote>;

  return Boolean(
    possibleNote.id &&
      (possibleNote.targetType === "job" || possibleNote.targetType === "worker") &&
      possibleNote.targetId &&
      possibleNote.note &&
      possibleNote.createdBy &&
      possibleNote.createdAt,
  );
}

function isStoredJobResponse(value: unknown): value is JobResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleResponse = value as Partial<JobResponse>;

  return Boolean(
    possibleResponse.id &&
      possibleResponse.jobRequestId &&
      possibleResponse.workerProfileId &&
      possibleResponse.message &&
      possibleResponse.availability &&
      isJobResponseStatus(possibleResponse.status) &&
      possibleResponse.createdAt &&
      (typeof possibleResponse.estimatedPrice === "undefined" ||
        typeof possibleResponse.estimatedPrice === "number"),
  );
}

function isStoredMatch(value: unknown): value is Match {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleMatch = value as Partial<Match>;

  return Boolean(
    possibleMatch.id &&
      possibleMatch.jobRequestId &&
      possibleMatch.workerProfileId &&
      possibleMatch.responseId &&
      isMatchStatus(possibleMatch.status) &&
      typeof possibleMatch.contactShared === "boolean" &&
      possibleMatch.createdAt,
  );
}

function isStoredReview(value: unknown): value is Review {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const possibleReview = value as Partial<Review>;

  return Boolean(
    possibleReview.id &&
      possibleReview.jobRequestId &&
      possibleReview.matchId &&
      possibleReview.workerProfileId &&
      possibleReview.residentUserId &&
      typeof possibleReview.rating === "number" &&
      possibleReview.rating >= 1 &&
      possibleReview.rating <= 5 &&
      possibleReview.comment &&
      possibleReview.createdAt,
  );
}

function isQuestManageableJobStatus(
  value: unknown,
): value is QuestManageableJobStatus {
  return (
    value === "open" || value === "needs_follow_up" || value === "cancelled"
  );
}

function isJobResponseStatus(
  value: unknown,
): value is JobResponse["status"] {
  return (
    value === "sent" ||
    value === "shortlisted" ||
    value === "accepted" ||
    value === "rejected"
  );
}

function isMatchStatus(value: unknown): value is Match["status"] {
  return value === "active" || value === "completed" || value === "cancelled";
}
