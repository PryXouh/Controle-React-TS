export type Category = "tech" | "design";
export type BookingStatus = "confirmed" | "cancelled";

export interface Workshop {
  id: string;
  title: string;
  category: Category;
  durationMin: number;
  maxPlaces: number;
}

export interface Booking {
  id: string;
  workshopId: string;
  participant: string;
  quantity: number;
  status: BookingStatus;
}