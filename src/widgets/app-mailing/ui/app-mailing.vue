<template>
    <div class="app-mailing pa-5">
        <div class="pl-10 py-5">
            <FloatLabel>
                <InputText id="title" v-model="title" />
                <label for="title">Заголовок</label>
            </FloatLabel>
        </div>

        <v-file-input v-model="file" accept="image/*" class="file" label="Фото"></v-file-input>

        <v-textarea class="message mb-3" v-model="message" label="Сообщение" prepend-icon="mdi-comment" rows="4"
            auto-grow></v-textarea>

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
import { http } from '@/shared/api';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const props = defineProps<{
    confirm_message: string,
    confirm_accept_text?: string
}>()
const confirm = useConfirm();
const toast = useToast();

const title = ref('')
const message = ref('')
const file = ref(null)


function confirmMailing() {
    if (!title.value) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите заголовок', life: 3000 });
    }
    if (!message.value) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите сообщение', life: 3000 });
    }

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
        accept: async () => {
            let file_url = ''

            if (file.value) {
                let form_data = new FormData()
                form_data.append('file', file.value)

                const { status, data: file_data } = await http.post('/files/upload', form_data, { headers: { "Content-Type": "multipart/form-data" } })

                if (status === 200) {
                    file_url = file_data;
                    console.log('file_data', file_data)
                    console.log('file_url', file_url)
                } else {
                    return toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить изображение', life: 3000 });
                }
            }

            const { status, data } = await http.post('/admin/push', {
                "image": file_url,
                "message": message.value,
                "title": title.value
            })

            console.log('/admin/push status', status)
            console.log('/admin/push data', data)

            if (status === 200 || status == 201) {
                return toast.add({ severity: 'success', summary: 'Успешно', detail: props.confirm_accept_text ?? 'Рассылка запущена', life: 3000 });
            } else {
                return toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Рассылка не удалась', life: 3000 });
            }

        }
    });
}
</script>

<style lang="scss" scoped>
.message,
.file {
    max-width: 600px
}
</style>