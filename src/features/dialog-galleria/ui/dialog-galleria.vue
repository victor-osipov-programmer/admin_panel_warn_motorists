<template>
    <Dialog v-model:visible="visible" modal :header>
        <Galleria :value="application_cars" :numVisible="3">
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
</template>

<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';

defineProps<{
    header: string,
    application_cars: any
}>()
const emit = defineEmits(['deleteApplication'])

const toast = useToast();
const visible = defineModel<boolean>('visible')

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

<style lang="scss" scoped>
.img {
    object-fit: cover;
}

// без этого при закрытии Dialog съезжают маленькие картинки
:deep(.p-galleria-thumbnail-item) {
    flex: 1 0 33.333333333333336%;
}
</style>