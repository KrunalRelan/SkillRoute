import { Key } from "react";

export interface InvoiceItem {
    itemId: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
    id?: string;
    gstPercentage: number;
    taxAmount: number;
    total: number;
}