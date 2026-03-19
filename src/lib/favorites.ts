const STORAGE_KEY = "inpinity-city-favorites";

export function getFavoritePlotIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function isFavoritePlot(id: string): boolean {
  return getFavoritePlotIds().includes(id);
}

export function toggleFavoritePlot(id: string): string[] {
  const current = getFavoritePlotIds();
  const next = current.includes(id)
    ? current.filter((v) => v !== id)
    : [...current, id];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}