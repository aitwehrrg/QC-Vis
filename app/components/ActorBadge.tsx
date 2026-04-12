import { ACTOR_COLORS } from "@/app/lib/constants";

interface ActorBadgeProps {
  actor: "A" | "B" | "C";
  showLabel?: boolean;
}

export default function ActorBadge({ actor, showLabel = false }: ActorBadgeProps) {
  const classMap = { A: "actor-badge-a", B: "actor-badge-b", C: "actor-badge-c" };
  const info = ACTOR_COLORS[actor];
  const nameMap = { A: "Alice", B: "Bob", C: "Eve" };

  return (
    <span className={`actor-badge ${classMap[actor]}`} title={info.label}>
      <span aria-hidden="true">●</span>
      {nameMap[actor]}
      {showLabel && ` (${actor === "A" ? "Sender" : actor === "B" ? "Receiver" : "Eavesdropper"})`}
    </span>
  );
}
