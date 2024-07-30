<template>
    <v-list-item :subtitle="user.telephone" :title="user.first_name">
        <template v-slot:prepend>
            {{ user.number_cars }}

            <v-avatar>
                <v-icon icon="mdi-car"></v-icon>
            </v-avatar>

            <v-tooltip activator="parent">Количество машин</v-tooltip>
        </template>

        <template v-slot:append>
            <div class="d-flex ga-3">
                <v-chip color="deep-orange-darken-1" label>
                    <v-icon icon="mdi-fire" start></v-icon>
                    {{ new Date(user.end_subscription).toLocaleString() }}

                    <v-tooltip activator="parent" location="top">Подписка активна до</v-tooltip>
                </v-chip>

                <app-button @click.stop="confirmGift"
                    :size="window_width < 1000 ? 'min' : null" icon="mdi-gift"
                    tooltip="Подарить подписку">Подарить подписку</app-button>

                <app-button :to="{ name: 'personal-mailing', params: { id: user.id } }" @click.stop=""
                    :size="window_width < 1150 ? 'min' : null" icon="mdi-email"
                    tooltip="Персональная рассылка">Персональная
                    рассылка</app-button>

                <app-button @click.stop="confirmBan" :size="window_width < 1250 ? 'min' : null"
                    color="deep-orange-darken-4" icon="mdi-lock"
                    tooltip="Блокировать пользователя">Блокировать</app-button>
            </div>

        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import { window_width } from '@/shared/libs';
import { IUser } from './types';
import { AppButton } from '@/shared/ui/app-button';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

defineProps<{
    user: IUser
}>()

function confirmBan() {
    confirm.require({
        group: 'confirm_html',
        message: '<div>Вы <span class="red">заблокируете</span> пользователя</div>',
        header: 'Заблокировать?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Нет',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Да'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Успешно', detail: 'Пользователь заблокирован', life: 3000 });
        }
    });
}
function confirmGift() {
    confirm.require({
        group: 'confirm_html',
        message: 'Вы <span class="green">подарите</span> подписку выбранному пользователю',
        header: 'Подарить подписку?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Нет',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Да'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Успешно', detail: 'Вы подарили подписку', life: 3000 });
        }
    });
}
</script>

<style lang="scss" scoped></style>