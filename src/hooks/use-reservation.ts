import { WorkshopRegistrationData } from "@/types";
import { create } from "zustand";

export interface ReservationData {
  time: any;
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
  occasion?: string;
  restrictions?: string;
}
export interface ReservationData {
  time: any;
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
  occasion?: string;
  restrictions?: string;
}

interface ReservationState {
  reservation: WorkshopRegistrationData;
  setReservation: (data: Partial<WorkshopRegistrationData>) => void;
  resetReservation: () => void;
}

const initialReservation: WorkshopRegistrationData = {
  id: "",
  typeClass: "NORMAL",
  userName: "",
  userEmail: "",
  userPhone: "",
  totalAdults: 1,
  totalChildren: 0,
  totalParticipants: 1,
  totalPrice: 0,
  totalPriceAdults: 0,
  totalPriceChildren: 0,
  languageClass: "",
  dateClass: undefined,
  scheduleClass: "",
  comments: "",
  allergies: "",
  occasion: "",
  typeCurrency: "USD",
  methodPayment: "",
};

export const useReservation = create<ReservationState>((set) => ({
  reservation: initialReservation,
  setReservation: (newData) =>
    set((state) => ({
      reservation: { ...state.reservation, ...newData },
    })),
  resetReservation: () => set({ reservation: initialReservation }),
}));
