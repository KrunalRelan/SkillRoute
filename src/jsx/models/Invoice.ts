import { InvoiceItem } from "./InvoiceItem";

export interface Invoice {
    cgst: number;
    sgst: number;
    igst: number;
    invoiceDate: string; // assuming date is stored as a string (ISO format)
    billedBy: {
        companyName: string;
        address: string;
        gstin: string;
        pan: string;
        email: string;
        phone: string;
    };
    billedTo: {
        companyName: string;
        address: string;
        gstin: string;
        pan: string;
        email: string;
        phone: string;
    };
    items: InvoiceItem[];
    subTotal: number;
    tax: number;
    totalAmount: number;
}


