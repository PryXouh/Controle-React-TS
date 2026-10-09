import { useState } from "react";
import type { FormEvent } from "react";
import type { Workshop } from "../types";
import { useBookings } from "../state/BookingContext";

export function BookingForm({ workshop }: { workshop: Workshop }) {
  const { dispatch } = useBookings();
  const [participant, setParticipant] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [participantError, setParticipantError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setConfirmation("");

    const name = participant.trim();
    const qty = Number(quantity);

    const nameMsg = name.length < 2 ? "Le nom doit contenir au moins 2 caractères." : "";
    const qtyMsg =
      Number.isInteger(qty) && qty >= 1 && qty <= workshop.maxPlaces
        ? ""
        : `La quantité doit être un entier entre 1 et ${workshop.maxPlaces}.`;

    setParticipantError(nameMsg);
    setQuantityError(qtyMsg);

    if (nameMsg || qtyMsg) return;

    dispatch({
      type: "create",
      id: crypto.randomUUID(),
      workshopId: workshop.id,
      participant: name,
      quantity: qty,
    });
    setConfirmation(`Inscription confirmée pour ${name} (${qty} place(s)).`);
    setParticipant("");
    setQuantity("1");
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="participant">Participant</label>
        <input
          id="participant"
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
        />
        {participantError && <p>{participantError}</p>}
      </div>

      <div>
        <label htmlFor="quantity">Quantité</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        {quantityError && <p>{quantityError}</p>}
      </div>

      <button type="submit">S'inscrire</button>
      {confirmation && <p role="status">{confirmation}</p>}
    </form>
  );
}