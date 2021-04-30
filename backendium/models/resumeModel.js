const resumeCommentSchema = require('./resumeCommentModel').schema;
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
    },
    visible: {
        type: Boolean,
        required: true
    },
    comments: [resumeCommentSchema]
}

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;