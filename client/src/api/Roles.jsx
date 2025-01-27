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


export const getAllRoles = async () => {
    try {
        const response = await axios.get(API_URL+'/view-roles/');
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error.response?.data || error.message);
        throw error;
    }
}

export const getAllDesignations = async (designationType) => {
    try {
        const response = await axios.post(API_URL+'/view-designations/', designationType);
        return response.data;
    } catch (error) {
        console.error('Error fetching designations:', error.response?.data || error.message);
        throw error;
    }
}

export const getAllDepartments = async () => {
    try {
        const response = await axios.get(API_URL+'/departments/');
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error.response?.data || error.message);
        throw error;
    }
}