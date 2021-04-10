import axios from "axios";

export async function uploadResume(resume) {
    console.log(resume);
    return axios.post('/api/upload', resume).then(res => {
        return res;
    })
}

export async function deleteResume() {

}

export async function retrieve(major) {
    return axios.post('/api/retrieve', {major}).then(res => {
        return res;
    })
}