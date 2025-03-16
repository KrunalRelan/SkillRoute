import axios from 'axios';

import { TrainerRegistration } from '../jsx/models/TrainerRegistration';

const API_URL = 'https://localhost:7170/api/TrainerRegistration';

// Ensure XSRF token is included in all Axios requests
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// Function to get the anti-forgery token
const getAntiForgeryToken = async () => {
    try {
        const response = await axios.get(`https://localhost:7170/api/get-token`);

        return response.data.token;
    } catch (error) {
        console.error('Error getting anti-forgery token:', error);  // Detailed logging
        throw new Error('Failed to retrieve anti-forgery token');
    }
};

// Function to save trainer details
export async function saveTrainer(trainer: TrainerRegistration) {
    try {
        // If you have an anti-forgery token:
        const token = await getAntiForgeryToken();

        // POST JSON to /save-trainer
        const response = await axios.post(`${API_URL}/save-trainer`, trainer, {
            headers: {
                "X-XSRF-TOKEN": token,
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error("Error saving trainer details:", error);
        throw new Error("Failed to save trainer details");
    }
}

export const getAllTrainers = async () => {
    try {
        const response = await axios.get(`${API_URL}/trainers`);

        return response.data;
    } catch (error) {
        console.error('Error getting companies:', error);  // Log error details
        throw new Error('Failed to retrieve companies');
    }
};

// Function to get a single trainer by ID
export const getTrainerById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/trainer`);
        return response.data;
    } catch (error) {
        console.error('Error getting company details:', error);
        throw new Error('Failed to retrieve company details');
    }
};

// Function to update company details
export const updateTrainer = async (id: number, trainerDetails: TrainerRegistration) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.put(`${API_URL}/${id}/update-trainer`, trainerDetails, {
            headers: {
                'X-XSRF-TOKEN': token
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error updating company details:', error);
        throw new Error('Failed to update company details');
    }
};

// Function to delete a company
export const deleteTrainer = async (id: number) => {
    try {
        const token = await getAntiForgeryToken();
        const response = await axios.delete(`${API_URL}/${id}/delete-trainer`, {
            headers: {
                'X-XSRF-TOKEN': token
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting company:', error);
        throw new Error('Failed to delete company');
    }
};
