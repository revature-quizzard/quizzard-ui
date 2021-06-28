import axios from 'axios';

export const quizzardApiClient = axios.create({
    baseURL: 'http://quizzard-api-lb-109748176.us-east-2.elb.amazonaws.com',
    //baseURL: 'http://1.2.3.4:5000',
    headers: {
        'Content-Type': 'application/json'
    }
})


export const quizzardApiClientTokenAuthorized = axios.create({
    baseURL: 'http://quizzard-api-lb-109748176.us-east-2.elb.amazonaws.com',
    //baseURL: 'http://1.2.3.4:5000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("Authorization"),
    }
})

export const quizzardApiClientTokenAuthorizedSynchronous = axios.create({
    baseURL: 'http://localhost:5000',
    //baseURL: 'http://1.2.3.4:5000',
})

