<template>
    <Dialog v-model:visible="visible" style="min-width: 350px;">
        <template #header>
            <div class="pl-4 text-grey">
                {{ header }}
            </div>
        </template>

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