const mongoose = require("mongoose")

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected to MongoDB");

        })
        .catch((err) => {
            console.error('Error connected to MongoDB', err);

        })
}

module.exports = connectDB;