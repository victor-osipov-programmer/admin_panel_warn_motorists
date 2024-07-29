<template>
    <div class="users">
        <v-list lines="two">
            <v-list-subheader>Пользователи</v-list-subheader>

            <list-user v-for="user in users" :key="user.id" :user />
        </v-list>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListUser } from '@/entities/user';

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