export type UserRole = "resident" | "worker" | "barangay_staff";

export const skillCategories = [
  "Carpentry",
  "Plumbing",
  "Electrical",
  "Painting",
  "Masonry",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export type JobStatus =
  | "open"
  | "needs_follow_up"
  | "cancelled"
  | "responded"
  | "matched"
  | "completed";

export const questManageableJobStatuses = [
  "open",
  "needs_follow_up",
  "cancelled",
] as const;

export type QuestManageableJobStatus =
  (typeof questManageableJobStatuses)[number];

export type RequesterType = "resident" | "barangay_assisted";

export type JobSource = "mobile" | "barangay";

export const jobUrgencies = ["Low", "Normal", "Urgent"] as const;

export type JobUrgency = (typeof jobUrgencies)[number];

export type RegistryStatus = "registered" | "community-referred";

export type TrustSignal =
  | "Barangay-registered"
  | "Identity checked"
  | "Community-referred"
  | "Completed jobs"
  | "Rating"
  | "Reviews"
  | "Referral count"
  | "No unresolved complaints";

export type Barangay = {
  id: string;
  name: string;
  city: string;
  province: string;
  pilotAreas: string[];
  notes: string;
};

export type User = {
  id: string;
  displayName: string;
  role: UserRole;
  barangayId: string;
  areaLabel: string;
};

export type WorkerProfile = {
  id: string;
  userId: string;
  displayName: string;
  barangayId: string;
  primaryCategory: SkillCategory;
  skillCategories: SkillCategory[];
  headline: string;
  bio: string;
  serviceAreas: string[];
  approximateLocationLabel: string;
  approximateDistanceKm: number;
  serviceRadiusKm: number;
  experienceYears: number;
  barangayRegistered: boolean;
  identityChecked: boolean;
  communityReferred: boolean;
  trustSignals: TrustSignal[];
  completedJobs: number;
  rating?: number;
  reviewsCount: number;
  referralCount: number;
  noUnresolvedComplaints: boolean;
  availabilityNote: string;
  registryStatus: RegistryStatus;
  sampleWork?: string[];
};

export type JobRequest = {
  id: string;
  title: string;
  category: SkillCategory;
  description: string;
  status: JobStatus;
  source: JobSource;
  barangayId: string;
  areaLabel: string;
  approximateDistanceKm: number;
  urgency: JobUrgency;
  requesterType: RequesterType;
  createdByUserId?: string;
  assistedByBarangayStaffId?: string;
  assistedResidentLabel?: string;
  matchedWorkerId?: string;
  budgetMin?: number;
  budgetMax?: number;
  preferredTiming?: string;
  privacyNote: string;
  createdAt: string;
};

export type JobResponseStatus = "sent" | "shortlisted" | "accepted" | "rejected";

export type JobResponse = {
  id: string;
  jobRequestId: string;
  workerProfileId: string;
  message: string;
  estimatedPrice?: number;
  availability: string;
  status: JobResponseStatus;
  createdAt: string;
};

export type MatchStatus = "active" | "completed" | "cancelled";

export type Match = {
  id: string;
  jobRequestId: string;
  workerProfileId: string;
  responseId: string;
  status: MatchStatus;
  contactShared: boolean;
  createdAt: string;
  completedAt?: string;
  reviewId?: string;
};

export type Review = {
  id: string;
  jobRequestId: string;
  matchId: string;
  workerProfileId: string;
  residentUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ComplaintNote = {
  id: string;
  targetType: "job" | "worker";
  targetId: string;
  note: string;
  createdBy: string;
  createdAt: string;
};
