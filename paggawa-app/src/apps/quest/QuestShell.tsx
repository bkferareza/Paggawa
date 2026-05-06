import { ShellHeader } from "../../shared/components/ShellHeader";
import { BarangayDashboard } from "./barangay/BarangayDashboard";

type QuestShellProps = {
  onBack: () => void;
};

export function QuestShell({ onBack }: QuestShellProps) {
  return (
    <section className="surface-page quest-page">
      <ShellHeader
        eyebrow="Paggawa Quest"
        title="Barangay hall workspace"
        description="A dashboard-only preview for assisted-access staff workflows."
        onBack={onBack}
      />
      <BarangayDashboard />
    </section>
  );
}
