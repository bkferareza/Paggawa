import { useMemo, useState } from "react";
import { StatusSelect } from "../../../shared/components/StatusSelect";
import {
  skillCategories,
  type ComplaintNote,
  type JobRequest,
  type JobSource,
  type Match,
  type QuestManageableJobStatus,
  type SkillCategory,
  type WorkerProfile,
} from "../../../shared/domain/models";
import {
  getMatchForJob,
  getWorkerById,
  type CreateBarangayNoteInput,
} from "../../../shared/state/prototypeState";
import {
  formatBudgetRange,
  formatCreatedDate,
  formatJobSource,
  formatJobStatus,
  formatRequesterType,
  formatUrgency,
} from "../../../shared/utils/formatting";
import { BarangayNotesPanel } from "./BarangayNotesPanel";

type StatusFilter = "all" | QuestManageableJobStatus;
type QuestVisibleStatusFilter = StatusFilter | "matched" | "completed";
type CategoryFilter = "all" | SkillCategory;
type SourceFilter = "all" | JobSource;

type QuestBoardViewProps = {
  jobs: JobRequest[];
  matches: Match[];
  notes: ComplaintNote[];
  onCreateBarangayNote: (input: CreateBarangayNoteInput) => ComplaintNote;
  onUpdateQuestJobStatus: (
    jobId: string,
    status: QuestManageableJobStatus,
  ) => void;
  workerProfiles: WorkerProfile[];
};

export function QuestBoardView({
  jobs,
  matches,
  notes,
  onCreateBarangayNote,
  onUpdateQuestJobStatus,
  workerProfiles,
}: QuestBoardViewProps) {
  const [statusFilter, setStatusFilter] = useState<QuestVisibleStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const statusMatches =
          statusFilter === "all" || job.status === statusFilter;
        const categoryMatches =
          categoryFilter === "all" || job.category === categoryFilter;
        const sourceMatches = sourceFilter === "all" || job.source === sourceFilter;

        return statusMatches && categoryMatches && sourceMatches;
      }),
    [categoryFilter, jobs, sourceFilter, statusFilter],
  );

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">Quest board</p>
        <h2>Local job requests</h2>
      </div>

      <div className="quest-filter-grid" aria-label="Quest board filters">
        <label className="form-field compact-field">
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as QuestVisibleStatusFilter)
            }
          >
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="needs_follow_up">Needs follow-up</option>
            <option value="cancelled">Cancelled</option>
            <option value="matched">Matched</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label className="form-field compact-field">
          <span>Category</span>
          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value as CategoryFilter)
            }
          >
            <option value="all">All categories</option>
            {skillCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field compact-field">
          <span>Source</span>
          <select
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value as SourceFilter)}
          >
            <option value="all">All sources</option>
            <option value="mobile">Mobile</option>
            <option value="barangay">Barangay</option>
          </select>
        </label>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="quest-board-list">
          {filteredJobs.map((job) => {
            const match = getMatchForJob(job.id, matches);
            const matchedWorker = match
              ? getWorkerById(match.workerProfileId, workerProfiles)
              : undefined;

            return (
              <article
                className="preview-card job-card quest-board-card"
                key={job.id}
              >
                <div className="card-row">
                  <span className="category-pill">{job.category}</span>
                  <span className="status-pill">{formatJobStatus(job.status)}</span>
                </div>

                <h3>{job.title}</h3>

                <dl className="detail-list">
                  <div>
                    <dt>Area</dt>
                    <dd>{job.areaLabel}</dd>
                  </div>
                  <div>
                    <dt>Urgency</dt>
                    <dd>{formatUrgency(job.urgency)}</dd>
                  </div>
                  <div>
                    <dt>Budget</dt>
                    <dd>{formatBudgetRange(job)}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>{formatJobSource(job.source)}</dd>
                  </div>
                  <div>
                    <dt>Request</dt>
                    <dd>{formatRequesterType(job.requesterType)}</dd>
                  </div>
                  <div>
                    <dt>Created</dt>
                    <dd>{formatCreatedDate(job.createdAt)}</dd>
                  </div>
                  {match && (
                    <div>
                      <dt>Matched worker</dt>
                      <dd>{matchedWorker?.displayName ?? "Worker profile unavailable"}</dd>
                    </div>
                  )}
                </dl>

                {isQuestManageableStatus(job.status) && (
                  <StatusSelect
                    id={`quest-status-${job.id}`}
                    label="Board status"
                    value={job.status}
                    onChange={(nextStatus) =>
                      onUpdateQuestJobStatus(job.id, nextStatus)
                    }
                  />
                )}

                <BarangayNotesPanel
                  notes={notes}
                  targetId={job.id}
                  targetLabel={job.title}
                  targetType="job"
                  onCreateBarangayNote={onCreateBarangayNote}
                />

                <p className="privacy-note">{job.privacyNote}</p>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="empty-state">No quest board jobs match these filters.</p>
      )}
    </section>
  );
}

function isQuestManageableStatus(
  status: JobRequest["status"],
): status is QuestManageableJobStatus {
  return (
    status === "open" || status === "needs_follow_up" || status === "cancelled"
  );
}
