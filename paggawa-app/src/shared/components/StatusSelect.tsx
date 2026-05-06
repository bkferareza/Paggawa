import {
  questManageableJobStatuses,
  type QuestManageableJobStatus,
} from "../domain/models";
import { formatJobStatus } from "../utils/formatting";

type StatusSelectProps = {
  id: string;
  label: string;
  value: QuestManageableJobStatus;
  onChange: (status: QuestManageableJobStatus) => void;
};

export function StatusSelect({ id, label, value, onChange }: StatusSelectProps) {
  return (
    <label className="form-field compact-field" htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) =>
          onChange(event.target.value as QuestManageableJobStatus)
        }
      >
        {questManageableJobStatuses.map((status) => (
          <option key={status} value={status}>
            {formatJobStatus(status)}
          </option>
        ))}
      </select>
    </label>
  );
}
