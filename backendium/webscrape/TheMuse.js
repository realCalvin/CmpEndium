require('dotenv').config();
const https = require('https');
const locations = require('./Locations');
const Job = require("../models/jobModel");

async function getTheMuseJobs() {
    // Clear database of jobs
    Job.collection.drop();

    let jobIds = {};

    // Iterate through each location and scrape
    for (var i = 0; i < locations.length; i++) {
        let location = locations[i].city.split(' ').join('%20') + '%2C%20' + locations[i].state;
        // Iterate through 80 pages
        for (var j = 1; j < 81; j++) {
            let theMuseApi = 'https://www.themuse.com/api/public/jobs?page=' + j
                + '&location=' + location + '&api_key=' + process.env.THE_MUSE_API_KEY;
            https.get(theMuseApi, res => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                })

                res.on('end', () => {
                    try {
                        let jobs = JSON.parse(data);
                        for (var k = 0; k < jobs.results.length; k++) {
                            const id = jobs.results[k].id;
                            if (!(id in jobIds)) {
                                jobIds[id] = true;
                                const newJob = new Job({
                                    title: jobs.results[k].name,
                                    company: jobs.results[k].company.name,
                                    location: jobs.results[k].locations,
                                    link: 'https://www.themuse.com/job/redirect/' + jobs.results[k].id,
                                    description: jobs.results[k].contents
                                });
                                newJob.save((err, data) => {
                                    if (err) console.log("Error saving job to MongoDB: ", err.message);
                                });
                            }
                        }
                    } catch (err) {
                        console.log("Error trying to use JSON.parse with the data: ", data);
                    }
                })
            }).on("error", (err) => {
                console.log("TheMuse Error: " + err.message);
                await new Promise(resolve => setTimeout(resolve, 1000));
            })
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}
getTheMuseJobs();