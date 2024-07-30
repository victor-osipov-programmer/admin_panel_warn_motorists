<template>
    <div class="app-mailing pa-5">
        <v-textarea label="Текст" prepend-icon="mdi-comment" rows="4" auto-grow></v-textarea>

        <div class="ml-10 d-flex ga-3">
            <slot name="actions"></slot>

            <v-btn @click="confirmMailing" prepend-icon="mdi-check-circle">
                <template v-slot:prepend>
                    <v-icon color="success"></v-icon>
                </template>

                <slot></slot>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
    confirm_message: string,
    confirm_accept_text?: string
}>()
const confirm = useConfirm();
const toast = useToast();

function confirmMailing() {
    confirm.require({
        group: 'confirm_html',
        message: props.confirm_message,
        header: 'Уверены?',
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
            toast.add({ severity: 'info', summary: 'Успешно', detail: props.confirm_accept_text ?? 'Рассылка запущена', life: 3000 });
        }
    });
}
</script>

<style lang="scss" scoped></style>