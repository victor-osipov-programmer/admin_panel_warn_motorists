<template>
    <v-list-item class="list-application" :subtitle="application.brand + ' ' + application.number" :title="'user_id: ' + application.user_id">
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

<script lang="ts"setup>
import type { IApplicationApi } from '../types';

defineProps<{
    application: IApplicationApi
}>()
</script>

<style lang="scss" scoped></style>