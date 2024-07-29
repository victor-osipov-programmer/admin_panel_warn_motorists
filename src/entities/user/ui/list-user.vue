<template>
    <v-list-item :subtitle="user.telephone" :title="user.first_name">
        <template v-slot:prepend>
            {{ user.number_cars }}

            <v-avatar>
                <v-icon icon="mdi-car"></v-icon>
            </v-avatar>

            <v-tooltip activator="parent">Количество машин</v-tooltip>
        </template>

        <template v-slot:append>
            <div class="d-flex ga-3">
                <v-chip color="deep-orange-darken-1" label>
                    <v-icon icon="mdi-fire" start></v-icon>
                    {{ new Date(user.end_subscription).toLocaleString() }}

                    <v-tooltip activator="parent" location="top">Подписка активна до</v-tooltip>
                </v-chip>


                <v-btn>
                    <template v-slot:prepend>
                        <v-icon icon="mdi-gift" start></v-icon>
                    </template>

                    Подарить подписку

                    <v-tooltip activator="parent" location="top">Подарить подписку</v-tooltip>
                </v-btn>
                <v-btn>
                    <template v-slot:prepend>
                        <v-icon icon="mdi-email" start></v-icon>
                    </template>

                    Персональная рассылка

                    <v-tooltip activator="parent" location="top">Персональная рассылка</v-tooltip>
                </v-btn>
                <v-btn color="deep-orange-darken-4">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-lock" start></v-icon>
                    </template>

                    Блокировать

                    <v-tooltip activator="parent" location="top">Блокировать пользователя</v-tooltip>
                </v-btn>
            </div>

        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import { IUser } from './types';

defineProps<{
    user: IUser
}>()
</script>

<style lang="scss" scoped></style>