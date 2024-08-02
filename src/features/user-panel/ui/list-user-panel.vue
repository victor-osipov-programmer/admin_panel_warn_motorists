<template>
    <list-user :user>
        <app-button @click.stop="confirmGift" size="min" icon="mdi-gift"
            tooltip="Подарить подписку">Подарить подписку</app-button>

        <!-- <app-button :to="{ name: 'personal-mailing', params: { id: user.id } }" @click.stop
            size="min" icon="mdi-email" tooltip="Персональная рассылка">Персональная
            рассылка</app-button> -->

        <app-button @click.stop="confirmBan" size="min" color="deep-orange-darken-4"
            icon="mdi-lock" tooltip="Блокировать пользователя">Блокировать</app-button>
    </list-user>
</template>

<script lang="ts" setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { IUserApi, ListUser } from '@/entities/user';
import { AppButton } from '@/shared/ui/app-button';

const confirm = useConfirm();
const toast = useToast();

defineProps<{
    user: IUserApi
}>()

function confirmBan() {
    confirm.require({
        group: 'confirm_html',
        message: '<div>Вы <span class="text-red">заблокируете</span> пользователя</div>',
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
            toast.add({ severity: 'warn', summary: 'Успешно', detail: 'Пользователь заблокирован', life: 3000 });
        }
    });
}
function confirmGift() {
    confirm.require({
        group: 'confirm_html',
        message: 'Вы <span class="text-green">подарите</span> подписку выбранному пользователю',
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
            toast.add({ severity: 'success', summary: 'Успешно', detail: 'Вы подарили подписку', life: 3000 });
        }
    });
}
</script>

<style lang="scss" scoped></style>