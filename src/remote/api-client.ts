import axios from 'axios';
import apiUrl from './api-url';


export const quizzardApiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})


export const quizzardApiClientTokenAuthorized = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("authorization"),
    }
})

export const quizzardApiClientTokenAuthorizedSynchronous = axios.create({
    baseURL: apiUrl
})

