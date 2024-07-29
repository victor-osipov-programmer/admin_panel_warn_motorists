import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 2000,
    headers: { 'Content-Type': 'application/json' }
})
