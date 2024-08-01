import { useLocalStorage } from '@vueuse/core';
import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://parcomat.ru',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
})

http.interceptors.request.use(function (config) {
    const access_token = useLocalStorage('access_token', null)

    if (access_token.value) {
        config.headers.Authorization = `Bearer ${access_token.value}`;
    }
     
    return config;
});

http.interceptors.response.use(response => response, error => {
    if (!error.response) {
        console.error('Сервер не отвечает', error.request); // Нет ответа от сервера
    } else if (!error.response.data) {
        console.error('Нет данных в ответе', error.response); // Ответ не содержит данных
    } else {
        console.error('Сервер вернул ошибку:', error.response); // Ошибка пришла от сервера

        if (error.response.data == 'invalid token') {
            console.log('не валидный токен')
            
        }
    }
    return Promise.reject(error); // Передаем ошибку обратно
});
