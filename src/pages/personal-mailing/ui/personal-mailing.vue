<template>
    <div class="personal-mailing">
        <app-mailing @confirm-mailing="confirmMailing">
            Отправить

            <template #actions>
                <v-btn @click="router.go(-1)">Назад</v-btn>
            </template>
        </app-mailing>
    </div>
</template>

<script lang="ts" setup>
import { http } from '@/shared/api';
import { AppMailing } from '@/widgets/app-mailing';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter()
const confirm = useConfirm();
const toast = useToast();

function confirmMailing(title: string, message: string, file: File | null) {
    if (!title) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите заголовок', life: 3000 });
    }
    if (!message) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите сообщение', life: 3000 });
    }

    confirm.require({
        group: 'confirm_html',
        message: "Вы отправите <span class='text-green'>персональное</span> сообщение",
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
            return;
            let file_url = ''

            if (file) {
                let form_data = new FormData()
                form_data.append('file', file)

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
                "message": message,
                "title": title
            })

            console.log('/admin/push status', status)
            console.log('/admin/push data', data)

            if (status === 200 || status == 201) {
                return toast.add({ severity: 'success', summary: 'Успешно', detail: 'Сообщение отправлено', life: 3000 });
            } else {
                return toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Рассылка не удалась', life: 3000 });
            }

        }
    });
}
</script>

<style lang="scss" scoped>

</style>