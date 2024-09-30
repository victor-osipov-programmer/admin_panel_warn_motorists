<template>
    <v-app>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <ConfirmDialog group="confirm_html">
            <template #message="slotProps">
                <div v-html="slotProps.message.message"></div>
            </template>
        </ConfirmDialog>

        <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
            <div class="d-flex justify-space-between align-center mr-1 ml-2 my-1 ga-3">
                <div class="d-flex align-center ga-2">
                    <img class="app-icon" src="/icons/app-icon.png" alt="app-icon" @click.stop="rail = !rail">

                    <v-btn v-if="access_token" @click="logout" size="x-small" color="red" :elevation="0">Выйти</v-btn>
                    <v-btn v-if="access_token" @click="damp" size="x-small" color="green" :elevation="0">Дамп БД</v-btn>
                </div>


                <v-btn class="arrow" icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </div>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item :to="{ name: 'statistics' }" prepend-icon="mdi-chart-line"
                    title="Статистика"></v-list-item>
                <v-list-item :to="{ name: 'users' }" prepend-icon="mdi-account-group-outline"
                    title="Пользователи"></v-list-item>
                <v-list-item :to="{ name: 'processing_applications' }" prepend-icon="mdi-check-all"
                    title="Заявки на обработку"></v-list-item>
                <v-list-item :to="{ name: 'mailing' }" prepend-icon="mdi-email" title="Рассылка"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <RouterView></RouterView>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { http } from '@/shared/api';
import { downloadFileByURL } from '@/shared/libs/file';
import { useLocalStorage } from '@vueuse/core';
import { ToastServiceMethods } from 'primevue/toastservice';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { Router, useRouter } from 'vue-router';

const refresh_token = useLocalStorage('refresh_token', null)
const access_token = useLocalStorage('access_token', null)
const router = useRouter()
window.toast = useToast()
window.router = router

declare global {
    interface Window {
        toast: ToastServiceMethods;
        router: Router;
    }
}

window.onbeforeunload = () => {
    const refresh_token = useLocalStorage('refresh_token', null)
    const access_token = useLocalStorage('access_token', null)
    refresh_token.value = null;
    access_token.value = null;
}

const drawer = ref(true)
const rail = ref(true)

function logout() {
    refresh_token.value = null;
    access_token.value = null;

    window.toast.add({ severity: 'success', summary: 'Успешно', detail: 'Вы вышли', life: 3000 });
    return window.router.push({ 'name': 'login' })
}

async function damp() {
    const { data } = await http.get('/admin/dump')

    console.log(data);
    try {
        downloadFileByURL('users_dump.xlsx', data)
        window.toast.add({ severity: 'success', summary: 'Успешно', detail: 'Дамп базы данных сохранён', life: 3000 });
    } catch (err) {
        window.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить дамп', life: 3000 });
    }
}
</script>

<style scoped>
.app-icon {
    cursor: pointer;
    width: 40px;
}

.arrow {
    transition: all 1s;
}
</style>