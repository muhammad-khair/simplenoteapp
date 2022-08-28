let mongoose = require("mongoose");

let noteSchema = mongoose.Schema({
    description: {
        type: String,
        validate: /\S+/,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    priority: {
        type: String,
        enum : ["LOW", "MEDIUM", "HIGH"],
        default: "LOW"
    },
    is_flagged: {
        type: Boolean,
        default: false,
    },
    created_date: {
        type: Date,
        default: Date.now(),
    },
    is_completed: {
        type: Boolean,
        default: false,
    },
});

var Note = (module.exports = mongoose.model("note", noteSchema));
module.exports.get = (callback, limit) => {
    Note.find(callback).limit(limit);
};
