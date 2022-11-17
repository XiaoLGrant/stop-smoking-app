const mongoose = require("mongoose");

const StreakSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    isCurrentStreak: {
        type: Boolean,
        default: true,
    }, 
    // Easily determine max streak duration
    duration: {
        type: Number,
    }
});

module.exports = mongoose.model("Streak", StreakSchema);
