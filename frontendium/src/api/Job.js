import axios from 'axios';

export function searchIndeedJobs(query) {
    const {
        keywords,
        location
    } = query;

    return axios.post('/api/simplyhired/search', {
        keywords,
        location
    }).then(res => {
        return res;
    })
}