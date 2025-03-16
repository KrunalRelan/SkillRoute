import axios from 'axios';
import { HotelRegistration } from '../jsx/models/HotelRegistrationModel';

const API_URL = 'https://localhost:7170/api/hotel';

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
        throw new Error('Failed to retrieve anti-forgery token');
    }
};

// Function to save hotel registration details
export const hotelRegistration = async (registration: HotelRegistration) => {
    try {
        const token = await getAntiForgeryToken();

        const response = await axios.post(
            `${API_URL}/register`,
            registration,
            {
                headers: {
                    'X-XSRF-TOKEN': token
                },
                withCredentials: true
            }
        );

        return response;
    } catch (error) {
        console.error('Error saving hotel details:', error);
        throw new Error('Failed to save hotel details');
    }
};

// Function to get all hotels
export const getAllHotels = async () => {
    try {
        const response = await axios.get(`${API_URL}/allhotels`);
        return response.data;
    } catch (error) {
        console.error('Error getting hotels:', error);
        throw new Error('Failed to retrieve hotel details');
    }
};

// Function to get a single hotel by ID
export const getHotelById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting hotel details:', error);
        throw new Error('Failed to retrieve hotel details');
    }
};

// Function to update hotel details
export const updateHotel = async (id: number, hotelDetails: HotelRegistration) => {
    try {
        const token = await getAntiForgeryToken();

        const response = await axios.put(
            `${API_URL}/update-hotel/${id}`,
            hotelDetails,
            {
                headers: {
                    'X-XSRF-TOKEN': token
                },
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating hotel details:', error);
        throw new Error('Failed to update hotel details');
    }
};

// Function to delete a hotel
export const deleteHotel = async (id: number) => {
    try {
        const token = await getAntiForgeryToken();

        const response = await axios.delete(`${API_URL}/delete-hotel/${id}`, {
            headers: {
                'X-XSRF-TOKEN': token
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting hotel:', error);
        throw new Error('Failed to delete hotel');
    }
};
