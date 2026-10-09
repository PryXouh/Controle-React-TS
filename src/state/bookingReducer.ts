import type { Booking } from "../types";

export type BookingAction =
  | { type: "create"; id: string; workshopId: string; participant: string; quantity: number }
  | { type: "cancel"; id: string };

export function bookingReducer(state: Booking[], action: BookingAction): Booking[] {
  switch (action.type) {
    case "create":
      return [
        ...state,
        {
          id: action.id,
          workshopId: action.workshopId,
          participant: action.participant,
          quantity: action.quantity,
          status: "confirmed",
        },
      ];
    case "cancel": {
      const target = state.find((b) => b.id === action.id);
      // id absent ou déjà annulée : on renvoie le même état
      if (!target || target.status === "cancelled") return state;
      return state.map((b) =>
        b.id === action.id ? { ...b, status: "cancelled" as const } : b
      );
    }
    default:
      return state;
  }
}