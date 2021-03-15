const express = require("express"); const cors = require("cors");
const bodyParser = require("body-parser");
const indeed = require("../webscrape/Indeed");

const app = express();

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/indeed/search", (req, res) => {
    indeed.indeedScraper(req.body);
})

module.exports = app;