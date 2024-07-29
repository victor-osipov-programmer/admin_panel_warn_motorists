<template>
    <div class="mailing pa-5">
        <v-textarea label="Текст расслыки" prepend-icon="mdi-comment" rows="1"></v-textarea>

        <v-btn prepend-icon="mdi-check-circle" class="ml-10">
            <template v-slot:prepend>
                <v-icon color="success"></v-icon>
            </template>

            Отправить

            <v-tooltip activator="parent">Отправить рассылку всем пользователям</v-tooltip>
        </v-btn>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>