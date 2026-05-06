import {
  JobRequestForm,
  type JobRequestFormValues,
} from "../../../shared/components/JobRequestForm";
import type { JobRequest } from "../../../shared/domain/models";
import {
  CURRENT_RESIDENT_USER_ID,
  type CreateJobRequestInput,
} from "../../../shared/state/prototypeState";

type CreateJobRequestFormProps = {
  onCreateJobRequest: (input: CreateJobRequestInput) => JobRequest;
  onCreated: (job: JobRequest) => void;
};

export function CreateJobRequestForm({
  onCreateJobRequest,
  onCreated,
}: CreateJobRequestFormProps) {
  function handleSubmit(values: JobRequestFormValues) {
    const createdJob = onCreateJobRequest({
      ...values,
      source: "mobile",
      requesterType: "resident",
      createdByUserId: CURRENT_RESIDENT_USER_ID,
    });

    onCreated(createdJob);
  }

  return (
    <section className="dashboard-section form-panel">
      <div className="section-heading">
        <p className="eyebrow">Create request</p>
        <h2>Resident job request</h2>
      </div>
      <JobRequestForm onSubmit={handleSubmit} submitLabel="Create open request" />
    </section>
  );
}
