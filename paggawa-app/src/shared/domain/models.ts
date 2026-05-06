export type UserRole = "resident" | "worker" | "barangay_staff";

export type SkillCategory =
  | "Carpentry"
  | "Plumbing"
  | "Electrical"
  | "Painting"
  | "Masonry";

export type JobStatus = "open" | "matched" | "completed";

export type RequesterType = "resident" | "barangay_assisted";

export type RegistryStatus = "registered" | "community-referred";

export type TrustSignal =
  | "Barangay-registered"
  | "Identity checked"
  | "Community-referred"
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
  barangayId: string;
  primaryCategory: SkillCategory;
  skillCategories: SkillCategory[];
  headline: string;
  serviceAreas: string[];
  approximateDistanceKm: number;
  serviceRadiusKm: number;
  trustSignals: TrustSignal[];
  completedJobs: number;
  rating: number;
  availabilityNote: string;
  registryStatus: RegistryStatus;
};

export type JobRequest = {
  id: string;
  title: string;
  category: SkillCategory;
  status: JobStatus;
  barangayId: string;
  areaLabel: string;
  approximateDistanceKm: number;
  requesterType: RequesterType;
  createdByUserId: string;
  summary: string;
  preferredTiming: string;
  privacyNote: string;
  createdAt: string;
};

export type JobResponse = {
  id: string;
  laneStatus: "future-placeholder";
};

export type Match = {
  id: string;
  laneStatus: "future-placeholder";
};

export type Review = {
  id: string;
  laneStatus: "future-placeholder";
};

export type ComplaintNote = {
  id: string;
  laneStatus: "future-placeholder";
};
