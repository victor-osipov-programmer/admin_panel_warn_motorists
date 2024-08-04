<template>
    <div class="app-mailing pa-5">
        <Card class="card">
            <template #content>
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

                    <v-btn @click="emit('confirmMailing', title, message, file)" prepend-icon="mdi-check-circle">
                        <template v-slot:prepend>
                            <v-icon color="success"></v-icon>
                        </template>

                        <slot></slot>
                    </v-btn>
                </div>
            </template>

        </Card>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
    confirmMailing: [title: string, message: string, file: null | File]
}>()

const title = ref<string>('')
const message = ref<string>('')
const file = ref<null | File>(null)
</script>

<style lang="scss" scoped>
.app-mailing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
}

.card {
    width: 40vw;
}
</style>