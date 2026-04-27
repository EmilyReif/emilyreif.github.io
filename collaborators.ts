import { collaboratorNameKey } from "./name-normalize";
import { projects } from "./projects";

export type CollaboratorStat = { name: string; count: number };

function preferRicherName(current: string, next: string): string {
  if (next.length > current.length) {
    return next;
  }
  return current;
}

/** Counts how many projects each person appears on (co-authorship or credited collaboration). */
export function buildCollaboratorStats(): CollaboratorStat[] {
  const counts = new Map<string, { name: string; count: number }>();
  for (const p of projects) {
    for (const c of p.collaborators) {
      const k = collaboratorNameKey(c);
      const ex = counts.get(k);
      if (ex) {
        ex.count += 1;
        ex.name = preferRicherName(ex.name, c);
      } else {
        counts.set(k, { name: c, count: 1 });
      }
    }
  }
  return Array.from(counts.values()).sort((a, b) => b.count - a.count);
}

export const COLLABORATOR_STATS: readonly CollaboratorStat[] =
  buildCollaboratorStats();
