export interface TransactionData {
  userName: string;
  userEmail: string;
  userPhone: string;
  scheduleClass: string;
  languageClass: string;
  dateClass: string;
  totalAdults: number;
  totalChildren: number;
  typeCurrency: string;
  comments: string;
  paypalAmount?: string;
  paypalOrderId?: string;
  paypalOrderStatus?: string;
  paypalDate?: string;
  paypalCurrency?: string;
  izipayAmount?: string;
  izipayOrderId?: string;
  izipayOrderStatus?: string;
  izipayDate?: string;
  izipayCurrency?: string;
  id?: string;
}
