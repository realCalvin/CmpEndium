const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function careerBuilderScraper(jobInfo) {
    let careerBuilderJobs = [];
    let filteredJobs = [];
    let keywords = jobInfo.keywords.replace(/\s/g, '-');
    let location = jobInfo.location.replace(/\s/g, '-');
    let careerBuilderLink = "https://www.careerbuilder.com/jobs?keywords=" + keywords + "&location=" + location;

    // Set Up Puppeteer Browser
    await puppeteer.launch({ headless: true })
        .then(async (browser) => {
            let page = await browser.newPage();
            browser.on("targetcreated", async (target) => {
                const new_page = await target.page();
                page = new_page;
            });
            // Visit Up To Page N Of CareerBuilder Job Search
            for (var N = 1; N < 2; N++) {
                let currentCareerBuilderLink = careerBuilderLink + "&page_number=" + N;
                // Load Indeed Job Search Page
                await page.goto(currentCareerBuilderLink, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        await content.then((success) => {
                            const $ = cheerio.load(success);
                            // Retrieve The Content For Each Job
                            $('div.data-results-content-parent').each(function () {
                                // Filter Out Easy Apply
                                if ($(this).find('.data-snapshot').length === 2) {
                                    careerBuilderJobs.push({
                                        title: $(this).find('.data-results-title').text().trim(),
                                        company: $(this).find('.data-details').children().eq(0).text().trim(),
                                        location: $(this).find('.data-details').children().eq(1).text().trim(),
                                        link: "https://www.careerbuilder.com" + $(this).find('.data-results-content').attr('href')
                                    });
                                }
                            });
                            console.log(careerBuilderJobs);
                        })
                    })
            }
            // Loop Through Each Saved Job To Retrieve External Job Link And Job Description
            for (var i = 0; i < careerBuilderJobs.length; i++) {
                const job = careerBuilderJobs[i];
                await page.goto(job.link, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        await content.then(async (success) => {
                            const $ = cheerio.load(success);
                            const pageTarget = page.target();
                            // Retrieve External Job Link and Job Description
                            await page.click('#hide-fixed-top > a');
                            await page.screenshot({ path: 'buddy-screenshot.png' });
                            await page.click('#external-apply-no-thanks');
                            await page.screenshot({ path: 'buddy-screenshot2.png' });
                            const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
                            const newPage = await newTarget.page();
                            await newPage.waitForNavigation({ waituntil: 'domcontentloaded' });
                            await newPage.screenshot({ path: 'buddy-screenshot3.png' });
                            console.log(newPage.url())
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

exports.careerBuilderScraper = careerBuilderScraper;