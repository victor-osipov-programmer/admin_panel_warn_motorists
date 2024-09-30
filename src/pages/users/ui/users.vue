<template>
    <div class="users">
        <DataView data-key="id" :value="user_model.users" :rows="user_model.currentPageSize">
            <template #header>
                <list-header title="Пользователи">
                    <InputText class="input" v-model="user_model.search" placeholder="Поиск" />
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

        <user-profile v-model:visible="dialog" header="Пользователь" :user_cars :user />
    </div>
</template>

<script lang="ts" setup>
import { ListUserPanel } from '@/features/user-panel';
import { useUserModel } from '@/entities/user';
import type { ICarOwned } from '@/entities/user';
import { UserProfile } from '@/widgets/user-cars';
import { computed, ref } from 'vue';
import { ListHeader } from '@/shared/ui/list-header';
import { http } from '@/shared/api';

const user_model = useUserModel()
user_model.getUsers()

const user_id = ref<null | number>(null)
const user = computed(() => {
    return user_model.users.find(user => user.id === user_id.value)
})
const user_cars = ref<ICarOwned[]>([])
const dialog = ref(false)


async function openDialog(id: number) {
    user_cars.value = [];
    user_id.value = id;
    dialog.value = true;

    const params = new URLSearchParams()
    params.append('id', String(id))
    const { data } = await http.get<{cars: ICarOwned[] | null}>('/admin/user', { params })
    user_cars.value = data.cars ?? []
}
</script>

<style lang="scss" scoped>

</style>