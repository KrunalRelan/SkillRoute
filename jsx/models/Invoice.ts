import { InvoiceItem } from "./InvoiceItem";

export interface Invoice {
    invoiceId?: number;
    companyId: number | null;
    companyName: string;
    invoiceDate?: string;     // can store date from server or front end
    subTotal: number;
    commissionCut: number;
    tax: number;
    totalAmount: number;
    // If you have payment status in your DB:
    paymentStatus?: number;   // 0=Unpaid, 1=Partial, 2=Paid, etc.

    // Line items
    items: InvoiceItem[];
}