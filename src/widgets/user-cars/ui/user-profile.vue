<template>
    <Dialog v-model:visible="visible" style="min-width: 350px;">
        <template #header>
            <div class="d-flex align-center pl-4 text-grey mr-10">
                <Avatar v-if="user?.img" :image="user.img" class="mr-3 user-avatar" size="normal"
                    shape="circle" />
                <Avatar v-else icon="pi pi-user" class="mr-3" size="normal" shape="circle" />

                <v-chip color="green" label>
                    <v-icon icon="mdi-card-account-details-outline" start></v-icon>
                    {{ user?.id }}

                    <v-tooltip activator="parent" location="top">id пользователя</v-tooltip>
                </v-chip>

                <v-chip class="ml-4" v-if="user?.created_at" color="orange" label>
                    <v-icon icon="mdi-calendar" start></v-icon>
                    {{ new Date(user?.created_at).toLocaleDateString() }}

                    <v-tooltip activator="parent" location="top">Дата регистрации</v-tooltip>
                </v-chip>
            </div>
        </template>

        <div class="user-info pl-4 mb-10 pt-3">
            <div class="mb-5">
                <div class="user-name">{{ user?.name }}</div>
                <div class="user-phone text-grey" v-if="user?.phone">{{ formatPhone(user?.phone) }}</div>
            </div>

            <v-chip class="subscription-end mr-2" color="green" label>
                <v-icon icon="mdi-fire" start></v-icon>
                <template v-if="user?.subscription">
                    {{ new Date(user?.subscription).toLocaleDateString() }}
                </template>
                <template v-else>
                    Подписки нет
                </template>

                <v-tooltip activator="parent" location="top">Подписка активна до</v-tooltip>
            </v-chip>

            <!-- <v-chip v-if="user?.ban" class="user-status-lock" color="red" label>
                <v-icon icon="mdi-lock"></v-icon>

                <v-tooltip activator="parent" location="top">Пользователь заблокирован</v-tooltip>
                
            </v-chip> -->
            <v-chip class="ml-2" v-if="user?.ban" color="green" label>
                <v-icon icon="mdi-lock-open" start></v-icon>
                {{ new Date(user?.ban).toLocaleDateString() }}

                <v-tooltip activator="parent" location="top">Окончание бана</v-tooltip>
            </v-chip>
        </div>


        <DataTable :value="user_cars">
            <Column field="brand" header="Бренд"></Column>
            <Column field="num" header="Номер машины"></Column>

            <template #empty>
                <div class="text-grey ">
                    У этого пользователя нет машин
                </div>
            </template>
        </DataTable>
    </Dialog>
</template>

<script lang="ts" setup>
import { ICarOwned, IUserApi } from '@/entities/user';
import { formatPhone } from '@/shared/libs';

defineProps<{
    header: string,
    user_cars: ICarOwned[],
    user: IUserApi | undefined
}>()

const visible = defineModel<boolean>('visible')
</script>

<style lang="scss" scoped>
.subscription-level {
    flex-grow: 1;
}

.subscription-end {
    flex-grow: 2;
}

.user-name {
    font-size: 1.5rem;
}

.user-phone {
    font-size: 1.25rem;
}
</style>