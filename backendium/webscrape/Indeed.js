const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

async function indeedScraper(jobInfo) {
    let indeedJobs = [];
    let filteredJobs = [];
    let keywords = jobInfo.keywords.replace(/\s/g, '+');
    let location = jobInfo.location.replace(/\s/g, '+');
    let indeedLink = "https://www.indeed.com/jobs?q=" + keywords + "&l=" + location;

    // Set Up Puppeteer Browser
    await puppeteer.launch({ headless: true })
        .then(async (browser) => {
            let page = await browser.newPage();
            // Visit Up To Page N Of Indeed Job Search
            for (var N = 1; N < 3; N++) {
                let currentIndeedLink = indeedLink + "&start=" + N * 10;
                // Load Indeed Job Search Page
                await page.goto(currentIndeedLink, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        await content.then((success) => {
                            const $ = cheerio.load(success);
                            // Retrieve The Content For Each Job
                            $('div.jobsearch-SerpJobCard').each(function (i, element) {
                                let indeedRedirectLink = $(this).find('.title a').attr('href');
                                // Filter Some Of The Jobs That Are Not External Redirects
                                if (indeedRedirectLink.slice(0, 10) === "/rc/clk?jk") {
                                    indeedJobs.push({
                                        title: $(this).find('.jobtitle').text().trim(),
                                        company: $(this).find('.company').text().trim(),
                                        location: $(this).find('.location').text().trim(),
                                        link: "https://www.indeed.com" + $(this).find('.title a').attr('href')
                                    });
                                }
                            });
                        })
                    })
                await page.screenshot({ path: 'imdeed.png' });
            }
            // Loop Through Each Saved Job To Retrieve External Job Link And Job Description
            for (var i = 0; i < indeedJobs.length; i++) {
                const job = indeedJobs[i];
                // Load Indeed Job Information Page
                await page.goto(job.link, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        await content.then((success) => {
                            const $ = cheerio.load(success);
                            // Retrieve External Job Link and Job Description
                            let externalJobLink = $('#applyButtonLinkContainer').find('a').attr('href');
                            if (externalJobLink !== undefined) {
                                filteredJobs.push({
                                    title: indeedJobs[i].title,
                                    company: indeedJobs[i].company,
                                    location: indeedJobs[i].location,
                                    link: externalJobLink,
                                    description: $('#jobDescriptionText').html()
                                });
                            }
                        })
                    })
                    .catch((err) => {
                        console.log("Error: ", err);
                    })
            }
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    return filteredJobs;
};

exports.indeedScraper = indeedScraper;