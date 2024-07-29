<template>
    <div class="processing-applications">
        <v-list lines="two">
            <v-list-subheader>Заявки на обработку</v-list-subheader>

            <v-list-item @click="openDialog" v-for="user in users" :key="user.id" :subtitle="user.telephone"
                :title="user.first_name" :value="user.id">
                <template v-slot:append>
                    <div class="d-flex ga-3">
                        <v-chip color="green" label>
                            <v-icon icon="mdi-message" start></v-icon>
                            {{ new Date(user.application_time).toLocaleString() }}

                            <v-tooltip activator="parent">Время заявки</v-tooltip>
                        </v-chip>
                    </div>
                </template>
            </v-list-item>


            <v-dialog v-model="dialog" max-width="1000">

                <v-card title="Заявка">
                    <div class="pa-5 images">
                        <v-img v-for="n in 4"
                            src="https://s0.rbk.ru/v6_top_pics/resized/800xH/media/img/0/59/756473552274590.jpg" cover>

                            <template v-slot:placeholder>
                                <v-row>
                                    <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </div>

                    <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" @click="dialog = false">Отказать</v-btn>
                        <v-btn color="green" @click="dialog = false">Принять</v-btn>
                    </template>
                </v-card>
            </v-dialog>
        </v-list>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const dialog = ref(false)
const users = ref([
    {
        id: 1,
        first_name: 'Сергей',
        telephone: '7 926 818 86 63',
        application_time: 1722168504214
    },
    {
        id: 2,
        first_name: 'Дима',
        telephone: '7 926 818 86 63',
        application_time: 1722168504214
    },
    {
        id: 3,
        first_name: 'Сергей',
        telephone: '7 926 818 86 63',
        application_time: 1722168504214
    },
])

function openDialog() {
    dialog.value = true;
}
</script>

<style lang="scss" scoped>
.images {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

@media (width < 1000px) {
    .images {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (width < 700px) {
    .images {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>