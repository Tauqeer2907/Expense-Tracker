const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

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
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
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
app.use("/api/expenses", require("./routes/expenses"));

// Test Route (optional but recommended)
app.get("/", (req, res) => {
    res.send("API is running...");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
