<template>
    <Dialog v-model:visible="visible" style="min-width: 350px;">
        <template #header>
            <div class="pl-4 text-grey mr-5">
                <v-chip color="green" label>
                    <v-icon icon="mdi-card-account-details-outline" start></v-icon>
                    {{ user?.id }}

                    <v-tooltip activator="parent" location="top">id пользователя</v-tooltip>
                </v-chip>
            </div>
        </template>

        <div class="user-info pl-4 mb-5 py-3">
            <div class="mb-5">
                <div>{{ user?.name }}</div>
                <div class="text-grey" v-if="user?.phone">{{ formatPhone(user?.phone) }}</div>
            </div>

            <div class="d-flex ga-5">
                <v-chip class="subscription-level" color="green" label>
                    <v-icon icon="mdi-chart-box" start></v-icon>
                    {{ user?.subscriptionLevel }}

                    <v-tooltip activator="parent" location="top">Уровень подписки</v-tooltip>
                </v-chip>

                <v-chip class="subscription-end" color="deep-orange-darken-1" label>
                    <v-icon icon="mdi-fire" start></v-icon>
                    <template v-if="user?.subscription_end">
                        {{ new Date(user?.subscription_end).toLocaleString() }}
                    </template>
                    <template v-else>
                        Подписки нет
                    </template>

                    <v-tooltip activator="parent" location="top">Подписка активна до</v-tooltip>
                </v-chip>
            </div>
        </div>


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
</style>