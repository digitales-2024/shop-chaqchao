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
}
export interface Invoice extends Receipt {
  nameBusiness?: string;
}

export interface ReceiptData extends Receipt {
  typeInvoice: InvoiceType;
}
export interface InvoiceData extends Invoice {
  typeInvoice: InvoiceType;
}
