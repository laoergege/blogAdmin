import axios from 'axios';
import config from '../config';


export default function (params) {
    return axios.create({
        baseURL: config.APIADDR,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': localStorage.getItem('token') || ''
        },
        // timeout: 3000,
    })
}