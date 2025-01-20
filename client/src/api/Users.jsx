import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL+'/users/add/', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message);
        throw error;
    }
};

export const createFaculty = async (categoryData) => {
    try {
        const response = await axios.post(API_URL+'/users/add-faculty/', categoryData);
        return response.data;
    } catch (error) {
        console.error('Error creating faculty:', error.response?.data || error.message);
        throw error;
    }
};

export const createStaff = async (categoryData) => {
    try {
        const response = await axios.post(API_URL+'/users/add-staff/', categoryData);
        return response.data;
    } catch (error) {
        console.error('Error creating staff:', error.response?.data || error.message);
        throw error;
    }
};

export const resetPassword = async (userData) => {
    try {
        const response = await axios.post(API_URL+'/users/reset_password/', userData);
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error.response?.data || error.message);
        throw error;
    }
}

export const bulkUploadUsers = async (userData) => {
    try {
        const response = await axios.post(API_URL+'/users/import/', userData);
        return response.data;
    } catch (error) {
        console.error('Error uploading users:', error.response?.data || error.message);
        throw error;
    }
}