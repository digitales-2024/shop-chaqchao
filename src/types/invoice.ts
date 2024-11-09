export type InvoiceType = "RECEIPT" | "INVOICE";

export const INVOICES: InvoiceType[] = ["RECEIPT", "INVOICE"];

export interface Invoice {
  documentType: string;
  number: string;
  address?: string;
  name?: string;
}

export interface InvoiceData extends Invoice {
  typeInvoice: InvoiceType;
}
