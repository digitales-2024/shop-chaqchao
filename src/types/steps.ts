export interface ReservationData {
  date: Date | null;
  participants: number;
  children: number;
  time: string;
  allergies: string;
  confirmed: boolean;
  language: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  typeCurrency: string;
}

export interface Steps1Props {
  onNext: () => void;
  updateData: (data: Partial<ReservationData>) => void;
}

export interface Steps2Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<ReservationData>) => void;
  reservationData: ReservationData;
}

export interface Steps3Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<ReservationData>) => void;
  reservationData: ReservationData;
}

export interface Steps4Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { time: string }) => void;
  selectedDate: Date;
  reservationData: ReservationData;
}

export interface Steps5Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<ReservationData>) => void;
  selectedDate: Date;
  time: string;
  reservationData: ReservationData;
}

export interface Steps6Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { participants: number }) => void;
  selectedDate: Date;
  time: string;
  language: string | undefined;
  reservationData: ReservationData;
}

export interface Steps7Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<ReservationData>) => void;
  userName: string;
  userEmail: string;
  userPhone: string;
  selectedDate: Date;
  participants: number;
  time: string;
  language: string | undefined;
}

export interface ApiResponse {
  ok: boolean;
  message?: string;
  data?: {
    id: string;
  };
}

export interface ConfirmationProps {
  data: {
    userName: string;
    userEmail: string;
    userPhone: string;
    date: Date | null;
    participants: number;
    children: number;
    language: string;
    schedule: string;
    time: string;
    allergies: string;
    confirmed: boolean;
  };
}

export const enum TypeCurrency {
  Sol = "SOL",
  Dolar = "DOLAR",
}
