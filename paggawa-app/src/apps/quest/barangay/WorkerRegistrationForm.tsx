import { useState, type FormEvent } from "react";
import {
  skillCategories,
  type SkillCategory,
  type WorkerProfile,
} from "../../../shared/domain/models";
import type { CreateWorkerProfileInput } from "../../../shared/state/prototypeState";

type WorkerRegistrationFormProps = {
  onCreateWorkerProfile: (input: CreateWorkerProfileInput) => WorkerProfile;
  onCreated: (worker: WorkerProfile) => void;
};

export function WorkerRegistrationForm({
  onCreateWorkerProfile,
  onCreated,
}: WorkerRegistrationFormProps) {
  const [displayName, setDisplayName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<SkillCategory[]>([
    "Plumbing",
  ]);
  const [serviceAreas, setServiceAreas] = useState("Anabu, Bucandala");
  const [approximateLocationLabel, setApproximateLocationLabel] =
    useState("Anabu area");
  const [experienceYears, setExperienceYears] = useState("1");
  const [bio, setBio] = useState("");
  const [availabilityNote, setAvailabilityNote] = useState("");
  const [barangayRegistered] = useState(true);
  const [identityChecked, setIdentityChecked] = useState(false);
  const [communityReferred, setCommunityReferred] = useState(false);
  const [formError, setFormError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedExperienceYears = Number(experienceYears);
    const parsedServiceAreas = serviceAreas
      .split(",")
      .map((serviceArea) => serviceArea.trim())
      .filter(Boolean);

    if (!displayName.trim()) {
      setFormError("Worker display name is required.");
      return;
    }

    if (selectedSkills.length === 0) {
      setFormError("Select at least one skill.");
      return;
    }

    if (parsedServiceAreas.length === 0 || !approximateLocationLabel.trim()) {
      setFormError("Service area and approximate area are required.");
      return;
    }

    if (!Number.isFinite(parsedExperienceYears) || parsedExperienceYears < 0) {
      setFormError("Experience years must be zero or higher.");
      return;
    }

    if (!bio.trim() || !availabilityNote.trim()) {
      setFormError("Short bio and availability note are required.");
      return;
    }

    if (containsPrivateContactHint(`${displayName} ${bio} ${availabilityNote}`)) {
      setFormError("Keep public worker fields free of phone numbers or email addresses.");
      return;
    }

    setFormError("");

    const createdWorker = onCreateWorkerProfile({
      displayName,
      skillCategories: selectedSkills,
      serviceAreas: parsedServiceAreas,
      approximateLocationLabel,
      experienceYears: parsedExperienceYears,
      bio,
      availabilityNote,
      barangayRegistered,
      identityChecked,
      communityReferred,
    });

    onCreated(createdWorker);
    setDisplayName("");
    setSelectedSkills(["Plumbing"]);
    setServiceAreas("Anabu, Bucandala");
    setApproximateLocationLabel("Anabu area");
    setExperienceYears("1");
    setBio("");
    setAvailabilityNote("");
    setIdentityChecked(false);
    setCommunityReferred(false);
  }

  function toggleSkill(skill: SkillCategory) {
    setSelectedSkills((currentSkills) =>
      currentSkills.includes(skill)
        ? currentSkills.filter((currentSkill) => currentSkill !== skill)
        : [...currentSkills, skill],
    );
  }

  return (
    <section className="dashboard-section form-panel">
      <div className="section-heading">
        <p className="eyebrow">Worker registration</p>
        <h2>Barangay-assisted registry entry</h2>
      </div>

      <form className="request-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            <span>Worker display name</span>
            <input
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Pedro Ramos"
              required
            />
          </label>

          <label className="form-field">
            <span>Approximate area label</span>
            <input
              type="text"
              value={approximateLocationLabel}
              onChange={(event) =>
                setApproximateLocationLabel(event.target.value)
              }
              placeholder="Anabu area"
              required
            />
          </label>

          <label className="form-field">
            <span>Service areas / barangay</span>
            <input
              type="text"
              value={serviceAreas}
              onChange={(event) => setServiceAreas(event.target.value)}
              placeholder="Anabu, Bucandala"
              required
            />
          </label>

          <label className="form-field">
            <span>Experience years</span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={experienceYears}
              onChange={(event) => setExperienceYears(event.target.value)}
              required
            />
          </label>

          <fieldset className="form-field form-field-wide checkbox-fieldset">
            <legend>Skills</legend>
            <div className="checkbox-grid">
              {skillCategories.map((skill) => (
                <label className="checkbox-field" key={skill}>
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="form-field form-field-wide">
            <span>Short bio</span>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Local worker available for small home repairs."
              rows={3}
              required
            />
          </label>

          <label className="form-field form-field-wide">
            <span>Availability note</span>
            <textarea
              value={availabilityNote}
              onChange={(event) => setAvailabilityNote(event.target.value)}
              placeholder="Available weekday afternoons."
              rows={2}
              required
            />
          </label>

          <fieldset className="form-field form-field-wide checkbox-fieldset">
            <legend>Trust signals</legend>
            <div className="checkbox-grid">
              <label className="checkbox-field">
                <input type="checkbox" checked={barangayRegistered} readOnly />
                <span>Barangay-registered</span>
              </label>
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={identityChecked}
                  onChange={(event) => setIdentityChecked(event.target.checked)}
                />
                <span>Identity checked</span>
              </label>
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={communityReferred}
                  onChange={(event) => setCommunityReferred(event.target.checked)}
                />
                <span>Community-referred</span>
              </label>
            </div>
          </fieldset>
        </div>

        {formError && (
          <p className="form-error" role="alert">
            {formError}
          </p>
        )}

        <button type="submit" className="primary-button">
          Register worker
        </button>
      </form>
    </section>
  );
}

function containsPrivateContactHint(value: string): boolean {
  const emailPattern = /\S+@\S+\.\S+/;
  const phonePattern = /(?:\+?63|0)?\s?9\d{2}[\s.-]?\d{3}[\s.-]?\d{4}/;

  return emailPattern.test(value) || phonePattern.test(value);
}
