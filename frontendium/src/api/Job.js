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
    })
}