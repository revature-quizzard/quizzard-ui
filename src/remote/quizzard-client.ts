import axios from 'axios';
import apiUrl from './api-url';

export const quizzardClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});