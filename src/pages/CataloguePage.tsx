import { useState } from "react";
import { useWorkshops } from "../assets/hooks/useWorkshops";
import { ErrorMessage } from "../components/ErrorMessage";
import { WorkshopCard } from "../components/WorkshopCard";
import type { Category } from "../types";

type CategoryFilter = "all" | Category;

export function CataloguePage() {
  const { workshops, loading, error, retry } = useWorkshops();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  if (loading) return <p>Chargement...</p>;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
  if (workshops.length === 0) return <p>Aucun atelier disponible pour le moment.</p>;

  const filtered = workshops.filter((w) => {
    const matchTitle = w.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchCategory = category === "all" || w.category === category;
    return matchTitle && matchCategory;
  });

  return (
    <section>
      <h1>Catalogue</h1>

      <label htmlFor="search">Rechercher un atelier</label>
      <input
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label htmlFor="category">Catégorie</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value as CategoryFilter)}
      >
        <option value="all">Toutes</option>
        <option value="tech">Tech</option>
        <option value="design">Design</option>
      </select>

      <p>{filtered.length} résultat(s)</p>

      {filtered.length === 0 && <p>Aucun atelier ne correspond.</p>}

      {filtered.map((w) => (
        <WorkshopCard key={w.id} workshop={w} />
      ))}
    </section>
  );
}