import type {
  JobRequest,
  JobSource,
  JobStatus,
  JobUrgency,
  RequesterType,
  SkillCategory,
  TrustSignal,
} from "../domain/models";

export function formatDistance(distanceKm: number): string {
  return `${distanceKm.toFixed(1)} km approx.`;
}

export function formatRating(rating?: number): string {
  if (typeof rating !== "number") {
    return "No rating yet";
  }

  return `${rating.toFixed(1)} rating`;
}

export function formatServiceRadius(radiusKm: number): string {
  return `${radiusKm.toFixed(0)} km radius`;
}

export function formatExperience(years: number): string {
  return years === 1 ? "1 year" : `${years} years`;
}

export function formatReviewCount(count: number): string {
  return count === 1 ? "1 review" : `${count} reviews`;
}

export function formatReferralCount(count: number): string {
  return count === 1 ? "1 referral" : `${count} referrals`;
}

export function formatSkills(skills: SkillCategory[]): string {
  return skills.join(", ");
}

export function formatTrustSignals(signals: TrustSignal[]): string[] {
  return signals;
}

export function formatJobStatus(status: JobStatus): string {
  if (status === "open") {
    return "Open";
  }

  if (status === "needs_follow_up") {
    return "Needs follow-up";
  }

  if (status === "cancelled") {
    return "Cancelled";
  }

  if (status === "responded") {
    return "Responded";
  }

  if (status === "matched") {
    return "Matched";
  }

  return "Completed";
}

export function formatRequesterType(requesterType: RequesterType): string {
  return requesterType === "resident" ? "Resident" : "Barangay-assisted";
}

export function formatJobSource(source: JobSource): string {
  return source === "mobile" ? "Mobile" : "Barangay";
}

export function formatUrgency(urgency: JobUrgency): string {
  return urgency;
}

export function formatBudgetAmount(amount: number): string {
  return `PHP ${amount.toLocaleString("en-PH")}`;
}

export function formatBudgetRange(job: JobRequest): string {
  if (typeof job.budgetMin === "number" && typeof job.budgetMax === "number") {
    return `${formatBudgetAmount(job.budgetMin)} - ${formatBudgetAmount(job.budgetMax)}`;
  }

  if (typeof job.budgetMin === "number") {
    return `From ${formatBudgetAmount(job.budgetMin)}`;
  }

  if (typeof job.budgetMax === "number") {
    return `Up to ${formatBudgetAmount(job.budgetMax)}`;
  }

  return "Budget not listed";
}

export function formatCreatedDate(createdAt: string): string {
  const parsedDate = new Date(createdAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return createdAt;
  }

  return parsedDate.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
