const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("MONGO URI:", process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
