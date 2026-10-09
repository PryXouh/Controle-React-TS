import { Link } from "react-router-dom";
import type { Workshop } from "../types";

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  return (
    <article>
      <h2>{workshop.title}</h2>
      <p>Catégorie : {workshop.category}</p>
      <Link to={`/workshops/${workshop.id}`}>Voir la fiche</Link>
      <p>Durée : {workshop.durationMin} min</p>
      <p>Maximum de places par inscription : {workshop.maxPlaces}</p>
    </article>
  );
}