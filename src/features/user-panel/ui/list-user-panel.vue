<template>
    <list-user :user>
        <Dialog v-model:visible="dialog_gift">
            <template #header>
                Подарить подписку
            </template>

            <div class="d-flex flex-column ga-3">
                <DatePicker dateFormat="dd.mm.yy" :min-date="minDate()" class="subscription-end" v-model="subscription_end"
                    placeholder="Дата окончания подписки" />
            </div>

            <template #footer>
                <Button @click="donateSubscription">Подарить</Button>
            </template>
        </Dialog>

        <app-button @click.stop="dialog_gift = true" size="min" icon="mdi-gift" tooltip="Подарить подписку">Подарить
            подписку</app-button>

        <app-button :to="{ name: 'personal-mailing', params: { id: user.id } }" @click.stop size="min" icon="mdi-email"
            tooltip="Персональное сообщение">Персональное сообщение</app-button>

        <app-button v-if="user.ban" @click.stop="unbanUser" size="min" color="green" icon="mdi-lock-open"
            tooltip="Разблокировать пользователя">Разблокировать</app-button>
        <app-button v-else @click.stop="dialog_ban = true" size="min" color="deep-orange-darken-4" icon="mdi-lock"
            tooltip="Блокировать пользователя">Блокировать</app-button>

        <Dialog v-model:visible="dialog_ban">
            <template #header>
                <div class="mr-3">
                    Блокировать пользователя
                </div>
            </template>

            <div class="d-flex flex-column ga-3">
                <DatePicker dateFormat="dd.mm.yy" :min-date="minDate()" class="subscription-end" v-model="ban_end"
                    placeholder="Дата окончания бана" />
                <!-- <InputNumber placeholder="На сколько часов" v-model="ban_end" fluid :disabled="is_permanent_ban" /> -->

                <!-- <label class="d-flex align-center ga-1">
                    <Checkbox v-model="is_permanent_ban" value="is_permanent_ban" :binary="true" />
                    Без ограничений
                </label> -->
            </div>

            <template #footer>
                <Button @click="banUser">Блокировать</Button>
            </template>
        </Dialog>
    </list-user>
</template>

<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
import { IUserApi, ListUser, useUserModel } from '@/entities/user';
import { AppButton } from '@/shared/ui/app-button';
import { ref } from "vue";
import { http } from "@/shared/api";
import { dateToString } from "@/shared/libs";


const user_model = useUserModel()
const subscription_end = ref<null | Date>(null)
const dialog_gift = ref(false)
const dialog_ban = ref(false)
const toast = useToast();
const ban_end = ref<null | Date>(null)
// const is_permanent_ban = ref(false)

const props = defineProps<{
    user: IUserApi
}>()


async function donateSubscription() {
    if (!subscription_end.value) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите дату окончания подписки', life: 3000 });
    }

    await http.post(`/admin/user/gift`, {
        'id': props.user.id,
        'gift': dateToString(new Date(subscription_end.value))
    })

    user_model.getUsers()
    dialog_gift.value = false;
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Подписка подарена', life: 3000 });
}
async function banUser() {
    if (ban_end.value) {
        const params = new URLSearchParams()
        params.append('id', String(props.user.id))
        params.append('date', dateToString(ban_end.value))

        // if (is_permanent_ban.value) {
        //     params.append('hours', '-1')
        // } else if (ban_end.value) {
        //     params.append('hours', ban_end.value.toString())
        // }
        await http.delete('/admin/ban', { params })

        user_model.getUsers()
        dialog_ban.value = false;
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Пользователь заблокирован', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите на сколько часов бан', life: 3000 });
    }
}
async function unbanUser() {
    // const params = new URLSearchParams()
    // params.append('id', String(props.user.id))

    await http.put(`/admin/ban`, {
        id: props.user.id
    })

    user_model.getUsers()
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Пользователь разблокирован', life: 3000 });
}

function minDate() {
    const date = new Date()
    date.setDate(date.getDate() + 1)

    return date;
}
</script>

<style lang="scss" scoped>
.subscription-end {
    min-width: 240px;
}
</style>