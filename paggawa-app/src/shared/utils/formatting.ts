import type { JobStatus, RequesterType, SkillCategory, TrustSignal } from "../domain/models";

export function formatDistance(distanceKm: number): string {
  return `${distanceKm.toFixed(1)} km approx.`;
}

export function formatRating(rating: number): string {
  return `${rating.toFixed(1)} rating`;
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

  if (status === "matched") {
    return "Matched";
  }

  return "Completed";
}

export function formatRequesterType(requesterType: RequesterType): string {
  return requesterType === "resident" ? "Resident" : "Barangay-assisted";
}
