import { useState } from "react";
import { MobileShell } from "./apps/mobile/MobileShell";
import { QuestShell } from "./apps/quest/QuestShell";
import { SurfaceSelector } from "./shared/components/SurfaceSelector";
import {
  privacyDisplayRules,
  type SurfaceKey,
  usePrototypeState,
} from "./shared/state/prototypeState";

export default function App() {
  const [activeSurface, setActiveSurface] = useState<SurfaceKey | null>(null);
  const {
    barangayNotes,
    acceptWorkerResponse,
    completeMatchedJob,
    createBarangayNote,
    createJobResponse,
    createJobRequest,
    createWorkerProfile,
    jobResponses,
    jobRequests,
    matches,
    openJobRequests,
    reviews,
    shellSummary,
    updateQuestJobStatus,
    workerProfiles,
  } = usePrototypeState();

  return (
    <main className="app-shell">
      <header className="brand-bar">
        <div>
          <p className="eyebrow">Paggawa v0.1</p>
          <h1>Local work discovery shell</h1>
        </div>
        <div className="data-pill">
          {shellSummary.totalWorkers} workers / {shellSummary.totalOpenJobs} open jobs
        </div>
      </header>

      {activeSurface === null && (
        <SurfaceSelector summary={shellSummary} onSelect={setActiveSurface} />
      )}

      {activeSurface === "mobile" && (
        <MobileShell
          jobResponses={jobResponses}
          jobRequests={jobRequests}
          matches={matches}
          onBack={() => setActiveSurface(null)}
          onAcceptWorkerResponse={acceptWorkerResponse}
          onCompleteMatchedJob={completeMatchedJob}
          onCreateJobRequest={createJobRequest}
          onCreateJobResponse={createJobResponse}
          openJobRequests={openJobRequests}
          reviews={reviews}
          workerProfiles={workerProfiles}
        />
      )}

      {activeSurface === "quest" && (
        <QuestShell
          barangayNotes={barangayNotes}
          jobRequests={jobRequests}
          matches={matches}
          onBack={() => setActiveSurface(null)}
          onCreateBarangayNote={createBarangayNote}
          onCreateJobRequest={createJobRequest}
          onCreateWorkerProfile={createWorkerProfile}
          onUpdateQuestJobStatus={updateQuestJobStatus}
          workerProfiles={workerProfiles}
        />
      )}

      <footer className="guardrail-footer" aria-label="Lane 02 privacy guardrails">
        {privacyDisplayRules.map((rule) => (
          <span key={rule}>{rule}</span>
        ))}
      </footer>
    </main>
  );
}
