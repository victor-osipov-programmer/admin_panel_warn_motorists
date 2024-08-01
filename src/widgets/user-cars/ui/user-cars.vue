<template>
    <dialog-galleria v-model:visible="visible" :header :images="user_cars">
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
                <v-btn color="green" @click="close">Закрыть</v-btn>
            </div>
        </template>
    </dialog-galleria>
</template>

<script lang="ts" setup>
import { DialogGalleria } from '@/features/dialog-galleria';

defineProps<{
    header: string,
    user_cars: any
}>()

const visible = defineModel<boolean>('visible')
const emit = defineEmits(['deleteApplication'])

function close() {
    visible.value = false;
}
</script>

<style lang="scss" scoped></style>