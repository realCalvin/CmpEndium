import axios from 'axios';

export function searchJobs(query) {
    const {
        keywords,
        location
    } = query;

    return axios.post('/api/database/search', {
        keywords,
        location
    }).then(res => {
        return res;
    });
}

export function saveJob(data) {
    const {
        email,
        title,
        company,
        link,
        date,
        status
    } = data;

    return axios.post('/api/savejob', {
        email,
        title,
        company,
        link,
        date,
        status
    }).then(res => {
        return res;
    });
}

export function getSavedJobs(data) {
    const {
        email
    } = data;

    return axios.post('/api/database/getsavedjobs', {
        email
    }).then(res => {
        return res;
    });
}

export function handleJobStatus(data) {
    const {
        email,
        status,
        id
    } = data;

    return axios.post('/api/database/changejobstatus', {
        email,
        status,
        id
    }).then(res => {
        return res;
    });
}
