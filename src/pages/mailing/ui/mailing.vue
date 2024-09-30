<template>
    <div class="mailing">
        <app-mailing @confirm-mailing="confirmMailing">
            Запустить
        </app-mailing>
    </div>
</template>

<script setup>
import { http } from '@/shared/api';
import { AppMailing } from '@/widgets/app-mailing';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const confirm = useConfirm();
const toast = useToast();

function confirmMailing(title, message, file) {
    if (!title) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите заголовок', life: 3000 });
    }
    if (!message) {
        return toast.add({ severity: 'error', summary: 'Обязательное поле', detail: 'Укажите сообщение', life: 3000 });
    }

    confirm.require({
        group: 'confirm_html',
        message: "Вы запустите рассылку <span class='text-green'>для всех пользователей</span>",
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

            if (file) {
                let form_data = new FormData()
                form_data.append('file', file)

                const { status, data: file_data } = await http.post('/files/upload', form_data, { headers: { "Content-Type": "multipart/form-data" } })

                if (status === 200) {
                    file_url = file_data;
                } else {
                    return toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить изображение', life: 3000 });
                }
            }

            const { status, data } = await http.post('/admin/push', {
                "title": title,
                "text": message,
            }) 

            if (status === 200 || status == 201) {
                return toast.add({ severity: 'success', summary: 'Успешно', detail: 'Рассылка запущена', life: 3000 });
            } else {
                return toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Рассылка не удалась', life: 3000 });
            }

        }
    });
}
</script>

<style lang="scss" scoped></style>