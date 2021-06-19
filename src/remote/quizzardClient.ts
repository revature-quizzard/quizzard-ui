import axios from 'axios';

export const quizzardClient = axios.create({
    baseURL: 'https://localhost:5555',
    headers: {
        'Content-Type': 'application/json'
    }
})