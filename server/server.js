// LOAD ENV FIRST (must be at top)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

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
const allowedOrigins = [
    process.env.FRONTEND_URL, // from env (BEST WAY)
    "https://tracker-frontend-ikk5.onrender.com",
    "https://expense-tracker-frontend-664e.onrender.com",
    "http://localhost:5173"
];

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin (mobile apps, curl, postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// Handle preflight requests properly
app.options("*", cors(corsOptions));


// =======================
// ROUTES
// =======================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

// Root test route
app.get("/", (req, res) => {
    res.send("API is running...");
});


// =======================
// GLOBAL ERROR HANDLER
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
