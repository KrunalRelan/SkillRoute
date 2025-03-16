export interface InvoiceItem {
    invoiceItemId?: number;
    invoiceId?: number;       // for DB foreign key
    description: string;      // e.g. "Trainer Fees"
    quantity: number;         // e.g. 2 sessions or 1 hotel booking
    rate: number;             // price per unit
    amount: number;           // auto-calculated = quantity * rate
}