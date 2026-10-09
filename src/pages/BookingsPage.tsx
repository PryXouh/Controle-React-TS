import { useBookings } from "../state/BookingContext";
import { useWorkshops } from "../assets/hooks/useWorkshops";

export function BookingsPage() {
  const { bookings, dispatch } = useBookings();
  const { workshops } = useWorkshops();

  function titleOf(workshopId: string) {
    return workshops.find((w) => w.id === workshopId)?.title ?? workshopId;
  }

  const total = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.quantity, 0);

  return (
    <section>
      <h1>Mes inscriptions</h1>

      {bookings.length === 0 && <p>Aucune inscription.</p>}

      <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            {titleOf(b.workshopId)} — {b.participant} — {b.quantity} place(s) — {b.status}
            {b.status === "confirmed" && (
              <button onClick={() => dispatch({ type: "cancel", id: b.id })}>
                Annuler
              </button>
            )}
          </li>
        ))}
      </ul>

      <p>Total des places confirmées : {total}</p>
    </section>
  );
}