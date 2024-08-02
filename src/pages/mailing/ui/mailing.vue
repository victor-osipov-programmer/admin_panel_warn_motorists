<template>
    <div class="mailing">
        <app-mailing confirm_message="Вы запустите рассылку <span class='text-green'>для всех пользователей</span>">
            Запустить
        </app-mailing>
    </div>
</template>

<script setup>
import { AppMailing } from '@/widgets/app-mailing';
</script>

<style lang="scss" scoped></style>