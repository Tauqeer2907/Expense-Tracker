import { createContext, useReducer, useEffect } from 'react';
import * as api from '../utils/api';
import { toast } from 'react-toastify';

const initialState = {
    expenses: [],
    loading: true,
    error: null,
    salary: Number(localStorage.getItem('salary')) || 0,
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
};

export const ExpenseContext = createContext(initialState);

// Reducer
const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                token: null,
                user: null,
                expenses: [],
                loading: false,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            };
        case 'GET_EXPENSES':
            return {
                ...state,
                loading: false,
                expenses: action.payload,
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [action.payload, ...state.expenses],
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense._id !== action.payload),
            };
        case 'EXPENSE_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'UPDATE_SALARY':
            return {
                ...state,
                salary: action.payload
            };
        default:
            return state;
    }
};

// Provider Component
export const ExpenseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expenseReducer, initialState);

    // Auth Actions
    async function login(username, password) {
        dispatch({ type: 'SET_LOADING' });
        try {
            const res = await api.login({ username, password });
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res,
            });
            toast.success(`Welcome back, ${res.user.username}!`);
        } catch (err) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: err.response?.data?.error || 'Login failed',
            });
            toast.error(err.response?.data?.error || 'Invalid credentials');
        }
    }

    async function register(username, password) {
        dispatch({ type: 'SET_LOADING' });
        try {
            const res = await api.register({ username, password });
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res,
            });
            toast.success('Account created successfully!');
        } catch (err) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: err.response?.data?.error || 'Registration failed',
            });
            toast.error(err.response?.data?.error || 'Registration failed');
        }
    }

    function logout() {
        dispatch({ type: 'LOGOUT' });
        toast.info('Logged out securely');
    }

    // Expense Actions
    async function getExpenses() {
        if (!state.token) return;
        try {
            const res = await api.getExpenses();
            dispatch({
                type: 'GET_EXPENSES',
                payload: res.data,
            });
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch({ type: 'AUTH_ERROR' });
            } else {
                dispatch({
                    type: 'EXPENSE_ERROR',
                    payload: err.response?.data?.error || 'Server Error',
                });
            }
        }
    }

    async function addExpense(expense) {
        try {
            const res = await api.addExpense(expense);
            dispatch({
                type: 'ADD_EXPENSE',
                payload: res.data,
            });
            toast.success('Expense added successfully!');
            return true;
        } catch (err) {
            console.error('Add Expense Error Details:', err);
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response?.data?.error || 'Server Error',
            });
            toast.error(err.response?.data?.error || 'Failed to add expense');
            return false;
        }
    }

    async function deleteExpense(id) {
        try {
            await api.deleteExpense(id);
            dispatch({
                type: 'DELETE_EXPENSE',
                payload: id,
            });
            toast.info('Expense deleted');
        } catch (err) {
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response?.data?.error || 'Server Error',
            });
            toast.error('Failed to delete expense');
        }
    }

    function updateSalary(amount) {
        localStorage.setItem('salary', amount);
        dispatch({
            type: 'UPDATE_SALARY',
            payload: Number(amount)
        });
        toast.success('Salary updated!');
    }

    // Initial load
    useEffect(() => {
        if (state.token) {
            getExpenses();
        } else {
            dispatch({ type: 'AUTH_ERROR' }); // Ensure loading stops if no token
        }
    }, [state.token]);

    return (
        <ExpenseContext.Provider
            value={{
                expenses: state.expenses,
                error: state.error,
                loading: state.loading,
                salary: state.salary,
                user: state.user,
                token: state.token,
                login,
                register,
                logout,
                getExpenses,
                addExpense,
                deleteExpense,
                updateSalary,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};
