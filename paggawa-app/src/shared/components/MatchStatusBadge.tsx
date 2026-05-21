import type { MatchStatus } from "../domain/models";
import { formatMatchStatus } from "../utils/formatting";

type MatchStatusBadgeProps = {
  status: MatchStatus;
};

export function MatchStatusBadge({ status }: MatchStatusBadgeProps) {
  return <span className="status-pill">Match {formatMatchStatus(status)}</span>;
}
