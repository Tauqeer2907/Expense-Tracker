const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: 'Username already taken'
            });
        }

        // Create user
        const user = await User.create({
            username,
            password
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate username & password
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a username and password'
            });
        }

        // Check for user
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found. Please click Sign Up below.'
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Incorrect password. Please try again.'
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Update user profile (salary)
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const { salary } = req.body;

        const user = await User.findById(req.user.id);

        if (user) {
            if (salary !== undefined) {
                // Update current salary for backward compatibility or display
                user.salary = salary;

                // Update monthly salary history if month and year are provided
                if (req.body.month && req.body.year) {
                    const month = req.body.month;
                    const year = req.body.year;

                    // Check if entry exists for this month/year
                    const existingIndex = user.monthlySalaries.findIndex(
                        item => item.month === month && item.year === year
                    );

                    if (existingIndex !== -1) {
                        user.monthlySalaries[existingIndex].amount = salary;
                    } else {
                        user.monthlySalaries.push({
                            month,
                            year,
                            amount: salary
                        });
                    }
                }
            }

            const updatedUser = await user.save();

            res.json({
                success: true,
                user: {
                    id: updatedUser._id,
                    username: updatedUser.username,
                    salary: updatedUser.salary,
                    monthlySalaries: updatedUser.monthlySalaries
                }
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            username: user.username,
            salary: user.salary,
            monthlySalaries: user.monthlySalaries
        }
    });
};
