import axios from 'axios';

export const quizzardClient = axios.create({
    baseURL: 'http://quizzard-api-lb-109748176.us-east-2.elb.amazonaws.com',
    headers: {
        'Content-Type': 'application/json'
    }
})