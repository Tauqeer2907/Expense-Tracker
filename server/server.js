// =======================
// LOAD ENV FIRST (must be at top)
// =======================
require("dotenv").config();

// =======================
// IMPORTS
// =======================
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// =======================
// INIT APP
// =======================
const app = express();

// =======================
// CONNECT DATABASE
// =======================
connectDB();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());

// =======================
// CORS CONFIG (SAFE FOR DEPLOY)
// =======================

// List of allowed frontend URLs
const allowedOrigins = [
    process.env.FRONTEND_URL, // Add your future Vercel URL in .env
    "https://tracker-frontend-ikk5.onrender.com",
    "https://expense-tracker-frontend-664e.onrender.com",
    "http://localhost:5173"
];

// Enable CORS
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (Postman, server-to-server)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// =======================
// ROUTES
// =======================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

// Root test route
app.get("/", (req, res) => {
    res.json({ message: "API is running!" });
});

// Optional: Test route for frontend
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

// =======================
// GLOBAL ERROR HANDLER
// =================
