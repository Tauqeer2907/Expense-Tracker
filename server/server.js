// LOAD ENV FIRST (must be at top)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect Database
connectDB();

const app = express();

// CORS Configuration
const allowedOrigins = [
    "https://tracker-frontend-ikk5.onrender.com",
    "https://expense-tracker-frontend-664e.onrender.com",
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps / curl)
        if (!origin) return callback(null, true);

        if (!allowedOrigins.includes(origin)) {
            return callback(
                new Error("CORS policy does not allow this origin"),
                false
            );
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
