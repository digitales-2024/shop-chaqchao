export interface CreatePayment {
  amount: number;
  currency: string;
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
  billingDetails?: BillingDeytails;
  shoppingCart?: ShoppingCart;
}

interface BillingDeytails {
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  country?: string; // PE
  state?: string;
  city?: string;
  identityType?: string; // Cédula de ciudadanía
  identityCode?: string; // Num de identificación
}

interface ShoppingCart {
  cartItemInfo: CartItemInfo[];
}

interface CartItemInfo {
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
