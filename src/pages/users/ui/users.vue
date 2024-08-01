<template>
    <div class="users">
        <DataView data-key="id" :value="user_model.users" :rows="user_model.currentPageSize">
            <template #header>
                <div class="text-grey my-3">
                    Пользователи
                </div>
            </template>

            <template #list="slotProps">
                <div class="py-5">
                    <list-user-panel @click="openDialog" v-for="user in slotProps.items" :key="user.id" :user />
                </div>
            </template>

            <template #empty>
                <div class="pl-4 py-5 text-grey">
                    Пользователи не найдены
                </div>
            </template>

            <template #footer>
                <Paginator v-model:first="user_model.offset" :rows="user_model.currentPageSize"
                    :totalRecords="user_model.total_users"></Paginator>
            </template>
        </DataView>

        <user-cars v-model:visible="dialog" header="Машины пользователя" :user_cars />
    </div>
</template>

<script lang="ts" setup>
import { ListUserPanel } from '@/features/user-panel';
import { useUserModel } from '@/entities/user';
import { UserCars } from '@/widgets/user-cars';
import { ref } from 'vue';

const user_model = useUserModel()
user_model.getUsers()

const user_cars = ref([])
const dialog = ref(false)

function openDialog() {
    dialog.value = true;
}
</script>

<style lang="scss" scoped></style>