import type { Workshop } from "../types";

export async function getWorkshops(signal?: AbortSignal): Promise<Workshop[]> {
  const response = await fetch("/api/workshops.json", { signal });
  if (!response.ok) {
    throw new Error("Erreur HTTP " + response.status);
  }
  return (await response.json()) as Workshop[];
}