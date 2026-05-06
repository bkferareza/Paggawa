import { useMemo, useState, type FormEvent } from "react";
import type { ComplaintNote } from "../../../shared/domain/models";
import type { CreateBarangayNoteInput } from "../../../shared/state/prototypeState";
import { formatCreatedDate } from "../../../shared/utils/formatting";

type BarangayNotesPanelProps = {
  notes: ComplaintNote[];
  targetId: string;
  targetLabel: string;
  targetType: ComplaintNote["targetType"];
  onCreateBarangayNote: (input: CreateBarangayNoteInput) => ComplaintNote;
};

export function BarangayNotesPanel({
  notes,
  targetId,
  targetLabel,
  targetType,
  onCreateBarangayNote,
}: BarangayNotesPanelProps) {
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");
  const targetNotes = useMemo(
    () =>
      notes.filter(
        (storedNote) =>
          storedNote.targetId === targetId && storedNote.targetType === targetType,
      ),
    [notes, targetId, targetType],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!note.trim()) {
      setFormError("Add a short note first.");
      return;
    }

    setFormError("");
    onCreateBarangayNote({
      targetType,
      targetId,
      note,
    });
    setNote("");
  }

  return (
    <div className="note-panel" aria-label={`Barangay notes for ${targetLabel}`}>
      <div className="note-heading">
        <span>Feedback / complaint note</span>
        <strong>{targetNotes.length}</strong>
      </div>

      <form className="note-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Short note</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Record a brief barangay-only note"
            rows={2}
            maxLength={180}
          />
        </label>
        {formError && (
          <p className="form-error compact-error" role="alert">
            {formError}
          </p>
        )}
        <button type="submit" className="secondary-button">
          Add note
        </button>
      </form>

      {targetNotes.length > 0 ? (
        <ul className="note-list">
          {targetNotes.map((storedNote) => (
            <li key={storedNote.id}>
              <p>{storedNote.note}</p>
              <time dateTime={storedNote.createdAt}>
                {formatCreatedDate(storedNote.createdAt)}
              </time>
            </li>
          ))}
        </ul>
      ) : (
        <p className="note-empty">No barangay notes yet.</p>
      )}
    </div>
  );
}
