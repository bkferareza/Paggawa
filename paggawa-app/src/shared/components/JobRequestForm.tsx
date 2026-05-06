import { useState, type FormEvent } from "react";
import {
  jobUrgencies,
  skillCategories,
  type JobUrgency,
  type SkillCategory,
} from "../domain/models";

export type JobRequestFormValues = {
  assistedResidentLabel?: string;
  title: string;
  category: SkillCategory;
  description: string;
  areaLabel: string;
  urgency: JobUrgency;
  budgetMin?: number;
  budgetMax?: number;
};

type JobRequestFormProps = {
  includeAssistedResident?: boolean;
  onSubmit: (values: JobRequestFormValues) => void;
  submitLabel: string;
};

const defaultArea = "Anabu";

export function JobRequestForm({
  includeAssistedResident = false,
  onSubmit,
  submitLabel,
}: JobRequestFormProps) {
  const [assistedResidentLabel, setAssistedResidentLabel] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<SkillCategory>("Plumbing");
  const [description, setDescription] = useState("");
  const [areaLabel, setAreaLabel] = useState(defaultArea);
  const [urgency, setUrgency] = useState<JobUrgency>("Normal");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [formError, setFormError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !areaLabel.trim()) {
      setFormError("Title, description, and approximate area are required.");
      return;
    }

    if (includeAssistedResident && !assistedResidentLabel.trim()) {
      setFormError("Resident label is required for assisted requests.");
      return;
    }

    const parsedBudgetMin = parseOptionalAmount(budgetMin);
    const parsedBudgetMax = parseOptionalAmount(budgetMax);

    if (
      typeof parsedBudgetMin === "number" &&
      typeof parsedBudgetMax === "number" &&
      parsedBudgetMin > parsedBudgetMax
    ) {
      setFormError("Budget minimum must be lower than budget maximum.");
      return;
    }

    setFormError("");

    onSubmit({
      assistedResidentLabel: assistedResidentLabel.trim() || undefined,
      title: title.trim(),
      category,
      description: description.trim(),
      areaLabel: areaLabel.trim(),
      urgency,
      budgetMin: parsedBudgetMin,
      budgetMax: parsedBudgetMax,
    });

    setAssistedResidentLabel("");
    setTitle("");
    setDescription("");
    setBudgetMin("");
    setBudgetMax("");
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {includeAssistedResident && (
          <label className="form-field">
            <span>Resident label</span>
            <input
              type="text"
              value={assistedResidentLabel}
              onChange={(event) => setAssistedResidentLabel(event.target.value)}
              placeholder="Assisted resident - Anabu"
              required
            />
          </label>
        )}

        <label className="form-field">
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Kitchen sink leak check"
            required
          />
        </label>

        <label className="form-field">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as SkillCategory)}
          >
            {skillCategories.map((skillCategory) => (
              <option key={skillCategory} value={skillCategory}>
                {skillCategory}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field form-field-wide">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Water is dripping under the kitchen sink."
            rows={4}
            required
          />
        </label>

        <label className="form-field">
          <span>Approximate area</span>
          <input
            type="text"
            value={areaLabel}
            onChange={(event) => setAreaLabel(event.target.value)}
            placeholder="Anabu"
            required
          />
        </label>

        <label className="form-field">
          <span>Urgency</span>
          <select
            value={urgency}
            onChange={(event) => setUrgency(event.target.value as JobUrgency)}
          >
            {jobUrgencies.map((jobUrgency) => (
              <option key={jobUrgency} value={jobUrgency}>
                {jobUrgency}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Budget minimum</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={budgetMin}
            onChange={(event) => setBudgetMin(event.target.value)}
            placeholder="500"
          />
        </label>

        <label className="form-field">
          <span>Budget maximum</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={budgetMax}
            onChange={(event) => setBudgetMax(event.target.value)}
            placeholder="1500"
          />
        </label>
      </div>

      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

      <button type="submit" className="primary-button">
        {submitLabel}
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
