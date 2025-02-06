import { create } from "zustand";

export interface ReservationData {
  date: Date | undefined;
  schedule: string;
  adults: number;
  children: number;
  comments?: string;
  confirmed?: boolean;
  language?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  typeCurrency?: string;
}

interface ReservationState {
  reservation: ReservationData;
  setReservation: (data: Partial<ReservationData>) => void;
}

export const useReservation = create<ReservationState>((set) => ({
  reservation: {
    date: undefined,
    adults: 1,
    children: 0,
    schedule: "",
    comments: "",
    confirmed: false,
    language: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    typeCurrency: "DOLAR",
  },
  setReservation: (newData) =>
    set((state) => ({
      reservation: { ...state.reservation, ...newData },
    })),
}));
