import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/workshops">Retour au catalogue</Link>
    </section>
  );
}