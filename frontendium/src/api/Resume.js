import axios from 'axios';

export function saveResume(query) {
    const {
        link,
        uploadDate,
        email,
        major
    } = query;

    return axios.post('/api/database/saveresume', {
        link,
        uploadDate,
        email,
        major
    }).then(res => {
        return res;
    });
}

export function getUserResume(email) {
    return axios.post('/api/database/getuserresume', {
        email: email
    }).then(res => {
        return res;
    });
}
