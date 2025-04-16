import { InvoiceItem } from "./InvoiceItem";

export interface Invoice {
    invoiceNumber?: string;
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
        companyId: number | null;
        companyName: string;
        address: string;
        gstn: string;
        pan: string;
        email: string;
        phone: string;
        enquiryId: number | null;
        enquiryName: string | null;
    };
    items: {
        itemId: number;
        itemDescription: string;
        quantity: number;
        rate: number;
        gstPercentage: number;
        amount: number;
    }[];
    subTotal: number;
    tax: number;
    totalAmount: number;
}


