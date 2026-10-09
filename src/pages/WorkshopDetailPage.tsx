import { Link, useParams } from "react-router-dom";
import { useWorkshops } from "../hooks/useWorkshops";
import { ErrorMessage } from "../components/ErrorMessage";

export function WorkshopDetailPage() {
  const { id } = useParams();
  const { workshops, loading, error, retry } = useWorkshops();

  if (loading) return <p>Chargement...</p>;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  const workshop = workshops.find((w) => w.id === id);

  if (!workshop) {
    return (
      <section>
        <p>Atelier introuvable</p>
        <Link to="/workshops">Retour au catalogue</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/workshops">Retour au catalogue</Link>
      <h1>{workshop.title}</h1>
      <p>Catégorie : {workshop.category}</p>
      <p>Durée : {workshop.durationMin} min</p>
      <p>Maximum de places par inscription : {workshop.maxPlaces}</p>
      {/* Le formulaire d'inscription arrive à l'exercice 3 */}
    </section>
  );
}