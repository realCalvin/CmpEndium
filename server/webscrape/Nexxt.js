const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function nexxtScraper(jobInfo) {
    let simplyHiredJobs = [];
    let keywords = jobInfo.keywords.replace(/\s/g, '+');
    let location = jobInfo.location.replace(/\s/g, '+');
    let simplyHiredLink = 'https://www.nexxt.com/jobs/search?soid=1&k=' + keywords + '&l=' + location;

    // Set Up Puppeteer Browser
    await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
        .then(async (browser) => {
            let page = await browser.newPage();
            // Visit Up To Page N Of SimplyHired Job Search
            for (let N = 1; N < 2; N++) {
                let currentSimplyHiredLink = simplyHiredLink + '&p=' + N;
                // Load SimplyHired Job Search Page
                await page.goto(currentSimplyHiredLink, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        await content.then((success) => {
                            const $ = cheerio.load(success);
                            // Retrieve The Content For Each Job
                            $('.job-search-results .job').each(function() {
                                // console.log($(this).find('.job-header h2').text().trim());
                                // console.log($(this).find('.job-header-sub .job-title-company').text().trim());
                                let location = $(this).find('.job-header-sub').text().split('\n');
                                console.log(location[location.length - 1].trim());
                            });
                        });
                    });
            }
        })
        .catch(err => {
            console.log('Error: ', err);
        });
    return simplyHiredJobs;
}

exports.nexxtScraper = nexxtScraper;
