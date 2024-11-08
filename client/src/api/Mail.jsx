import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

export const mailBatch = async (batch) => {
    try {
        const response = await axios.post(API_URL+'/users/mail-batch/', {
            batch: batch,
        });
        return response.data;
    } catch (error) {
        console.error('Error mailing users:', error.response?.data || error.message);
        throw error;
    }
};