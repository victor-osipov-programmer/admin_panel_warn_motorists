<template>
    <div class="users">
        <DataView data-key="id" :value="user_model.users" paginator :rows="5">
            <template #header>
                <div class="text-grey my-3">
                    Пользователи
                </div>
            </template>

            <template #list="slotProps">
                <div class="py-5">
                    <list-user-panel @click="" v-for="user in slotProps.items" :key="user.id" :user />
                </div>
            </template>

            <template #empty>
                <div class="pl-4 py-5 text-grey">
                    Пользователи не найдены
                </div>
            </template>
        </DataView>
    </div>
</template>

<script lang="ts" setup>
import { ListUserPanel } from '@/features/user-panel';
import { useUserModel } from '@/entities/user';

const user_model = useUserModel()
user_model.fetchUsers()
</script>

<style lang="scss" scoped>
.cars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
</style>