import { create } from "zustand";

export interface ReservationData {
  date: Date | undefined;
  adults: number;
  children: number;
  time: string;
  comments: string;
  confirmed: boolean;
  language: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  typeCurrency: string;
}

interface ReservationState {
  reservation: ReservationData;
  setReservation: (data: ReservationData) => void;
}

export const useReservation = create<ReservationState>((set) => ({
  reservation: {
    date: undefined,
    adults: 1,
    children: 0,
    time: "",
    comments: "",
    confirmed: false,
    language: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    typeCurrency: "DOLAR",
  },
  setReservation: (reservation: Partial<ReservationData>) =>
    set((state) => ({ reservation: { ...state.reservation, ...reservation } })),
}));
