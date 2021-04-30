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

export function setShareResume(query) {
    const {
        email,
        visible
    } = query;

    return axios.post('/api/database/setshareresume', {
        email: email,
        visible: visible
    }).then(res => {
        return res;
    });
}

export function saveResumeComment(query) {
    const {
        _id,
        username,
        comment
    } = query;

    return axios.post('/api/database/saveresumecomment', {
        _id,
        username,
        comment
    }).then(res => {
        return res;
    });
}
