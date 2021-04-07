var mongoose = require('mongoose');

var resumeSchema = {
    link: {
        type: String,
        unique: true,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    major: {
        type: String,
        required: true
    }
}

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;