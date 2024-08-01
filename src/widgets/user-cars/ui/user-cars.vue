<template>
    <Dialog :header v-model:visible="visible" style="min-width: 350px;">
        <DataTable :value="user_cars">
            <Column field="brand" header="Бренд"></Column>
            <Column field="number" header="Номер машины"></Column>

            <template #empty>
                <div class="text-grey ">
                    У этого пользователя нет машин
                </div>
            </template>
        </DataTable>
    </Dialog>
</template>

<script lang="ts" setup>
import { ICarOwned } from '@/entities/user';

defineProps<{
    header: string,
    user_cars: ICarOwned[]
}>()

const visible = defineModel<boolean>('visible')
</script>

<style lang="scss" scoped></style>