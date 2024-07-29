<template>
    <div class="users">
        <v-list lines="two">
            <v-list-subheader>Пользователи</v-list-subheader>

            <v-list-group v-for="user in users" :key="user.id">
                <template v-slot:activator="{ props }">
                    <list-user v-bind="props" :user />
                </template>

                <div class="pl-8 py-8 pr-5 user-content">

                    <div class="cars">
                        <v-img v-for="car in user.cars" :src="car" height="300" cover rounded></v-img>
                    </div>
                </div>
            </v-list-group>
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
        end_subscription: 1722168504214,
        cars: ['https://avatars.mds.yandex.net/get-vertis-journal/3911415/2021-05-10-890ccf176b404309b2345c57b7f80957.jpg_1622737442641/orig']
    },
    {
        id: 2,
        first_name: 'Петя',
        telephone: `+7 679 131 18 21`,
        number_cars: 2,
        end_subscription: 1722168504214,
        cars: [
            'https://avatars.mds.yandex.net/get-vertis-journal/3911415/2021-05-10-890ccf176b404309b2345c57b7f80957.jpg_1622737442641/orig',
            'https://ss.metronews.ru/userfiles/materials/178/1786872/858x540_fca221fd.jpg'
        ]
    },
    {
        id: 3,
        first_name: 'Влад',
        telephone: `+7 251 474 47 88`,
        number_cars: 4,
        end_subscription: 1722168504214,
        cars: [
            'https://avatars.mds.yandex.net/get-vertis-journal/3911415/2021-05-10-890ccf176b404309b2345c57b7f80957.jpg_1622737442641/orig',
            'https://ss.metronews.ru/userfiles/materials/178/1786872/858x540_fca221fd.jpg',
            'https://avatars.mds.yandex.net/get-vertis-journal/3934100/2021-01-21-e124da7f02874747a20ecc9480bf003c.jpg_1622737076010/orig',
            'https://www.primeobzor.ru/wp-content/uploads/2023/03/top-45-luchshih-mashin-do-1-mln-rublej-2023-otechestvennye-proizvoditeli-avto-d9cd431.jpg'
        ]
    },
    {
        id: 4,
        first_name: 'Катя',
        telephone: `+7 329 781 74 06`,
        number_cars: 1,
        end_subscription: 1722168504214,
        cars: ['https://avatars.mds.yandex.net/get-vertis-journal/3911415/2021-05-10-890ccf176b404309b2345c57b7f80957.jpg_1622737442641/orig']
    },
    {
        id: 5,
        first_name: 'Настя',
        telephone: `+7 431 438 65 29`,
        number_cars: 1,
        end_subscription: 1722168504214,
        cars: ['https://avatars.mds.yandex.net/get-vertis-journal/3911415/2021-05-10-890ccf176b404309b2345c57b7f80957.jpg_1622737442641/orig']
    },
])
</script>

<style lang="scss" scoped>
.cars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

</style>