import {
  JobRequestForm,
  type JobRequestFormValues,
} from "../../../shared/components/JobRequestForm";
import type { JobRequest } from "../../../shared/domain/models";
import {
  CURRENT_BARANGAY_STAFF_USER_ID,
  type CreateJobRequestInput,
} from "../../../shared/state/prototypeState";

type AssistedJobRequestFormProps = {
  onCreateJobRequest: (input: CreateJobRequestInput) => JobRequest;
  onCreated: (job: JobRequest) => void;
};

export function AssistedJobRequestForm({
  onCreateJobRequest,
  onCreated,
}: AssistedJobRequestFormProps) {
  function handleSubmit(values: JobRequestFormValues) {
    const createdJob = onCreateJobRequest({
      ...values,
      source: "barangay",
      requesterType: "barangay_assisted",
      assistedByBarangayStaffId: CURRENT_BARANGAY_STAFF_USER_ID,
    });

    onCreated(createdJob);
  }

  return (
    <section className="dashboard-section form-panel">
      <div className="section-heading">
        <p className="eyebrow">Assisted request</p>
        <h2>Barangay job request</h2>
      </div>
      <JobRequestForm
        includeAssistedResident
        onSubmit={handleSubmit}
        submitLabel="Create assisted request"
      />
    </section>
  );
}
