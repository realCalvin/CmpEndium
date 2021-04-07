import axios from "axios";

export async function upload(){

}

export async function deleteResume(){

}

export async function retrieve(major){
    return axios.post('/api/retrieve', {major}).then(res => {
        return res;
    })
}