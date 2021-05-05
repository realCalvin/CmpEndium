require('dotenv').config();
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function linkedinScraper(jobInfo) {
    let linkedinJobs = [];
    let filteredJobs = [];
    let keywords = jobInfo.keywords.replace(/\s/g, '+');
    let location = jobInfo.location.replace(/\s/g, '+');
    let linkedinLink = 'https://www.linkedin.com/jobs/search/?keywords=' + keywords + '&location=' + location;

    let linkedinSignInLink = 'https://www.linkedin.com/login';
    let emailSelector = '#username';
    let passwordSelector = '#password';
    let submitButton = '.login__form_action_container > button';

    // Set Up Puppeteer Browser
    await puppeteer.launch({ headless: true, defaultViewport: null })
        .then(async (browser) => {
            let page = await browser.newPage();

            await page.setViewport({
                width: 1920,
                height: 1080
            });

            // Sign In LinkedIn Account
            await page.goto(linkedinSignInLink, { waitUntil: 'domcontentloaded' });
            await page.click(emailSelector);
            await page.keyboard.type(process.env.LINKEDIN_EMAIL);
            await page.click(passwordSelector);
            await page.keyboard.type(process.env.LINKEDIN_PASSWORD);
            await page.click(submitButton);
            await page.waitForNavigation({ waitUntil: 'load' });

            // Start Job Scraping From LinkedIn
            for (let N = 0; N < 2; N++) {
                let currentLinkedinLink = linkedinLink + '&start=' + N * 25;
                // Load Linkedin Job Search Page
                console.log(currentLinkedinLink);
                await page.goto(currentLinkedinLink, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        await content.then(async (success) => {
                            const $ = cheerio.load(success);
                            $('.jobs-search-results__list-item').each(function() {
                                linkedinJobs.push({
                                    title: $(this).find('.job-card-list__title').text().trim(),
                                    company: $(this).find('.job-card-container__company-name').text().trim(),
                                    location: $(this).find('.artdeco-entity-lockup__caption > ul > li').text().trim(),
                                    link: 'https://www.linkedin.com' + $(this).find('.job-card-container__link').attr('href')
                                });
                            });
                        });
                    });
            }
            // Loop Through Each Saved Job To Retrieve External Job Link
            console.log(linkedinJobs.length);
            for (var i = 0; i < linkedinJobs.length; i++) {
                const job = linkedinJobs[i];
                // Load Linkedin Job Information Page
                await page.goto(job.link, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        if (i === 0) console.log(content);
                        await content.then(async (success) => {
                            const $ = cheerio.load(success);
                            // Retrieve External Job Link and Job Description
                            // console.log("Before: ", page.url());
                            // await page.click('.jobs-apply-button--top-card button');
                            // await page.screenshot({ path: 'buddy-screenshot.png' });
                            // console.log("After: ", page.url());
                        });
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                    });
            }
        })
        .catch(err => {
            console.log('Error: ', err);
        });
    console.log('Done');
    return linkedinJobs;
}

exports.linkedinScraper = linkedinScraper;
