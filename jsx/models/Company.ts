import { Enquiry } from "./Enquiry";
import { Invoice } from "./Invoice";

export interface Company {
    companyId?: number | null;
    companyName: string;
    addressLine: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
    email: string | null;
    phone: string | null;
    image: string | null;
    enquirerName: string | null;
    enquires: Enquiry[];
    invoices: Invoice[];
}
