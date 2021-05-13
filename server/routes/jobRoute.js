const express = require('express'); const cors = require('cors');
const bodyParser = require('body-parser');
const indeedScraper = require('../webscrape/Indeed');
const simplyHiredScraper = require('../webscrape/SimplyHired');
const linkedin = require('../webscrape/Linkedin');
const careerbuilder = require('../webscrape/CareerBuilder');
const themuse = require('../webscrape/TheMuse');
const Job = require('../models/jobModel');
const User = require('../models/userModel');

const app = express();

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
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
        });
    const [indeedJobs, simplyHiredJobs] = await Promise.all([indeedScraper.getBasicInfo(data), simplyHiredScraper.getBasicInfo(data)]);
    jobs = [].concat(indeedJobs, simplyHiredJobs, mongoDbJobs);
    return jobs;
}

app.post('/api/database/search', async (req, res) => {
    let jobs = await getJobs(req.body);
    return res.json({ jobs: jobs });
});

app.post('/api/savejob', async (req, res) => {
    let currentUser = await User.findOne({ email: req.body.email });
    let jobs = currentUser.savedJobs;
    jobs.push(req.body);
    currentUser.savedJobs = jobs;
    await currentUser.save();
    return res.json({ success: true });
});

app.post('/api/database/getsavedjobs', async (req, res) => {
    let currentUser = await User.findOne({ email: req.body.email });
    let jobs = currentUser.savedJobs;
    return res.json({ jobs: jobs });
});

app.post('/api/database/changejobstatus', async (req, res) => {
    let currentUser = await User.findOne({ email: req.body.email });
    let jobs = currentUser.savedJobs;
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i]._id == req.body.id) {
            jobs[i].status = req.body.status;
            await currentUser.save();
            return res.json({ response: 'success' });
        }
    }
    return res.json({ response: 'fail' });
});

app.post('/api/database/deletejob', async (req, res) => {
    let currentUser = await User.findOne({ email: req.body.email });
    let jobs = currentUser.savedJobs;
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i]._id == req.body.id) {
            jobs.splice(i, 1);
            console.log(jobs);
            await currentUser.save();
            return res.json({ response: 'success' });
        }
    }
    return res.json({ response: 'fail' });
});

app.post('/api/getjob', async (req, res) => {
    const { title, location, company, description, link } = req.body.data;
    let job = {
        title: title,
        location: location,
        company: company,
        description: description,
        link: link
    };
    const website = link.split('.')[1];

    let data;
    if (website === 'indeed') {
        data = await indeedScraper.getMoreInfo(link);
        job.description = data.description;
        job.link = data.link;
    } else if (website === 'simplyhired') {
        data = await simplyHiredScraper.getMoreInfo(link);
        job.description = data.description;
        job.link = data.link;
    }

    return res.json({ job: job });
});

module.exports = app;
