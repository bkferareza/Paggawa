import type { WorkerProfile } from "../../../shared/domain/models";
import { WorkerProfileView } from "../resident/WorkerProfileView";

type WorkerProfileSummaryProps = {
  worker: WorkerProfile;
};

export function WorkerProfileSummary({ worker }: WorkerProfileSummaryProps) {
  return (
    <WorkerProfileView
      worker={worker}
      contextLabel="Own profile preview"
      showRequestPlaceholder={false}
    />
  );
}
