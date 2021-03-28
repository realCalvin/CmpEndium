import axios from 'axios';

export async function UserInfo(email) {
    return axios.post('/api/getUserInfo', {
        email
    }).then(res => {
        return res;
    })
}