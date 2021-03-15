const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const indeed = require('indeed-scraper');

async function indeedScraper(jobInfo) {
    let indeedJobs = [];
    let keywords = jobInfo.keywords.replace(/\s/g, '+');
    let location = jobInfo.location.replace(/\s/g, '+');
    let indeedLink = "https://www.indeed.com/jobs?q=" + keywords + "&l=" + location;

    // Set Up Puppeteer Browser
    puppeteer.launch({ headless: true })
        .then(async (browser) => {
            let page = await browser.newPage();
            // Visit Up To Page 8 Of Indeed Job Search
            for (var i = 1; i < 9; i++) {
                let currentIndeedLink = indeedLink + "&start=" + i * 10;
                // Load Indeed Job Search Page
                await page.goto(currentIndeedLink, { waitUntil: 'domcontentloaded' })
                    .then(() => {
                        const content = page.content();
                        content.then((success) => {
                            const $ = cheerio.load(success);
                            // Retrieve The Content For Each Job
                            $('div.jobsearch-SerpJobCard').each(function (i, element) {
                                indeedJobs.push({
                                    title: $(this).find('.jobtitle').text().trim(),
                                    company: $(this).find('.company').text().trim(),
                                    location: $(this).find('.location').text().trim(),
                                    link: "https://www.indeed.com" + $(this).find('.title a').attr('href'),
                                    description: ""
                                });
                            });
                        })
                    })
            }

            // TODO: Filter Job Listings With An "External" Apply Link
            //
            // TODO: For 'indeedJobs' variable, replace 'link' and 'description'
            //
        })
        .catch(err => {
            console.log("Error: ", err);
        })
};

exports.indeedScraper = indeedScraper;