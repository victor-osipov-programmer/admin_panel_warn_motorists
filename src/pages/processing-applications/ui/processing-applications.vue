<template>
    <div class="processing-applications">

        <Card class="card ma-5">
            <template #title>
                <div class="text-grey mb-3">
                    Заявки на обработку
                </div>
            </template>

            <template #subtitle>
                <Select v-model="sortByDate" :options="sortOptions" optionLabel="label" />
            </template>

            <template #content>
                <DataView data-key="id" :value="applications" paginator :rows="5" :sortOrder="sortByDate.value"
                    :sortField="'application_time'">
                    <template #list="slotProps">
                        <div class="py-5">
                            <v-list-item @click="openDialog(application.id)" v-for="application in slotProps.items"
                                :key="application.id" :subtitle="application.telephone" :title="application.first_name"
                                :value="application.id">
                                <template v-slot:append>
                                    <div class="d-flex ga-3">
                                        <v-chip color="green" label>
                                            <v-icon icon="mdi-message" start></v-icon>
                                            {{ new Date(application.application_time).toLocaleString() }}

                                            <v-tooltip activator="parent">Время заявки</v-tooltip>
                                        </v-chip>
                                    </div>
                                </template>
                            </v-list-item>
                        </div>
                    </template>

                    <template #empty>
                        <div class="py-5 text-grey">
                            Заявок больше нет
                        </div>
                    </template>
                </DataView>
            </template>
        </Card>


        <Dialog v-model:visible="dialog" modal header="Заявка">
            <Galleria :value="application_cars" :numVisible="3">
                <template #item="slotProps">
                    <Image preview :src="slotProps.item" alt="Car">
                        <template #image>
                            <img class="img" :src="slotProps.item" alt="Car" style="height: 350px; width: 550px;">
                        </template>
                    </Image>
                </template>

                <template #thumbnail="slotProps">
                    <img class="img thumbnail-img" :src="slotProps.item" alt="Car"
                        style="height: 60px; width: 120px;" />
                </template>
            </Galleria>

            <div class="d-flex ga-3 mt-5">
                <v-spacer></v-spacer>
                <v-btn color="red" @click="deny">Отказать</v-btn>
                <v-btn color="green" @click="accept">Принять</v-btn>
            </div>
        </Dialog>
    </div>
</template>

<script lang="ts" setup>
import { useApplicationModel } from '@/entities/application';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';

const toast = useToast();
const application_model = useApplicationModel()
application_model.fetchApplications()

const sortByDate = ref({ label: 'Сночало старые', value: 1 })
const sortOptions = ref([
    { label: 'Сночало новые', value: -1 },
    { label: 'Сночало старые', value: 1 },
]);
const application_id = ref<null | string>(null)
const application_cars = computed(() => {
    return applications.value.find((application) => application.id === application_id.value)?.cars ?? []
})
const dialog = ref(false)


const applications = computed(() => {
    return application_model.applications.map((application) => ({
        id: application.id,
        first_name: 'user_id: ' + application.user_id,
        telephone: 'car_number: ' + application.number + ' - brand: ' + application.brand,
        application_time: Date.now() - 10000,
        cars: [application.photo]
    }))
})


