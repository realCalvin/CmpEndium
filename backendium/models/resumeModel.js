var mongoose = require('mongoose');

var resumeSchema = {
    link: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    }
}

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;