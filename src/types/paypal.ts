export interface PaypalTransactionData {
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
  paypalAmount: string;
  paypalOrderId: string;
  paypalOrderStatus: string;
  paypalDate: string;
  paypalCurrency: string;
}

export interface PayPalButtonProps {
  getTransactionData: () => {
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
    paypalAmount: string;
  };
  onNext: () => void;
  onPaymentSuccess: (data: PaypalTransactionData) => void;
}
