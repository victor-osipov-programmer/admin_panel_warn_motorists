<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
            <div class="d-flex justify-end mr-1 my-1">
                <v-btn :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" @click.stop="rail = !rail"></v-btn>
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
import { ref } from 'vue';

const drawer = ref(true)
const rail = ref(true)
</script>