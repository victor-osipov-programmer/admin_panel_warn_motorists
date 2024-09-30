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

        <template #content>
            <div class="content">
                <div class="car">
                    {{ application?.car_brand + ' ' + application?.car_num }}
                </div>
                
                <div v-if="application?.cause">
                    Причина отклонения: {{ application.cause }}
                </div>

                <div v-if="application?.created_at">
                    {{ new Date(application.created_at).toLocaleDateString() }}

                </div>
            </div>
        </template>

        <template #actions>
            <div class="d-flex ga-3 mt-5">
                <v-spacer></v-spacer>
                <v-btn color="red" @click="emit('deny')">Отклонить</v-btn>
                <v-btn color="green" @click="emit('accept')">Принять</v-btn>
            </div>
        </template>
    </dialog-galleria>
</template>

<script lang="ts" setup>
import { IApplicationApi } from '@/entities/application';
import { DialogGalleria } from '@/features/dialog-galleria';

defineProps<{
    header: string,
    application_cars: string[],
    application: IApplicationApi | undefined
}>()

const visible = defineModel<boolean>('visible')
const emit = defineEmits(['accept', 'deny'])
</script>

<style lang="scss" scoped>
.img {
    object-fit: cover;
}
.content {
    color: grey;
}
.car {
    // margin-top: 1rem;
    font-size: 2rem;
}
</style>