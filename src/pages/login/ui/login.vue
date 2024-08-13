<template>
    <div class="login">
        <div class="content flex flex-col px-8 py-8 gap-6 rounded-2xl"
            style="background-image: radial-gradient(circle at left top, #37474F, #263238)">
            
            <div class="d-flex justify-center mb-5">
                <img class="app-icon" src="/icons/app-icon.png" alt="app-icon">
            </div>

            <div class="mb-2">
                <label for="email" class="login__label">Почта</label>
                <InputText v-model="email" id="email" fluid/>
            </div>

            <div class="mb-2">
                <label class="login__label">Пароль</label>
                <Password v-model="password" id="password" type="password" :feedback="false" toggleMask fluid/>
            </div>

            <div class="mb-8">
                <label class="login__label">Код</label>
                <InputOtp v-model="code" :length="6" integerOnly />
            </div>
            
            <div class="d-flex justify-end">
                <Button label="Войти" @click="login" ></Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { fetchLogin } from '@/shared/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const email = ref('')
const password = ref('')
const code = ref('')

async function login() {
    await fetchLogin(email.value, password.value, code.value)
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
    max-width: 500px;
    border-radius: 10px;
}
.app-icon {
    height: 50px;
}
.input-password :deep(.p-password-input) {
    padding-right: 12px !important;
}
.login__label {
    display: block;
    margin-bottom: 0.25rem;
}
</style>