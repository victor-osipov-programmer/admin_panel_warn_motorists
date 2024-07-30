<template>
    <div class="app-mailing pa-5">
        <v-textarea ref="textarea" v-model="input" label="Текст" prepend-icon="mdi-comment" rows="1"></v-textarea>

        <div class="ml-10 d-flex ga-3">
            <slot name="actions">

            </slot>

            <v-dialog width="auto" v-model="dialog_mailing">
                <template #activator="{ props }">
                    <v-btn v-bind="props" prepend-icon="mdi-check-circle">
                        <template v-slot:prepend>
                            <v-icon color="success"></v-icon>
                        </template>

                        <slot></slot>
                    </v-btn>
                </template>

                <v-card title="Уверены?">
                    <v-card-text>
                        <slot name="confirmation-text">

                        </slot>

                    </v-card-text>

                    <v-card-actions>
                        <v-btn @click="startMailing">Да</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>



    </div>
</template>

<script lang="ts" setup>
import { useTextareaAutosize } from '@vueuse/core';
import { onMounted, ref } from 'vue';

const dialog_mailing = ref(false)
const textarea = ref(null)
const input = ref('')

function startMailing() {
    dialog_mailing.value = false;
}

onMounted(() => {
    useTextareaAutosize({
        // @ts-ignore
        element: textarea.value.$el.children[1].children[0].children[2].children[2],
        input
    })
})
</script>

<style lang="scss" scoped>
:deep(.v-field__input) {
    resize: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

:deep(.v-field__input::-webkit-scrollbar) {
    display: none;
}
</style>