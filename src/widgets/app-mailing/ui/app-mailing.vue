<template>
    <div class="app-mailing pa-5">
        <v-textarea ref="textarea" v-model="input" label="Текст расслыки" prepend-icon="mdi-comment"
            rows="1"></v-textarea>

        <v-btn prepend-icon="mdi-check-circle" class="ml-10">
            <template v-slot:prepend>
                <v-icon color="success"></v-icon>
            </template>

            <slot>Отправить всем пользователям</slot>
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { useTextareaAutosize } from '@vueuse/core';
import { onMounted, ref } from 'vue';

const textarea = ref(null)
const input = ref('')

onMounted(() => {
    useTextareaAutosize({
        // @ts-ignore
        element: textarea.value.$el.children[1].children[0].children[2].children["input-7"],
        input
    })
})
</script>

<style lang="scss" scoped>
:deep(#input-7) {
    resize: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
:deep(#input-7::-webkit-scrollbar) {
    display: none;
}
</style>