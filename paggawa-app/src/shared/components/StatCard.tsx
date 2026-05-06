type StatCardProps = {
  label: string;
  value: number | string;
  detail: string;
  tone?: "green" | "amber" | "blue" | "red";
};

export function StatCard({ label, value, detail, tone = "green" }: StatCardProps) {
  return (
    <article className={`stat-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}
