import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://parcomat.ru',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjI0NDMxMDUsImlkIjoiMSIsInJvbGUiOiJhZG1pbiJ9.4gpKHdCK9QYWj1vkTBKx9e7HGdN1dV9V-cCFFtSdi5c' }
})
