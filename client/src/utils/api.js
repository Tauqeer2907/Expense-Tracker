import axios from "axios";

// =======================
// BASE URL
// =======================
const BASE_URL = import.meta.env.VITE_API_URL; // already includes /api
const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // if using cookies/auth
});

// =======================
// AUTH TOKEN INTERCEPTOR
// =======================
API.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// =======================
// AUTH ENDPOINTS
// =======================
export const register = async (userData) => {
    const response = await API.post("/auth/register", userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await API.post("/auth/login", userData);
    return response.data;
};

export const updateUser = async (userData) => {
    const response = await API.put("/auth/profile", userData);
    return response.data;
};

// =======================
// EXPENSES ENDPOINTS
// =======================
export const getExpenses = async () => {
    const response = await API.get("/expenses");
    return response.data;
};

export const addExpense = async (expenseData) => {
    const response = await API.post("/expenses", expenseData);
    return response.data;
};

export const deleteExpense = async (id) => {
    const response = await API.delete(`/expenses/${id}`);
    return response.data;
};
