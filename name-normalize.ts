/**
 * Normalizes a person name for matching across data sources. Strips
 * diacritics, lowercases, collapses space, and drops single-letter middle
 * initials (e.g. "Fernanda B. Viégas" and "Fernanda Viegas" both become
 * "fernanda viegas").
 */
export function collaboratorNameKey(name: string): string {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  const parts = base.split(" ").filter((p) => !/^[a-z]\.?$/.test(p));
  return parts.join(" ");
}
