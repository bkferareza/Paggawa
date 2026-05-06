type ShellHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  onBack: () => void;
};

export function ShellHeader({
  eyebrow,
  title,
  description,
  onBack,
}: ShellHeaderProps) {
  return (
    <header className="shell-header">
      <button type="button" className="back-button" onClick={onBack}>
        Back
      </button>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  );
}
