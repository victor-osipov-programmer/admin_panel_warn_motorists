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
                <img class="app-icon" src="/icons/app-icon.png" alt="app-icon" @click.stop="rail = !rail">

                <v-btn class="arrow" icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </div>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item :to="{name: 'statistics'}" prepend-icon="mdi-chart-line" title="Статистика"></v-list-item>
                <v-list-item :to="{name: 'users'}" prepend-icon="mdi-account-group-outline" title="Пользователи"></v-list-item>
                <v-list-item :to="{name: 'processing_applications'}" prepend-icon="mdi-check-all" title="Заявки на обработку"></v-list-item>
                <v-list-item :to="{name: 'mailing'}" prepend-icon="mdi-email" title="Рассылка"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <RouterView></RouterView>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ToastServiceMethods } from 'primevue/toastservice';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { Router, useRouter } from 'vue-router';

window.toast = useToast()
window.router = useRouter()

declare global {
    interface Window {
        toast: ToastServiceMethods;
        router: Router;
    }
}

const drawer = ref(true)
const rail = ref(true)
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