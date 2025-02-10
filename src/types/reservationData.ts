// Definimos los tipos para los datos de la reserva
export interface ReservationData {
  date: Date | null;
  participants: number;
  children: number;
  allergies: string;
  confirmed: boolean;
  language: string;
  schedule: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  typeCurrency: "USD" | "PEN";
  totalAmount: number;
  paymentMethod?: string;
  paymentStatus?: "pending" | "completed" | "failed";
  transactionId?: string;
  occasion?: string;
  restrictions?: string;
  comments?: string;
}
