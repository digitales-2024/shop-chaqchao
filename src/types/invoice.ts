export enum InvoiceType {
  RECEIPT = "RECEIPT",
  INVOICE = "INVOICE",
}

export enum DocumentType {
  PASSPORT = "PASSPORT",
  DNI = "DNI",
}

export enum DocumentTypeInvoice {
  RUC = "RUC",
}

export const INVOICES: InvoiceType[] = [
  InvoiceType.RECEIPT,
  InvoiceType.INVOICE,
];
export const DOCUMENT_TYPE: DocumentType[] = [
  DocumentType.DNI,
  DocumentType.PASSPORT,
];

export const DOCUMENT_TYPE_INVOICE: DocumentTypeInvoice[] = [
  DocumentTypeInvoice.RUC,
];

export interface Receipt {
  documentType: string;
  number: string;
  address: string;
  country: string;
  state: string;
  city: string;
  codPostal: string;
  nameBusiness?: string;
}
export type Invoice = Receipt;

export interface ReceiptData extends Receipt {
  typeInvoice: InvoiceType;
}
export interface InvoiceData extends Invoice {
  typeInvoice: InvoiceType;
}

export interface InvoiceCreate {
  billingDocumentType: InvoiceType;
  typeDocument: string;
  documentNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  paymentStatus: PaymentStatus;
  businessName?: string;
}

export enum PaymentStatus {
  PAID = "PAID",
  RUNNING = "RUNNING",
  UNPAID = "UNPAID",
  ABANDONED = "ABANDONED",
}
