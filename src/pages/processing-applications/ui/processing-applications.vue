<template>
    <div class="processing-applications">
        <v-list lines="two">
            <v-list-subheader>Заявки на обработку</v-list-subheader>

            <v-list-item @click="openDialog(application.id)" v-for="application in applications" :key="application.id"
                :subtitle="application.telephone" :title="application.first_name" :value="application.id">
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

            <Dialog v-model:visible="dialog" modal header="Заявка">
                <Galleria :value="application_cars" numVisible="3">
                    <template #item="slotProps">
                        <Image preview :src="slotProps.item" alt="Car">
                            <template #image>
                                <img class="img" :src="slotProps.item" alt="Car" style="height: 350px; width: 550px;">
                            </template>
                        </Image>
                    </template>

                    <template #thumbnail="slotProps">
                        <img class="img thumbnail-img" :src="slotProps.item" alt="Car" style="height: 60px; width: 120px;" />
                    </template>
                </Galleria>

                <div class="d-flex ga-3 mt-5">
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="deny">Отказать</v-btn>
                    <v-btn color="green" @click="accept">Принять</v-btn>
                </div>
            </Dialog>
        </v-list>
    </div>
</template>

<script setup>
import { Loading } from '@/shared/ui/loading';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';

const toast = useToast();

const application_id = ref(null)
const application_cars = computed(() => {
    return applications.value.find((application) => application.id === application_id.value)?.cars ?? []
})
const dialog = ref(false)
const dialog_result = ref(null)
const notification = ref(false)
const applications = ref([
    {
        id: 1,
        first_name: 'Сергей',
        telephone: '7 926 818 86 63',
        application_time: 1722168504214,
        cars: ['https://s0.rbk.ru/v6_top_pics/resized/800xH/media/img/0/59/756473552274590.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVB2T7RjpW-Q5kEEPbD2Gstj3EUMKRjGscQ&s']
    },
    {
        id: 2,
        first_name: 'Дима',
        telephone: '7 926 818 86 63',
        application_time: 1722168504214,
        cars: ['https://0d314c86-f76b-45cc-874e-45816116a667.selcdn.net/21239ef8-9300-4d9f-8ea0-69a1797d34ef.jpg']
    },
    {
        id: 3,
        first_name: 'Сергей',
        telephone: '7 926 818 86 63',
        application_time: 1722168504214,
        cars: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGWbgMFHar8loIhNsYgGXKnWVVUMOwDYGBA&s',
            'https://avatars.mds.yandex.net/get-autoru-vos/2174504/1ef07ca6c3bee799ec23ac7c91cf07d2/456x342',
            'https://avatars.mds.yandex.net/get-autoru-vos/4824178/3f2a3fbec76d93fa83b4fcd7b978a008/456x342',
            'https://n1s1.hsmedia.ru/7a/54/af/7a54af3d58c2fab554f49ce9436e0d07/656x459_1_79220294744ff7f9918baa6396b91d35@1066x745_0xqyxHKZ1u_7037729002278220071.jpg.webp'
        ]
    },
])

function openDialog(id) {
    application_id.value = id;
    dialog.value = true;
}
function deleteApplication() {
    applications.value = applications.value.filter(application => application.id !== application_id.value)
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