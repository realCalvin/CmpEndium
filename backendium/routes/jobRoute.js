const express = require("express"); const cors = require("cors");
const bodyParser = require("body-parser");
const indeed = require("../webscrape/Indeed");
const linkedin = require("../webscrape/Linkedin");
const careerbuilder = require("../webscrape/CareerBuilder");
const simplyhired = require("../webscrape/SimplyHired");
const themuse = require("../webscrape/TheMuse");
const Job = require("../models/jobModel");

const app = express();

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

async function getJobs(data) {
    let jobs = [];
    let mongoDbJobs;
    let keywordRegExp = new RegExp(data.keywords.split(' ').join('.*'), 'i');
    let locationRegExp = new RegExp(data.location, 'i');
    // TODO: Search keywords in title, if result < certain number, query for keywords in 'description' using 'AND'
    await Job.find({ title: { $regex: keywordRegExp }, location: { $elemMatch: { $or: [{ name: locationRegExp }, { name: /Remote/i }] } } })
        .then(dbJobs => {
            mongoDbJobs = dbJobs;
        })
    const [indeedJobs, simplyHiredJobs] = await Promise.all([indeed.indeedScraper(data), simplyhired.simplyHiredScraper(data)]);
    jobs = [].concat(indeedJobs, simplyHiredJobs, mongoDbJobs);
    return jobs;
}

app.post("/api/database/search", async (req, res) => {
    let jobs = await getJobs(req.body);
    return res.json({ jobs: jobs });
})

app.post("/api/indeed/search", async (req, res) => {
    const indeedJobs = await indeed.indeedScraper(req.body);
    return;
})

app.post("/api/simplyhired/search", async (req, res) => {
    const simplyHiredJobs = await simplyhired.simplyHiredScraper(req.body);
    return;
})

module.exports = app;