import { Key } from "react";

export interface InvoiceItem {
    itemId: number;
    itemDescription: string;
    quantity: number;
    rate: number;
    gstPercentage: number;
}