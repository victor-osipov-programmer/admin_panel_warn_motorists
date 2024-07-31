<template>
    <div class="login">
        <div class="content flex flex-col px-8 py-8 gap-6 rounded-2xl"
            style="background-image: radial-gradient(circle at left top, #37474F, #263238)">
            
            <div class="d-flex justify-center">

                <img class="app-icon mb-5" src="/icons/app-icon.png" alt="app-icon">
            </div>

            <div class="inline-flex flex-col gap-2 mb-1">
                <label for="username" class="text-primary-50 font-semibold">Username</label>
                <InputText v-model="username" id="username" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" name="username"></InputText>
            </div>

            <div class="inline-flex flex-col gap-2 mb-5">
                <label for="password" class="text-primary-50 font-semibold">Password</label>
                <InputText v-model="password" id="password" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" type="password" name="password">
                </InputText>
            </div>

            <Button label="Войти" @click="login" text></Button>
            <div class="d-flex justify-center">
            </div>
        </div>
    </div>
</template>

<script setup>
import { fetchLogin } from '@/shared/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const username = ref('')
const password = ref('')

async function login() {
    await fetchLogin(username.value, password.value)
    router.push({name: 'statistics'});
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
}
.content {
    max-width: 300px;
    border-radius: 10px;
}
.app-icon {
    height: 50px;
}
</style>