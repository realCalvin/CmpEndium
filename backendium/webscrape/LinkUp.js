const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var userAgent = require('user-agents');

async function linkUpScraper(jobInfo) {
    let linkUpJobs = [];
    let keywords = jobInfo.keywords.replace(/\s/g, '-');
    let location = jobInfo.location.replace(/\s/g, '-');
    let linkUpLink = "https://www.linkup.com/search/results/" + keywords + "-jobs-in-" + location;

    const args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list'];

    const options = {
        args,
        headless: true,
        ignoreHTTPSErrors: true,
        slowMo: 10
    };

    // Set Up Puppeteer Browser
    await puppeteer.launch(options)
        .then(async (browser) => {
            let page = await browser.newPage();
            await page.setUserAgent(userAgent.toString())
            // Visit Up To Page N Of LinkUp Job Search
            for (var N = 1; N < 2; N++) {
                let currentLinkUpLink = linkUpLink + "?pageNum=" + N;
                // Load LinkUp Job Search Page
                await page.goto(currentLinkUpLink, { waitUntil: 'domcontentloaded' })
                    .then(async () => {
                        const content = page.content();
                        await content.then((success) => {
                            const $ = cheerio.load(success);
                            // Retrieve The Content For Each Job
                            $('row col .job-listing').each(function () {
                                if ($(this).find('.job-footer').length === 0) {
                                    linkUpJobs.push({
                                        title: $(this).find('h4 a').text().trim(),
                                        company: $(this).find('.hide-on-large-only p span').text().trim(),
                                        location: $(this).find('.hide-on-large-only div span').children().eq(0).text().trim(),
                                        link: "https://www.linkup.com" + $(this).find('h4 a').attr('href')
                                    });
                                }
                            });
                        })
                    })
            }
            // Loop Through Each Saved Job To Retrieve External Job Link And Job Description
            console.log(linkUpJobs)
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    return linkUpJobs;
};

exports.linkUpScraper = linkUpScraper;