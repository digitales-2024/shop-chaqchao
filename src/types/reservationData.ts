// Definimos los tipos para los datos de la reserva
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
