import axios from 'axios';

export const quizzardClient = axios.create({
    baseURL: 'http://localhost',
    headers: {
        'Content-Type': 'application/json'
    }
})