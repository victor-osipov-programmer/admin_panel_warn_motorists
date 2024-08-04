<template>
    <div class="users">
        <DataView data-key="id" :value="user_model.users" :rows="user_model.currentPageSize">
            <template #header>
                <list-header title="Пользователи">
                    <InputText class="input" v-model="user_model.phone" placeholder="Номер" />
                    <InputText class="input" v-model="user_model.username" placeholder="Имя" />
                </list-header>
            </template>

            <template #list="slotProps">
                <div class="py-5 d-flex flex-column ga-1">

                    <list-user-panel @click="openDialog(user.id)" v-for="user in slotProps.items" :key="user.id"
                        :user />

                </div>
            </template>

            <template #empty>
                <div class="pl-4 py-5 text-grey">
                    Пользователи не найдены
                </div>
            </template>

            <template #footer>
                <Paginator v-model:rows="user_model.currentPageSize" v-model:first="user_model.offset"
                    :totalRecords="user_model.total_users" :rowsPerPageOptions="[5, 10, 15]"></Paginator>
            </template>
        </DataView>

        <user-cars v-model:visible="dialog" header="Пользователь" :user_cars :user />
    </div>
</template>

<script lang="ts" setup>
import { ListUserPanel } from '@/features/user-panel';
import { useUserModel } from '@/entities/user';
import type { ICarOwned } from '@/entities/user';
import { UserCars } from '@/widgets/user-cars';
import { computed, ref } from 'vue';
import { ListHeader } from '@/shared/ui/list-header';

const user_model = useUserModel()
user_model.getUsers()

const user_id = ref<null | string>(null)
const user = computed(() => {
    return user_model.users.find(user => user.id === user_id.value)
})
const user_cars = computed((): ICarOwned[] => {
    const cars_owned = user.value?.cars_owned;
    return cars_owned ? cars_owned : []
})
const dialog = ref(false)


function openDialog(id: string) {
    user_id.value = id;
    dialog.value = true;
}
</script>

<style lang="scss" scoped>

</style>