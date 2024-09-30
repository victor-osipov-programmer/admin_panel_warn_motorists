import { useLocalStorage } from "@vueuse/core";
import { http } from "./http";
import md5 from 'md5';

export async function fetchLogin(email: string, password: string, code: string) {
    password = md5(password)

    const { data } = await http.post<{
        expire: string,
        expire_refresh: string,
        refresh: string,
        token: string
    }>('/admin/login', {
        email,
        password,
        code
    })

    const access_token = useLocalStorage('access_token', null)
    const refresh_token = useLocalStorage('refresh_token', null)
    // @ts-ignore
    access_token.value = data.token;
    // @ts-ignore
    refresh_token.value = data.refresh;

    return data;
}