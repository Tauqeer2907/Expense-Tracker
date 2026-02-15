// =======================
// LOAD ENV FIRST
// =======================
require("dotenv").config();

// =======================
// IMPORTS
// =======================
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// =======================
// INIT APP (VERY IMPORTANT - BEFORE CORS)
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
// CORS CONFIG (FIXED)
// =======================

const allowedOrigins = [
    "https://tauqeer-expense-tracker-buttxbfbt-tauqeerabbas-projects.vercel.app",
    "http://localhost:5173"
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // Removed for Express 5 compatibility

// =======================
// ROUTES
// =======================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

app.get("/", (req, res) => {
    res.json({ message: "API is running!" });
});

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({
        message: "Server Error",
        error: err.message
    });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
