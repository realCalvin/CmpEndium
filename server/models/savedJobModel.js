const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedJobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

module.exports = savedJob = mongoose.model('savedJob', savedJobSchema);
