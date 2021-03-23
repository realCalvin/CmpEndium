import axios from 'axios';

export function searchIndeedJobs(search) {
    const {
        keywords,
        location
    } = search;

    return axios.post('/api/simplyhired/search', {
        keywords,
        location
    }).then(res => {
        return res;
    })
}