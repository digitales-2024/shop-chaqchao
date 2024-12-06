import { ClientData } from "./client";

export type OrderClient = {
  id: string;
  pickupCode: string;
  orderStatus: string;
  totalAmount: null;
  pickupTime: Date;
  client: ClientData;
};

export enum BillingDocumentType {
  INVOICE,
  RECEIPT,
}

export type OrderDetails = {
  id: string;
  orderStatus: string;
  pickupAddress: string;
  pickupTime: Date;
  isActive: boolean;
  someonePickup: boolean;
  pickupCode: string;
  totalAmount: null;
  client: Client;
  cart: Cart;
  billingDocument: BillingDocument;
};

type BillingDocument = {
  billingDocumentType: BillingDocumentType;
  documentNumber: string;
  address: string;
  state: string;
  country: string;
  city: string;
  postalCode: string;
  typeDocument: string;
  businessName: string;
  paymentStatus: PaymentStatus;
};
enum PaymentStatus {
  PAID,
  PENDING,
  FAILED,
}

export type Cart = { quantity: number; products: ProductData[] };

type ProductData = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: CategoryData;
};
type CategoryData = {
  id: string;
  name: string;
};

type Client = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
};
