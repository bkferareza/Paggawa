import { useState, type FormEvent } from "react";
import type { JobResponse, JobRequest, WorkerProfile } from "../../../shared/domain/models";
import type { CreateJobResponseInput } from "../../../shared/state/prototypeState";

type JobResponseFormProps = {
  job: JobRequest;
  onCreateJobResponse: (input: CreateJobResponseInput) => JobResponse;
  onCreated: (response: JobResponse) => void;
  worker: WorkerProfile;
};

export function JobResponseForm({
  job,
  onCreateJobResponse,
  onCreated,
  worker,
}: JobResponseFormProps) {
  const [message, setMessage] = useState("");
  const [availability, setAvailability] = useState(worker.availabilityNote);
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [formError, setFormError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim() || !availability.trim()) {
      setFormError("Message and availability are required.");
      return;
    }

    const parsedEstimatedPrice = parseOptionalAmount(estimatedPrice);

    if (parsedEstimatedPrice !== undefined && parsedEstimatedPrice < 0) {
      setFormError("Estimated price cannot be negative.");
      return;
    }

    setFormError("");

    const response = onCreateJobResponse({
      jobRequestId: job.id,
      workerProfileId: worker.id,
      message,
      availability,
      estimatedPrice: parsedEstimatedPrice,
    });

    onCreated(response);
    setMessage("");
    setEstimatedPrice("");
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field form-field-wide">
          <span>Response message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="I can check this and confirm the work needed on-site."
            rows={3}
            required
          />
        </label>

        <label className="form-field">
          <span>Availability</span>
          <input
            type="text"
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
            placeholder="Tomorrow morning"
            required
          />
        </label>

        <label className="form-field">
          <span>Estimated price</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={estimatedPrice}
            onChange={(event) => setEstimatedPrice(event.target.value)}
            placeholder="1200"
          />
        </label>
      </div>

      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

      <button type="submit" className="primary-button">
        Send response
      </button>
    </form>
  );
}

function parseOptionalAmount(value: string): number | undefined {
  if (!value.trim()) {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}
