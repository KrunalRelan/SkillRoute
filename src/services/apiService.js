 // apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://your-api-base-url.com';

export const saveTrainerDetails = async (trainerDetails) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/saveTrainer`, trainerDetails);
        return response.data;
    } catch (error) {
        console.error('Error saving trainer details:', error);
        throw error;
    }
};