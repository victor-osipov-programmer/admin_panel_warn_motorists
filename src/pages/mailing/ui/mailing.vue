<template>
    <div class="mailing">
        <app-mailing>
            Запустить рассылку
            
            <template #confirmation-text>
                Вы запустите рассылку <span class="green">для всех пользователей</span>
            </template>
        </app-mailing>
    </div>
</template>

<script setup>
import { AppMailing } from '@/widgets/app-mailing';
</script>

<style lang="scss" scoped></style>