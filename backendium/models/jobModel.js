const mongoose = require("mongoose");

const jobSchema = {
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: [{
        name: String
    }],
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;