import { useLocalStorage } from "@vueuse/core";
import { http } from "./http";

export async function fetchLogin(username: string, password: string) {
    const { data } = await http.put('/admin/login', {
        username,
        password
    })

    const access_token = useLocalStorage('access_token', null)
    access_token.value = data.access;
    const refresh_token = useLocalStorage('refresh_token', null)
    refresh_token.value = data.refresh;

    return data;
}