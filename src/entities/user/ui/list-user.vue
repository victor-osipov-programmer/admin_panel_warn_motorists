<template>
    <v-list-item :subtitle="formatPhone(user.phone)" :title="user.name">
        <template v-slot:prepend>
            {{ 0 }}

            <v-avatar>
                <v-icon icon="mdi-car"></v-icon>
            </v-avatar>

            <v-tooltip activator="parent">Количество машин</v-tooltip>
        </template>

        <template v-slot:append>
            <div class="d-flex ga-3">
                <v-chip color="deep-orange-darken-1" label>
                    <v-icon icon="mdi-fire" start></v-icon>
                    {{ new Date().toLocaleString() }}

                    <v-tooltip activator="parent" location="top">Подписка активна до</v-tooltip>
                </v-chip>

                <slot>

                </slot>
            </div>

        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import { formatPhone } from '@/shared/libs';
import type { IUserApi } from '../types';

defineProps<{
    user: IUserApi
}>()
</script>

<style lang="scss" scoped></style>