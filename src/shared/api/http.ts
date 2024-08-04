import { useLocalStorage } from '@vueuse/core';
import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://parcomat.ru',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
})

http.interceptors.request.use(function (config) {
    const access_token = useLocalStorage('access_token', null)

    if (config.url != '/auth/token/refresh') {
        config.headers.Authorization = `Bearer ${access_token.value}`
    }

    return config;
});

http.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
        console.error('Сервер не отвечает', error.request); // Нет ответа от сервера
        window.toast.add({ severity: 'error', summary: 'Сервер не отвечает', detail: 'Плохой интернет или ошибка на стороне сервера', life: 3000 });
    } else if (!error.response.data) {
        console.error('Нет данных в ответе', error.response); // Ответ не содержит данных
    } else {
        console.error('Сервер вернул ошибку:', error.response); // Ошибка пришла от сервера

        if (error.response.status === 500) {
            window.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка на стороне сервера', life: 3000 });
        }

        if (originalRequest._retry || originalRequest.url == '/auth/token/refresh') {
            return reportError()
        }

        if (error.response.data == 'invalid token') {
            originalRequest._retry = true;

            const refresh_token = useLocalStorage('refresh_token', null)
            const access_token = useLocalStorage('access_token', null)

            const params = new URLSearchParams()
            params.append('role', 'admin')

            const { status: refresh_status, data } = await http.get('/auth/token/refresh', { params, headers: { 'Authorization': `Bearer ${refresh_token.value}` } })

            if (refresh_status !== 200) {
                return reportError()
            }

            access_token.value = data.token
            refresh_token.value = data.refresh

            http.defaults.headers.Authorization = 'Bearer ' + data.token;
            return http(originalRequest);
        }
    }

    return Promise.reject(error); // Передаем ошибку обратно
});

function reportError() {
    const refresh_token = useLocalStorage('refresh_token', null)
    const access_token = useLocalStorage('access_token', null)
    refresh_token.value = null;
    access_token.value = null;

    window.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Подтвердите личность', life: 3000 });
    return window.router.push({ 'name': 'login' })
}