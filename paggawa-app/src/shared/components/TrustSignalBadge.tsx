import type { TrustSignal } from "../domain/models";

type TrustSignalBadgeProps = {
  label: TrustSignal;
};

export function TrustSignalBadge({ label }: TrustSignalBadgeProps) {
  return <span className="trust-badge">{label}</span>;
}
