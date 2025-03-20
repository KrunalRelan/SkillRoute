import axios from "axios";
import { InvoiceItem } from "../jsx/models/InvoiceItem";

const API_URL = 'https://localhost:7170/api/invoiceitems';

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

export const getAllInvoiceItems = async () => {
    try {
        const response = await axios.get<InvoiceItem[]>('https://localhost:7170/api/invoice-item/all', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error getting invoice items:', error);
        throw new Error('Failed to retrieve invoice items');
    }
};