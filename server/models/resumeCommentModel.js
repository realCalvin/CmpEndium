const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeCommentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = resumeComment = mongoose.model('resumeComment', resumeCommentSchema);
