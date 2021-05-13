const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const indeedScraper = {
    getBasicInfo: async function(jobInfo) {
        let indeedJobs = [];
        let keywords = jobInfo.keywords.replace(/\s/g, '+');
        let location = jobInfo.location.replace(/\s/g, '+');
        let indeedLink = 'https://www.indeed.com/jobs?q=' + keywords + '&l=' + location;

        // Set Up Puppeteer Browser
        await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
            .then(async (browser) => {
                try {
                    let page = await browser.newPage();
                    // Visit Up To Page N Of Indeed Job Search
                    for (let N = 1; N < 4; N++) {
                        let currentIndeedLink = indeedLink + '&start=' + N * 10;
                        // Load Indeed Job Search Page
                        await page.goto(currentIndeedLink, { waitUntil: 'domcontentloaded' })
                            .then(async () => {
                                const content = page.content();
                                await content.then((success) => {
                                    const $ = cheerio.load(success);
                                    // Retrieve The Content For Each Job
                                    $('div.jobsearch-SerpJobCard').each(function(i, element) {
                                        let indeedRedirectLink = $(this).find('.title a').attr('href');
                                        // Filter Some Of The Jobs That Are Not External Redirects
                                        let externalJob = $(this).find('.indeedApply').length;
                                        if (indeedRedirectLink.slice(0, 10) === '/rc/clk?jk' && externalJob !== 1) {
                                            indeedJobs.push({
                                                title: $(this).find('.jobtitle').text().trim(),
                                                company: $(this).find('.company').text().trim(),
                                                location: $(this).find('.location').text().trim(),
                                                description: $(this).find('.summary').text().trim(),
                                                link: 'https://www.indeed.com' + $(this).find('.title a').attr('href')
                                            });
                                        }
                                    });
                                });
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
        console.log('Done indeed');
        return indeedJobs;
    },
    getMoreInfo: async function(link) {
        let data = {};
        await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
            .then(async (browser) => {
                try {
                    let page = await browser.newPage();
                    await page.goto(link, { waitUntil: 'domcontentloaded' })
                        .then(async () => {
                            const content = page.content();
                            await content.then((success) => {
                                const $ = cheerio.load(success);
                                data = {
                                    description: $('.jobsearch-JobComponent').find('.jobsearch-jobDescriptionText').html(),
                                    link: $('#applyButtonLinkContainer').find('a').attr('href')
                                };
                            });
                        });
                } catch (err) {
                    console.log('Error: ', err);
                } finally {
                    await browser.close();
                }
            });
        return data;
    }
};

module.exports = indeedScraper;
