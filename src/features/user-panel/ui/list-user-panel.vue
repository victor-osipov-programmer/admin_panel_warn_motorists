<template>
    <list-user :user>
        <Dialog v-model:visible="dialog_gift">
            <template #header>
                Подарить подписку
            </template>

            <div class="d-flex flex-column ga-3">
                <DatePicker :min-date="new Date()" class="subscription-end" v-model="subscription_end"
                    placeholder="Дата окончания подписки" />
                <Select v-model="subscription_level" placeholder="Уровень подписки" :options="subscription_levels"
                    option-label="value" />
            </div>

            <template #footer>
                <Button @click="donateSubscription">Подарить</Button>
            </template>
        </Dialog>

        <app-button @click.stop="dialog_gift = true" size="min" icon="mdi-gift" tooltip="Подарить подписку">Подарить
            подписку</app-button>

        <app-button :to="{ name: 'personal-mailing', params: { id: user.id } }" @click.stop size="min" icon="mdi-email"
            tooltip="Персональное сообщение">Персональное сообщение</app-button>

        <app-button @click.stop="dialog_ban = true" size="min" color="deep-orange-darken-4" icon="mdi-lock"
            tooltip="Блокировать пользователя">Блокировать</app-button>

        <Dialog v-model:visible="dialog_ban">
            <template #header>
                <div class="mr-3">
                    Блокировать пользователя
                </div>
            </template>

            <div class="d-flex flex-column ga-3">
                <InputNumber placeholder="На сколько часов" v-model="ban_hours" fluid />
            </div>

            <template #footer>
                <Button @click="banUser">Блокировать</Button>
            </template>
        </Dialog>
    </list-user>
</template>

<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
import { IUserApi, ListUser } from '@/entities/user';
import { AppButton } from '@/shared/ui/app-button';
import { ref } from "vue";
import { http } from "@/shared/api";
import { dateToString } from "@/shared/libs";

const subscription_end = ref<null | Date>(null)
const subscription_level = ref<null | { value: string }>(null)
const subscription_levels = ref([
    { value: '0' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
])
const dialog_gift = ref(false)
const dialog_ban = ref(false)
const toast = useToast();
const ban_hours = ref<null | number>(null)

const props = defineProps<{
    user: IUserApi
}>()

async function donateSubscription() {
    if (!subscription_end.value) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите дату окончания подписки', life: 3000 });
    }
    if (!subscription_level.value) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите уровень подписки', life: 3000 });
    }

    const params = new URLSearchParams()
    const date = subscription_end.value;
    params.append('end_date', dateToString(date))

    await http.put(`/admin/gift/${props.user.id}`, {
        "subscriptionLevel": subscription_level.value.value
    }, { params })

    dialog_gift.value = false;
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Подписка подарена', life: 3000 });
}
async function banUser() {
    if (!ban_hours.value) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите на сколько часов бан', life: 3000 });
    }

    const params = new URLSearchParams()
    params.append('hours', ban_hours.value.toString())
    await http.get('/admin/ban/' + props.user.id, { params })

    dialog_ban.value = false;
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Пользователь заблокирован', life: 3000 });
}
</script>

<style lang="scss" scoped>
.subscription-end {
    min-width: 240px;
}
</style>