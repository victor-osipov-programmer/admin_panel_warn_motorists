import { useLocalStorage } from "@vueuse/core";
import { http } from "./http";

export async function fetchLogin(email: string, password: string, code: string) {
    const { data } = await http.put('/admin/login', {
        email,
        password,
        code
    })

    const access_token = useLocalStorage('access_token', null)
    access_token.value = data.access;
    const refresh_token = useLocalStorage('refresh_token', null)
    refresh_token.value = data.refresh;

    return data;
}