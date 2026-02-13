const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses?userId=...
// @access  Public
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1, createdAt: -1 });
        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Add expense
// @route   POST /api/expenses
// @access  Public
exports.addExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;

        const expense = await Expense.create({
            amount,
            category,
            description,
            date,
            userId: req.user.id
        });

        res.status(201).json({
            success: true,
            data: expense
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Public
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                error: 'No expense found'
            });
        }

        await expense.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
