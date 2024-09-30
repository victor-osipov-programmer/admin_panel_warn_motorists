<template>
    <v-list-item :subtitle="formatPhone(user.phone)" :title="user.name">
        <template v-slot:prepend>
            <div class="d-flex align-center">

                <div class="d-flex align-center mr-3">
                    {{ user.car_count }}

                    <v-avatar>
                        <v-icon icon="mdi-car"></v-icon>
                    </v-avatar>
                    <v-tooltip activator="parent">Количество машин</v-tooltip>
                </div>

                <v-chip class="mr-2" color="green" label>
                    <v-icon icon="mdi-card-account-details-outline" start></v-icon>
                    {{ user?.id }}

                    <v-tooltip activator="parent" location="top">id пользователя</v-tooltip>
                </v-chip>
                

                <Avatar v-if="user.img" :image="user.img" class="mr-3 user-avatar" size="normal" shape="circle" />
                <Avatar v-else icon="pi pi-user" class="mr-3" size="normal" shape="circle" />

                
            </div>
        </template>

        <template v-slot:append>
            <div class="d-flex ga-3">
                <v-chip v-if="user.subscription" color="green" label>
                    <v-icon icon="mdi-fire" start></v-icon>
                    {{ new Date(user.subscription).toLocaleString() }}

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