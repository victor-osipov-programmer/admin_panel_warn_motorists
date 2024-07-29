<template>
    <v-list lines="two">
        <v-list-subheader>Пользователи</v-list-subheader>

        <v-list-item v-for="user in users" :key="user.id" :subtitle="user.telephone" :title="user.first_name">
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
    </v-list>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
    {
        id: 1,
        first_name: 'Вася',
        telephone: `+7 212 885 96 76`,
        number_cars: 1,
        end_subscription: 1722168504214
    },
    {
        id: 2,
        first_name: 'Петя',
        telephone: `+7 679 131 18 21`,
        number_cars: 2,
        end_subscription: 1722168504214
    },
    {
        id: 3,
        first_name: 'Влад',
        telephone: `+7 251 474 47 88`,
        number_cars: 2,
        end_subscription: 1722168504214
    },
    {
        id: 4,
        first_name: 'Катя',
        telephone: `+7 329 781 74 06`,
        number_cars: 1,
        end_subscription: 1722168504214
    },
    {
        id: 5,
        first_name: 'Настя',
        telephone: `+7 431 438 65 29`,
        number_cars: 1,
        end_subscription: 1722168504214
    },
])
</script>

<style lang="scss" scoped></style>