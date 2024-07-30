<template>
    <div class="app-mailing pa-5">
        <v-textarea label="Текст" prepend-icon="mdi-comment" rows="4" auto-grow></v-textarea>

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
import { ref } from 'vue';

const dialog_mailing = ref(false)

function startMailing() {
    dialog_mailing.value = false;
}
</script>

<style lang="scss" scoped>
</style>