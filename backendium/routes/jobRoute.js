const express = require("express"); const cors = require("cors");
const bodyParser = require("body-parser");
const indeed = require("../webscrape/Indeed");
const linkedin = require("../webscrape/Linkedin");
const careerbuilder = require("../webscrape/CareerBuilder");
const simplyhired = require("../webscrape/SimplyHired");

const app = express();

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/indeed/search", async (req, res) => {
    const indeedJobs = await indeed.indeedScraper(req.body);
    console.log(indeedJobs);
    return;
})

app.post("/api/simplyhired/search", async (req, res) => {
    const simplyHiredJobs = await simplyhired.simplyHiredScraper(req.body);
    console.log(simplyHiredJobs);
    return;
})

module.exports = app;