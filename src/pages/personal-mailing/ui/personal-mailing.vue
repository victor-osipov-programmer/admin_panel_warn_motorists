<template>
    <div class="personal-mailing">
        <app-mailing confirm_message="Вы отправите <span class='text-green'>персональное</span> сообщение" confirm_accept_text="Сообщение отправлено">
            Отправить

            <template #actions>
                <v-btn @click="router.go(-1)">Назад</v-btn>
            </template>
        </app-mailing>
    </div>
</template>

<script setup>
import { AppMailing } from '@/widgets/app-mailing';
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<style lang="scss" scoped>

</style>