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
    // mood: {
    //     type: String,
    //     enum: [ 
    //         'Accomplished', 
    //         'Angry', 
    //         'Anxious', 
    //         'Bored', 
    //         'Happy', 
    //         'Helpless', 
    //         'Hopeless', 
    //         'Overwhelmed', 
    //         'Proud', 
    //         'Sad', 
    //         '...'],
    // }
    // Mood alternative:
    //  Choose a few different emotions, happy, anxious, etc., with a number scale from 1-10 or 1-5?

    // Is cravings a scale of how bad you want to smoke?
    cravings: {
        type: Number,
        min: 1,
        max: 10,
    }
});

module.exports = mongoose.model("Journal", JournalSchema);
