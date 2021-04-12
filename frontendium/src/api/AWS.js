import axios from 'axios';

export async function uploadResume(resume) {
  return axios.post('/api/upload', { data: resume }).then(res => {
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
