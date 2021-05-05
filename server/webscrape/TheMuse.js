require('dotenv').config();
const https = require('https');
const locations = require('./util/Locations');
const Job = require('../models/jobModel');

let timeoutError; let limitError; let apiError = false;
let jobIds = {};
let count = 0;

async function timer(time) {
    await new Promise(resolve => { setTimeout(resolve, time); });
    done = true;
}

function getDate() {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
}

async function getTheMuseJobs() {
    // Clear database of jobs
    await Job.db.dropCollection('jobs').then(() => {
        console.log('Successfully delete Job collection.');
    }).catch(() => {
        console.log('Unable to delete Job colection.');
    });

    // Iterate through each location and scrape
    for (let i = 0; i < locations.length; i++) {
        let location = locations[i].city.split(' ').join('%20') + '%2C%20' + locations[i].state;
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(location);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
        // Iterate through 100 pages
        for (let j = 1; j < 100; j++) {
            let museApiLink = 'https://www.themuse.com/api/public/jobs?page=' + j +
                '&location=' + location + '&api_key=' + process.env.THE_MUSE_API_KEY;

            // Handle errors and provide timeouts
            if (timeoutError) {
                console.log(getDate(), ': 504 Gateway Error, waiting 60 seconds.');
                await timer(60000);
                console.log('Finished waiting 60 seconds.');
                timeoutError = false;
            }
            if (limitError) {
                console.log('Error trying to use JSON.parse with the data: ', data);
                console.log(getDate(), ': Waiting 30 minutes for API to reset.');
                await timer(1800000);
                console.log('Finished waiting 30 minutes.');
                limitError = false;
            }
            if (apiError) {
                console.log(getDate(), ': TheMuse Error. Waiting 5 seconds.');
                await timer(5000);
                console.log('Finished waiting 5 seconds.');
                apiError = false;
            }

            // make https request to api
            await getTheMuseJobsHelper(museApiLink);
        }
    }
}

async function getTheMuseJobsHelper(link) {
    return new Promise((resolve, reject) => {
        https.get(link, res => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', async () => {
                // Handle 504 Gateway Timeout Errors
                if (data.includes('504 Gateway Time-out')) {
                    timeoutError = true;
                }

                let jobs = JSON.parse(data);
                if (jobs.code === 429) {
                    limitError = true;
                } else {
                    for (let k = 0; k < jobs.results.length; k++) {
                        const id = jobs.results[k].id;
                        if (!(id in jobIds)) {
                            jobIds[id] = true;
                            const newJob = new Job({
                                title: jobs.results[k].name,
                                company: jobs.results[k].company.name,
                                location: jobs.results[k].locations,
                                link: 'https://www.themuse.com/job/redirect/' + id,
                                description: jobs.results[k].contents
                            });
                            newJob.save((err, data) => {
                                if (err) {
                                    console.log('Error saving job to MongoDB: ', err.message);
                                } else {
                                    console.log(count, ' - Added Job ID: ', id);
                                    count += 1;
                                }
                            });
                        }
                    }
                }
                resolve(data);
            });
        }).on('error', async (err) => {
            apiError = true;
            resolve();
        });
    });
}

// TODO: Create CRON Job for the function call
// getTheMuseJobs();
