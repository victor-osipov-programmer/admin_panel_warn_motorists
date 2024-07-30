<template>
    <div class="personal-mailing">
        <app-mailing>
            Отправить

            <template #confirmation-text>
                Вы отправите <span class="green">персональное</span> сообщение
            </template>

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