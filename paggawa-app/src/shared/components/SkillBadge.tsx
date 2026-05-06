import type { SkillCategory } from "../domain/models";

type SkillBadgeProps = {
  skill: SkillCategory;
};

export function SkillBadge({ skill }: SkillBadgeProps) {
  return <span className="skill-badge">{skill}</span>;
}
