// /src/services/InvoiceService.ts
import axios from 'axios';
import { Invoice } from '../jsx/models/Invoice';
import { InvoiceItem } from '../jsx/models/InvoiceItem';

const API_URL = 'https://localhost:7170/api/invoice';

// Ensure XSRF token is included in all Axios requests
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// Function to get the anti-forgery token
const getAntiForgeryToken = async () => {
    try {
        const response = await axios.get('https://localhost:7170/api/get-token');
        return response.data.token;
    } catch (error) {
        console.error('Error getting anti-forgery token:', error);
        throw new Error('Failed to get anti-forgery token');
    }
};

// -------------------- CREATE (POST) --------------------
export const createInvoice = async (invoice: Invoice) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.post<Invoice>(
            `${API_URL}`,
            invoice,
            {
                headers: {
                    'X-XSRF-TOKEN': token
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw new Error('Failed to create invoice');
    }
};

// -------------------- READ (GET ALL) --------------------
export const getAllInvoices = async () => {
    try {
        const response = await axios.get<Invoice[]>(`${API_URL}/all`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error getting invoices:', error);
        throw new Error('Failed to retrieve invoices');
    }
};

// -------------------- READ (GET BY ID) --------------------
export const getInvoiceById = async (id: number) => {
    try {
        const response = await axios.get<Invoice>(`${API_URL}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error getting invoice details:', error);
        throw new Error('Failed to retrieve invoice details');
    }
};


// -------------------- UPDATE (PUT) --------------------
export const updateInvoice = async (id: number, invoice: Invoice) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.put<Invoice>(
            `${API_URL}/${id}`,
            invoice,
            {
                headers: {
                    'X-XSRF-TOKEN': token
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating invoice:', error);
        throw new Error('Failed to update invoice');
    }
};

// -------------------- DELETE --------------------
export const deleteInvoice = async (id: number) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'X-XSRF-TOKEN': token
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting invoice:', error);
        throw new Error('Failed to delete invoice');
    }
};

// -------------------- MARK AS PAID --------------------
export const markAsPaid = async (id: number) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.put<Invoice>(
            `${API_URL}/paid/${id}`,
            null,
            {
                headers: {
                    'X-XSRF-TOKEN': token
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error marking invoice as paid:', error);
        throw new Error('Failed to mark invoice as paid');
    }
};

// -------------------- MARK AS UNPAID --------------------
export const markAsUnpaid = async (id: number) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.put<Invoice>(
            `${API_URL}/unpaid/${id}`,
            null,
            {
                headers: {
                    'X-XSRF-TOKEN': token
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error marking invoice as unpaid:', error);
        throw new Error('Failed to mark invoice as unpaid');
    }
};

// -------------------- MARK AS PARTIALLY PAID --------------------
export const markAsPartiallyPaid = async (id: number) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.put<Invoice>(
            `${API_URL}/partiallypaid/${id}`,
            null,
            {
                headers: {
                    'X-XSRF-TOKEN': token
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error marking invoice as partially paid:', error);
        throw new Error('Failed to mark invoice as partially paid');
    }
};

export const getAllInvoiceItems = async () => {
    try {
        const response = await axios.get<InvoiceItem[]>(`${API_URL}/items`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error getting invoice items:', error);
        throw new Error('Failed to retrieve invoice items');
    }
}
