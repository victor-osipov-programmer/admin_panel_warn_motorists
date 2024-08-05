<template>
    <v-list-item class="list-application" :subtitle="application.brand + ' ' + application.number">
        <template #title>
            <v-chip class="mb-1" color="green" label>
                <v-icon icon="mdi-card-account-details-outline" start></v-icon>
                {{ application.user_id }}

                <v-tooltip activator="parent" location="top">id пользователя</v-tooltip>
            </v-chip>
        </template>

        <template v-slot:append>

            <div class="d-flex ga-3">
                <v-chip color="green" label>
                    <v-icon icon="mdi-message" start></v-icon>
                    {{ new Date(application.request_created).toLocaleString() }}

                    <v-tooltip activator="parent">Время заявки</v-tooltip>
                </v-chip>
            </div>

        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import type { IApplicationApi } from '../types';

defineProps<{
    application: IApplicationApi
}>()
</script>

<style lang="scss" scoped></style>