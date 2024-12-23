import axios from 'axios';

// const baseURL = 'http://localhost:8000/';
const baseURL = 'https://eko-mart.onrender.com/';

const api = axios.create({
    baseURL : baseURL
})

export default api;