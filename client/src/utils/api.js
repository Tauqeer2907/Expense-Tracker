import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/expenses`;

// Add a request interceptor to include the auth token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth endpoints
export const register = async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
    return response.data;
};

// Get all expenses
export const getExpenses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Add new expense
export const addExpense = async (expenseData) => {
    const response = await axios.post(API_URL, expenseData);
    return response.data;
};

// Delete expense
export const deleteExpense = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
