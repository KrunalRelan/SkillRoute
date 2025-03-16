import axios from 'axios';
import { Enquiry } from '../jsx/models/Enquiry';
import { RegisterCompany } from '../jsx/models/RegisterCompany';
import Error500 from '../jsx/pages/Error500';

const API_URL = 'https://localhost:7170/api/company';

// Ensure XSRF token is included in all Axios requests
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// Function to get the anti-forgery token
const getAntiForgeryToken = async () => {
    try {
        const response = await axios.get(`https://localhost:7170/api/get-token`);

        return response.data.token;
    } catch (error) {
        Error500(`Failed to retrieve anti-forgery token: ${error}`);
    }
};

// Function to save company details
export const saveEnquiry = async (enquiry: Enquiry) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.post(`${API_URL}/saveenquiry`, enquiry, {
            headers: {
                'X-XSRF-TOKEN': token
            },
            withCredentials: true
        });

        return response;
    } catch (error) {

        Error500(`Error saving company details: ${error}`);
    }
};

export const getAllEnquiries = async () => {
    try {
        const response = await axios.get(`${API_URL}/enquiries`);

        return response.data;
    } catch (error) {
        Error500(`Failed to retrieve companies: ${error}`);
    }
};

// Function to get a single company by ID
export const getEnquiryById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        Error500(`Failed to retrieve company details: ${error}`);
    }
};

// Function to update company details
export const updateEnquiry = async (id: number, companyDetails: Enquiry) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.put(`${API_URL}/enquries/${id}`, companyDetails, {
            headers: {
                'X-XSRF-TOKEN': token
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        Error500(`Failed to update company details: ${error}`);
    }
};

// Function to delete a company
export const deleteEnquiry = async (id: number) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.delete(`${API_URL}/delete-enquiry/ ${id}`, {
            headers: {
                'X-XSRF-TOKEN': token
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        Error500(`Failed to delete company: ${error}`);
    }
};

export const saveCompany = async (registerCompany: RegisterCompany) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.post(`${API_URL}/registercompny`, registerCompany, {
            headers: {
                'X-XSRF-TOKEN': token
            },
            withCredentials: true
        });

        return response;
    } catch (error) {
        Error500(`Error registering company: ${error}`);
    }
}
// Function to get a single company by ID
export const getAllCompanies = async () => {
    try {
        const response = await axios.get(`${API_URL}/companies`);
        return response.data;
    } catch (error) {
        Error500(`Failed to retrieve companies: ${error}`);
    }
};

export const getCompanyById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        Error500(`Failed to retrieve company details: ${error}`);
    }
}

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    } catch (error) {
        Error500(`Failed to retrieve categories: ${error}`);
    }
}