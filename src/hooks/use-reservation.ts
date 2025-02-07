import { ReservationData as BaseReservationData } from "@/types/reservationData";
import { create } from "zustand";

// Extendemos el tipo base para mantener la consistencia
export type ReservationData = Omit<BaseReservationData, "date"> & {
  date: Date | undefined;
  adults: number;
  paymentMethod?: string;
  paymentStatus?: "pending" | "completed" | "failed";
  transactionId?: string;
};

interface ReservationState {
  reservation: ReservationData;
  setReservation: (data: Partial<ReservationData>) => void;
  resetReservation: () => void;
}

const initialReservation: ReservationData = {
  date: undefined,
  adults: 1,
  participants: 1,
  children: 0,
  time: "",
  schedule: "",
  allergies: "",
  comments: "",
  confirmed: false,
  language: "",
  userName: "",
  userEmail: "",
  userPhone: "",
  typeCurrency: "USD",
  totalAmount: 0,
  occasion: "",
  restrictions: "",
  paymentMethod: "",
  paymentStatus: "pending",
  transactionId: "",
};

export const useReservation = create<ReservationState>((set) => ({
  reservation: initialReservation,
  setReservation: (newData) =>
    set((state) => ({
      reservation: { ...state.reservation, ...newData },
    })),
  resetReservation: () => set({ reservation: initialReservation }),
}));