// const applications = ref([
//     {
//         id: 1,
//         first_name: 'Сергей',
//         telephone: '+7 495 720 03 53',
//         application_time: Date.now() - 10000,
//         cars: ['https://s0.rbk.ru/v6_top_pics/resized/800xH/media/img/0/59/756473552274590.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVB2T7RjpW-Q5kEEPbD2Gstj3EUMKRjGscQ&s']
//     },
//     {
//         id: 2,
//         first_name: 'Дима',
//         telephone: '+7 495 459 47 76',
//         application_time: Date.now() - 100000,
//         cars: ['https://0d314c86-f76b-45cc-874e-45816116a667.selcdn.net/21239ef8-9300-4d9f-8ea0-69a1797d34ef.jpg']
//     },
//     {
//         id: 3,
//         first_name: 'Аня',
//         telephone: '7 495 862 27 68',
//         application_time: Date.now() - 1000000,
//         cars: [
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGWbgMFHar8loIhNsYgGXKnWVVUMOwDYGBA&s',
//             'https://avatars.mds.yandex.net/get-autoru-vos/2174504/1ef07ca6c3bee799ec23ac7c91cf07d2/456x342',
//             'https://avatars.mds.yandex.net/get-autoru-vos/4824178/3f2a3fbec76d93fa83b4fcd7b978a008/456x342',
//             'https://n1s1.hsmedia.ru/7a/54/af/7a54af3d58c2fab554f49ce9436e0d07/656x459_1_79220294744ff7f9918baa6396b91d35@1066x745_0xqyxHKZ1u_7037729002278220071.jpg.webp'
//         ]
//     },
//     {
//         id: 4,
//         first_name: 'Свят',
//         telephone: '7 495 946 95 49',
//         application_time: Date.now() - 100000000,
//         cars: [
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGWbgMFHar8loIhNsYgGXKnWVVUMOwDYGBA&s',
//             'https://avatars.mds.yandex.net/get-autoru-vos/2174504/1ef07ca6c3bee799ec23ac7c91cf07d2/456x342',
//             'https://avatars.mds.yandex.net/get-autoru-vos/4824178/3f2a3fbec76d93fa83b4fcd7b978a008/456x342',
//             'https://n1s1.hsmedia.ru/7a/54/af/7a54af3d58c2fab554f49ce9436e0d07/656x459_1_79220294744ff7f9918baa6396b91d35@1066x745_0xqyxHKZ1u_7037729002278220071.jpg.webp'
//         ]
//     },
//     {
//         id: 5,
//         first_name: 'Андрей',
//         telephone: '7 495 696 30 06',
//         application_time: Date.now() - 200000000,
//         cars: [
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGWbgMFHar8loIhNsYgGXKnWVVUMOwDYGBA&s',
//             'https://avatars.mds.yandex.net/get-autoru-vos/2174504/1ef07ca6c3bee799ec23ac7c91cf07d2/456x342',
//             'https://avatars.mds.yandex.net/get-autoru-vos/4824178/3f2a3fbec76d93fa83b4fcd7b978a008/456x342',
//             'https://n1s1.hsmedia.ru/7a/54/af/7a54af3d58c2fab554f49ce9436e0d07/656x459_1_79220294744ff7f9918baa6396b91d35@1066x745_0xqyxHKZ1u_7037729002278220071.jpg.webp'
//         ]
//     },
//     {
//         id: 6,
//         first_name: 'Павел',
//         telephone: '+7 495 261 48 18',
//         application_time: Date.now() - 300000000,
//         cars: [
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGWbgMFHar8loIhNsYgGXKnWVVUMOwDYGBA&s',
//             'https://avatars.mds.yandex.net/get-autoru-vos/2174504/1ef07ca6c3bee799ec23ac7c91cf07d2/456x342',
//             'https://avatars.mds.yandex.net/get-autoru-vos/4824178/3f2a3fbec76d93fa83b4fcd7b978a008/456x342',
//             'https://n1s1.hsmedia.ru/7a/54/af/7a54af3d58c2fab554f49ce9436e0d07/656x459_1_79220294744ff7f9918baa6396b91d35@1066x745_0xqyxHKZ1u_7037729002278220071.jpg.webp'
//         ]
//     },
//     {
//         id: 7,
//         first_name: 'Саня',
//         telephone: '+7 495 944 66 68',
//         application_time: Date.now() - 400000000,
//         cars: [
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGWbgMFHar8loIhNsYgGXKnWVVUMOwDYGBA&s',
//             'https://avatars.mds.yandex.net/get-autoru-vos/2174504/1ef07ca6c3bee799ec23ac7c91cf07d2/456x342',
//             'https://avatars.mds.yandex.net/get-autoru-vos/4824178/3f2a3fbec76d93fa83b4fcd7b978a008/456x342',
//             'https://n1s1.hsmedia.ru/7a/54/af/7a54af3d58c2fab554f49ce9436e0d07/656x459_1_79220294744ff7f9918baa6396b91d35@1066x745_0xqyxHKZ1u_7037729002278220071.jpg.webp'
//         ]
//     },
//     {
//         id: 8,
//         first_name: 'Федя',
//         telephone: '+7 495 874 30 11',
//         application_time: Date.now() - 100000,
//         cars: [
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGWbgMFHar8loIhNsYgGXKnWVVUMOwDYGBA&s',
//             'https://avatars.mds.yandex.net/get-autoru-vos/2174504/1ef07ca6c3bee799ec23ac7c91cf07d2/456x342',
//             'https://avatars.mds.yandex.net/get-autoru-vos/4824178/3f2a3fbec76d93fa83b4fcd7b978a008/456x342',
//             'https://n1s1.hsmedia.ru/7a/54/af/7a54af3d58c2fab554f49ce9436e0d07/656x459_1_79220294744ff7f9918baa6396b91d35@1066x745_0xqyxHKZ1u_7037729002278220071.jpg.webp'
//         ]
//     },
// ])

function openDialog(id: string) {
    application_id.value = id;
    dialog.value = true;
}
function deleteApplication() {
    application_model.applications = application_model.applications.filter(application => application.id !== application_id.value)
    application_id.value = null
}

function accept() {
    dialog.value = false;
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Заявление принято', life: 3000 });
    deleteApplication()
    setTimeout(() => {
    }, 5000)
}
function deny() {
    dialog.value = false;
    toast.add({ severity: 'warn', summary: 'Успешно', detail: 'Заявление отклонено', life: 3000 });
    deleteApplication()
    setTimeout(() => {
    }, 5000)
}

</script>

<style lang="scss" scoped>
.img {
    object-fit: cover;
}

// без этого при закрытии Dialog съезжают маленькие картинки
:deep(.p-galleria-thumbnail-item) {
    flex: 1 0 33.333333333333336%;
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