const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date, 
        default: Date.now,
    },
    smoked: {
        type: Boolean,
        required: true,
    },
    triggers: {
        type: Array,
    },

    // Is cravings a scale of how bad you want to smoke?
    cravingsLevel: {
        type: Number,
        min: 1,
        max: 10,
    },

    //maybe wrap these in a mood object?
    anxietyLevel: {
        type: Number,
        min: 1,
        max: 10,
    },
    excitementLevel: {
        type: Number,
        min: 1,
        max: 10,
    },
    boredomLevel: {
        type: Number,
        min: 1,
        max: 10,
    },
    sadnessLevel: {
        type: Number,
        min: 1,
        max: 10,
    },
    happinessLevel: {
        type: Number,
        min: 1,
        max: 10,
    },
    lonelinessLevel: {
        type: Number,
        min: 1,
        max: 10,
    }
    
});

module.exports = mongoose.model("Journal", JournalSchema);
