import { createContext, useReducer, useEffect } from 'react';
import * as api from '../utils/api';
import { toast } from 'react-toastify';

const initialState = {
    expenses: [],
    loading: true,
    error: null,
    salary: Number(localStorage.getItem('salary')) || 0,
};

export const ExpenseContext = createContext(initialState);

// Reducer
const expenseReducer = (state, action) => {
    switch (action.type) {
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

    // Actions
    async function getExpenses() {
        try {
            const res = await api.getExpenses();
            dispatch({
                type: 'GET_EXPENSES',
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response?.data?.error || 'Server Error',
            });
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

    return (
        <ExpenseContext.Provider
            value={{
                expenses: state.expenses,
                error: state.error,
                loading: state.loading,
                salary: state.salary,
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
