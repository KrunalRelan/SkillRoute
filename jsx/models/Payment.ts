import { Invoice } from "./Invoice";

export interface Payment {
    paymentId: number;
    invoiceId: number;
    paymentDate: string;  // ISO date string
    amount: number;
    createdDate: string;  // ISO date string
    createdBy: number;
    updatedDate?: string; // optional ISO date string
    updatedBy?: number;   // optional
    isDeleted: boolean;
    isActive: boolean;
    invoice?: Invoice;    // optional navigation property
}