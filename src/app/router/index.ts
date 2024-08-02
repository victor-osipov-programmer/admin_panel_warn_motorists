import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useLocalStorage } from "@vueuse/core";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const access_token = useLocalStorage('access_token', null)

    if (to.name != 'login') {
        if (!access_token.value) {
            return next({name: 'login'})
        }
    }
    
    next()
})