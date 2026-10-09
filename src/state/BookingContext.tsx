import { createContext, useContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import type { Booking } from "../types";
import { bookingReducer } from "./bookingReducer";
import type { BookingAction } from "./bookingReducer";

interface BookingContextValue {
  bookings: Booking[];
  dispatch: Dispatch<BookingAction>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, dispatch] = useReducer(bookingReducer, []);
  return (
    <BookingContext.Provider value={{ bookings, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings doit être utilisé dans un BookingProvider");
  }
  return context;
}