require('dotenv').config();
const https = require('https');
const locations = require('./util/Locations');
const Job = require("../models/jobModel");

async function getTheMuseJobs() {
    // Clear database of jobs
    Job.db.dropCollection('jobs').then(() => {
        console.log("Successfully delete Job collection.")
    }).catch(() => {
        console.log("Unable to delete Job colection.")
    })

    let jobIds = {};
    let count = 0;
    // Iterate through each location and scrape
    for (var i = 0; i < locations.length; i++) {
        let location = locations[i].city.split(' ').join('%20') + '%2C%20' + locations[i].state;
        // Iterate through 100 pages
        for (var j = 1; j < 100; j++) {
            let theMuseApi = 'https://www.themuse.com/api/public/jobs?page=' + j
                + '&location=' + location + '&api_key=' + process.env.THE_MUSE_API_KEY;
            https.get(theMuseApi, res => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                })
                res.on('end', async () => {
                    try {
                        if (data.includes("504 Gateway Time-out")) {
                            console.log("504 Gateway Error, waiting 60 seconds")
                            await new Promise(resolve => setTimeout(resolve, 60000));
                        }
                        let jobs = JSON.parse(data);
                        for (var k = 0; k < jobs.results.length; k++) {
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
                                        console.log("Error saving job to MongoDB: ", err.message);
                                    } else {
                                        console.log(count + ": successfuly saved job ", id);
                                        count += 1;
                                    }
                                });
                            }
                        }
                    } catch (err) {
                        console.log("Error trying to use JSON.parse with the data: ", data);
                    }
                })
            }).on("error", async (err) => {
                console.log("TheMuse Error: " + err.message);
                await new Promise(resolve => setTimeout(resolve, 5000));
            })

            // add delay to prevent flooding & timeout issues
            await new Promise(resolve => setTimeout(resolve, 80));
        }
    }
}
/*
    TODO: Put code below in a function to periodically check limit
          Function should return that limit, and continue scraping if
          it surpasses a threshold
*/
/* TEST LIMIT OF MUSE API */
// let theMuseApi = 'https://www.themuse.com/api/public/jobs?page=1' + '&api_key=' + process.env.THE_MUSE_API_KEY;
// https.get(theMuseApi, res => {
//     let data = '';

//     res.on('data', (chunk) => {
//         data += chunk;
//     })

//     res.on('end', () => {
//         try {
//             let jobs = JSON.parse(data);
//             console.log(res.headers)
//         } catch (err) {
//             console.log("Error trying to use JSON.parse with the data: ", data);
//         }
//     })
// }).on("error", (err) => {
//     console.log("TheMuse Error: " + err.message);
//     timer(1000);
// })

// getTheMuseJobs();
console.log("** DONE FETCHING JOBS FROM THEMUSE **")