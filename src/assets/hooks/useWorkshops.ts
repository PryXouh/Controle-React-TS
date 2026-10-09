import { useEffect, useState } from "react";
import type { Workshop } from "../../types";
import { getWorkshops } from "../../services/workshopService";

export function useWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getWorkshops(controller.signal)
      .then((data) => {
        setWorkshops(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setError("Impossible de charger les ateliers.");
        setLoading(false);
      });

    return () => controller.abort(); 
  }, [attempt]);

  function retry() {
    setLoading(true);
    setError(null);
    setAttempt((a) => a + 1);
  }

  return { workshops, loading, error, retry };
}