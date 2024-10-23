import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

export const createCustomRole = async (roleData) => {
    try {
        const response = await axios.post(API_URL+'/create-role/', roleData);
        return response.data;
    } catch (error) {
        console.error('Error creating custom role:', error.response?.data || error.message);
        throw error;
    }
};