const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function simplyHiredScraper(jobInfo) {
    let simplyHiredJobs = [];
    let keywords = jobInfo.keywords.replace(/\s/g, '+');
    let location = jobInfo.location.replace(/\s/g, '+');
    let simplyHiredLink = 'https://www.simplyhired.com/jobs?q=' + keywords + '&l=' + location;

    // Set Up Puppeteer Browser
    await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
        .then(async (browser) => {
            try {
                let page = await browser.newPage();
                // Visit Up To Page N Of SimplyHired Job Search
                for (let N = 1; N < 2; N++) {
                    let currentSimplyHiredLink = simplyHiredLink + '&pn=' + N;
                    // Load SimplyHired Job Search Page
                    await page.goto(currentSimplyHiredLink, { waitUntil: 'domcontentloaded' })
                        .then(async () => {
                            const content = page.content();
                            await content.then((success) => {
                                const $ = cheerio.load(success);
                                // Retrieve The Content For Each Job
                                $('#job-list .SerpJob-jobCard').each(function() {
                                    if ($(this).find('.SerpJob-metaInfoLeft .SerpJob-simplyApplyLabel').length === 0) {
                                        simplyHiredJobs.push({
                                            title: $(this).find('.jobposting-title a').text().trim(),
                                            company: $(this).find('.jobposting-company').text().trim(),
                                            location: $(this).find('.jobposting-location .jobposting-location').text().trim(),
                                            link: 'https://www.simplyhired.com' + $(this).find('.jobposting-title a').attr('href')
                                        });
                                    }
                                });
                            });
                        });
                }
                // Loop Through Each Saved Job To Retrieve External Job Link And Job Description
                for (var i = 0; i < simplyHiredJobs.length; i++) {
                    const job = simplyHiredJobs[i];
                    // Load SimplyHired Job Information Page
                    await page.goto(job.link, { waitUntil: 'domcontentloaded' })
                        .then(async () => {
                            const content = page.content();
                            await content.then((success) => {
                                const $ = cheerio.load(success);
                                // Retrieve External Job Link and Job Description
                                simplyHiredJobs[i].link = 'https://www.simplyhired.com' + $('.viewjob-buttons .apply a').attr('href');
                                simplyHiredJobs[i].description = $('.viewjob-jobDescription').html();
                            });
                        })
                        .catch((err) => {
                            console.log('Error: ', err);
                        });
                }
                await page.close();
            } catch (err) {
                console.log('Error: ', err);
            } finally {
                await browser.close();
            }
        })
        .catch(err => {
            console.log('Error: ', err);
        });
    return simplyHiredJobs;
}

exports.simplyHiredScraper = simplyHiredScraper;
