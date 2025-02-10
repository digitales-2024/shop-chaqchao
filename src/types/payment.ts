export interface CreatePayment {
  amount: number;
  currency: "USD" | "PEN";
  orderId: string;
  customer: Customer;
  transactionOptions?: TransactionOptions;
  subMerchantDetails?: SubMerchantDetails;
}

interface SubMerchantDetails {
  companyType: string;
  legalNumber: string;
  name: string;
  url: string;
  phoneNumber: string;
  address1: string;
  city: string;
  country: string;
}

interface Customer {
  reference?: string;
  email: string;
  billingDetails?: BillingDetails;
  shoppingCart?: ShoppingCart;
}

interface BillingDetails {
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  country?: string; // PE
  state?: string;
  city?: string;
  identityType?: string; // Cédula de ciudadanía
  identityCode?: string; // Num de identificación
}

interface ShoppingCart {
  cartItemInfo?: CartItemInfo[];
}

export interface CartItemInfo {
  productLabel?: string;
  productType?: ProductType;
  productQty?: number;
  productAmount?: number;
}

enum ProductType {
  FOOD_AND_GROCERY = "FOOD_AND_GROCERY", //Alimentos y productos comestibles.
}

interface TransactionOptions {
  cardOptions: CardOptions;
}

interface CardOptions {
  paymentSource?: PaymentSource;
}

enum PaymentSource {
  EC = "EC", // Ecommerce
}

export interface PaymentMethod {
  onPaymentSuccess?: (status: string) => void;
  onPaymentError?: () => void;
}

// Interface antigua para mantener compatibilidad
export interface PaypalTransactionData {
  paypalOrderId: string;
  paypalOrderStatus: string;
  paypalAmount: string;
  paypalCurrency: string;
  paypalDate: string;
  id: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  dateClass: string;
  scheduleClass: string;
  languageClass: string;
  totalAdults: number;
  totalChildren: number;
  typeCurrency: string;
  comments: string;
}

export interface PaypalPaymentMethodProps extends PaymentMethod {
  transactionData: PaypalTransactionData;
}

// Nueva interfaz genérica para el registro de clases
export interface WorkshopRegistrationData {
  id?: string;
  typeClass: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  totalAdults: number;
  totalChildren: number;
  totalParticipants: number;
  totalPrice: number;
  totalPriceAdults: number;
  totalPriceChildren: number;
  languageClass: string;
  dateClass?: Date;
  scheduleClass: string;
  allergies?: string;
  occasion?: string;
  comments?: string;
  status?: string;
  expiresAt?: string;
  isClosed?: boolean;
  typeCurrency: "USD" | "PEN";
  methodPayment: "PAYPAL" | "IZIPAY";

  // Campos específicos de PayPal
  paypalOrderId?: string;
  paypalOrderStatus?: string;
  paypalAmount?: string;
  paypalCurrency?: string;
  paypalDate?: string;
  // Campos específicos de Izipay
  izipayTransactionId?: string;
  izipayAuthCode?: string;
  izipayCardBrand?: string;
  izipayLastFourDigits?: string;
}

export interface Payment {
  requestSource: string;
  merchantCode: string;
  orderNumber: string;
  publicKey: string;
  amount: string;
}

export interface ResponsePayment {
  code: string;
  message: string;
  response: Token;
}

export interface Token {
  token: string;
}
