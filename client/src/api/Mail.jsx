import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api';

export const mailBatch = async (batch) => {
    try {
        const response = await axios.post(API_URL + '/users/mail-batch/', {
            batch: batch,
        });
        return response.data;
    } catch (error) {
        console.error('Error mailing users:', error.response?.data || error.message);
        throw error;
    }
};