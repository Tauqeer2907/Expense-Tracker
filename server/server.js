// =======================
// CORS CONFIG (UPDATED & FIXED)
// =======================

const allowedOrigins = [
    "https://tauqeer-expense-tracker-buttxbfbt-tauqeerabbas-projects.vercel.app",
    "http://localhost:5173"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow Postman

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // VERY IMPORTANT (fixes preflight)
