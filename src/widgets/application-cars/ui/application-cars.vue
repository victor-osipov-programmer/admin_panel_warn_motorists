<template>
    <dialog-galleria v-model:visible="visible" :header :images="application_cars">
        <template #item="{ item }">
            <Image preview :src="item" alt="Car">
                <template #image>
                    <img class="img" :src="item" alt="Car" style="height: 350px; width: 550px;">
                </template>
            </Image>
        </template>

        <template #thumbnail="{ item }">
            <img class="img thumbnail-img" :src="item" alt="Car" style="height: 60px; width: 120px;" />
        </template>

        <template #actions>
            <div class="d-flex ga-3 mt-5">
                <v-spacer></v-spacer>
                <v-btn color="red" @click="deny">Отказать</v-btn>
                <v-btn color="green" @click="accept">Принять</v-btn>
            </div>
        </template>
    </dialog-galleria>
</template>

<script lang="ts" setup>
import { DialogGalleria } from '@/features/dialog-galleria';
import { useToast } from 'primevue/usetoast';

defineProps<{
    header: string,
    application_cars: string[]
}>()

const visible = defineModel<boolean>('visible')
const toast = useToast();
const emit = defineEmits(['deleteApplication'])

function accept() {
    visible.value = false;
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Заявление принято', life: 3000 });
    emit('deleteApplication')
}
function deny() {
    visible.value = false;
    toast.add({ severity: 'warn', summary: 'Успешно', detail: 'Заявление отклонено', life: 3000 });
    emit('deleteApplication')
}
</script>

<style lang="scss" scoped></style>