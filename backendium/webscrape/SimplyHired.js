const cheerio = require('cheerio');
const { Cluster } = require('puppeteer-cluster');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

async function simplyHiredScraper(jobInfo) {
    let simplyHiredJobs = [];
    let keywords = jobInfo.keywords.replace(/\s/g, '+');
    let location = jobInfo.location.replace(/\s/g, '+');
    let simplyHiredLink = "https://www.simplyhired.com/jobs?q=" + keywords + "&l=" + location;

    // Set Up Puppeteer Browser
    await puppeteer.launch({ headless: true })
        .then(async (browser) => {
            let page = await browser.newPage();
            // Visit Up To Page N Of SimplyHired Job Search
            for (var N = 1; N < 3; N++) {
                let currentSimplyHiredLink = simplyHiredLink + "&pn=" + N;
                // Load SimplyHired Job Search Page
                await page.goto(currentSimplyHiredLink, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        await content.then((success) => {
                            const $ = cheerio.load(success);
                            // Retrieve The Content For Each Job
                            $('#job-list .SerpJob-jobCard').each(function () {
                                if ($(this).find('.SerpJob-metaInfoLeft .SerpJob-simplyApplyLabel').length === 0) {
                                    simplyHiredJobs.push({
                                        title: $(this).find('.jobposting-title a').text().trim(),
                                        company: $(this).find('.jobposting-company').text().trim(),
                                        location: $(this).find('.jobposting-location .jobposting-location').text().trim(),
                                        link: "https://www.simplyhired.com" + $(this).find('.jobposting-title a').attr('href')
                                    });
                                }
                            });
                        })
                    })
            }

            await (async () => {
                const cluster = await Cluster.launch({
                    concurrency: Cluster.CONCURRENCY_BROWSER,
                    maxConcurrency: 15
                });

                await cluster.task(async ({ page, data }) => {
                    await page.setViewport({
                        width: 1920,
                        height: 1080,
                    });
                    // Load SimplyHired Job Information Page
                    await page.goto(data.url, { waitUntil: 'domcontentloaded' })
                        .then(async () => {
                            const content = page.content();
                            await content.then((success) => {
                                const $ = cheerio.load(success);
                                // Retrieve External Job Link and Job Description
                                simplyHiredJobs[data.pos].link = "https://www.simplyhired.com" + $(".viewjob-buttons .apply a").attr('href');
                                simplyHiredJobs[data.pos].description = $(".viewjob-jobDescription").html();
                            })
                        })
                        .catch((err) => {
                            console.log("Error: ", err);
                        })
                });

                // Loop Through Each Saved Job To Retrieve External Job Link And Job Description
                for (var i = 0; i < simplyHiredJobs.length; i++) {
                    const job = simplyHiredJobs[i];
                    cluster.queue({
                        url: job.link,
                        pos: i
                    });
                }

                await cluster.idle();
                await cluster.close();
            })();
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    return simplyHiredJobs;
};

exports.simplyHiredScraper = simplyHiredScraper;