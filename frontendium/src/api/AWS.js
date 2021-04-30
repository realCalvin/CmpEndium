import axios from 'axios';

export async function uploadResume(resume, email, info) {
    return axios.post('/api/upload', { data: resume, email: email, major: info }).then(res => {
        return res;
    });
}

export async function deleteResume() {

}

export async function retrieve(major) {
    return axios.post('/api/retrieve', { major }).then(res => {
        return res;
    });
}
