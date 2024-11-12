export enum InvoiceType {
  RECEIPT = "RECEIPT",
  INVOICE = "INVOICE",
}

export enum DocumentType {
  PASSPORT = "PASSPORT",
  DNI = "DNI",
}

export const INVOICES: InvoiceType[] = [
  InvoiceType.RECEIPT,
  InvoiceType.INVOICE,
];
export const DOCUMENT_TYPE: DocumentType[] = [
  DocumentType.DNI,
  DocumentType.PASSPORT,
];

export interface Receipt {
  documentType: string;
  number: string;
}
export interface Invoice extends Receipt {
  address?: string;
  name: string;
}

export interface InvoiceData extends Invoice {
  typeInvoice: InvoiceType;
}
