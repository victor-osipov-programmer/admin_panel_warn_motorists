<template>
    <v-list-item :subtitle="formatPhone(user.phone)" :title="user.name">
        <template v-slot:prepend>
            <div class="d-flex align-center">
                <div class="d-flex align-center mr-3">
                    {{ cars_number }}

                    <v-avatar>
                        <v-icon icon="mdi-car"></v-icon>
                    </v-avatar>
                    <v-tooltip activator="parent">Количество машин</v-tooltip>
                </div>

                <Avatar v-if="user.avatar" :image="user.avatar" class="mr-3 user-avatar" size="normal" shape="circle" />
                <Avatar v-else icon="pi pi-user" class="mr-3" size="normal" shape="circle" />
            </div>
        </template>

        <template v-slot:append>
            <div class="d-flex ga-3">
                <v-chip v-if="user.subscription_end" color="green" label>
                    <v-icon icon="mdi-fire" start></v-icon>
                    {{ new Date(user.subscription_end).toLocaleString() }}

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
import { computed } from 'vue';

const props = defineProps<{
    user: IUserApi
}>()

const cars_number = computed(() => {
    return props.user.cars_owned === null ? 0 : props.user.cars_owned.length
})
</script>

<style lang="scss" scoped></style>