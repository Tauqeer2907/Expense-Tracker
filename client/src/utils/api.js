import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/expenses`;

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
