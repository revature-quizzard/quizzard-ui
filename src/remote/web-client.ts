import axios from 'axios';

export const webappClient = axios.create({
    //baseURL: 'http://18.217.93.22:5555',
    baseURL: 'http://localhost:5555',
    headers: {
        'Content-Type': 'application/json'
    }
})


export const webappClientAuthorized = axios.create({
    //baseURL: 'http://18.217.93.22:5555',
    baseURL: 'http://localhost:5555',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("authorization"),
    }
})