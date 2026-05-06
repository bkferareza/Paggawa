import { useMemo, useState } from "react";
import { WorkerPreviewCard } from "../../../shared/components/WorkerPreviewCard";
import {
  skillCategories,
  type SkillCategory,
  type WorkerProfile,
} from "../../../shared/domain/models";
import { getResidentDiscoveryWorkers } from "../../../shared/state/prototypeState";
import { WorkerProfileView } from "./WorkerProfileView";

type WorkerCategoryFilter = "All" | SkillCategory;

type NearbyWorkersViewProps = {
  workerProfiles: WorkerProfile[];
};

export function NearbyWorkersView({ workerProfiles }: NearbyWorkersViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<WorkerCategoryFilter>("All");
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const workers = useMemo(
    () =>
      getResidentDiscoveryWorkers(
        selectedCategory === "All" ? undefined : selectedCategory,
        workerProfiles,
      ),
    [selectedCategory, workerProfiles],
  );

  const selectedWorker =
    workers.find((worker) => worker.id === selectedWorkerId) ?? workers[0] ?? null;

  return (
    <section className="dashboard-section worker-discovery-section">
      <div className="section-heading">
        <p className="eyebrow">Resident discovery</p>
        <h2>Nearby workers</h2>
      </div>

      <div className="filter-scroll" aria-label="Filter workers by skill category">
        <button
          type="button"
          className={selectedCategory === "All" ? "filter-button active" : "filter-button"}
          onClick={() => setSelectedCategory("All")}
          aria-pressed={selectedCategory === "All"}
        >
          All
        </button>
        {skillCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              selectedCategory === category ? "filter-button active" : "filter-button"
            }
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      {workers.length > 0 ? (
        <div className="worker-discovery-layout">
          <div className="card-grid worker-directory-grid">
            {workers.map((worker) => (
              <WorkerPreviewCard
                key={worker.id}
                worker={worker}
                selected={selectedWorker?.id === worker.id}
                onViewProfile={(nextWorker) => setSelectedWorkerId(nextWorker.id)}
              />
            ))}
          </div>

          {selectedWorker && <WorkerProfileView worker={selectedWorker} />}
        </div>
      ) : (
        <p className="empty-state">No nearby workers match this skill category.</p>
      )}
    </section>
  );
}
