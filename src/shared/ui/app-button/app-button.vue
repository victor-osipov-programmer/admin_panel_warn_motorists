<template>
    <v-btn class="app-button">
        <template v-if="icon && size != 'min'" v-slot:prepend>
            <v-icon :icon></v-icon>
        </template>
        <v-icon :icon v-if="size == 'min'"></v-icon>

        <span class="app-button__text" v-if="size != 'min'">
            <slot></slot>
        </span>

        <v-tooltip v-if="tooltip" activator="parent" location="top">{{ tooltip }}</v-tooltip>
    </v-btn>
</template>

<script lang="ts" setup>
defineProps<{
    size?: 'min' | null,
    tooltip?: string,
    icon?: string
}>()
</script>

<style lang="scss" scoped>
.app-button {
    min-width: 0;
}
// :deep(.v-btn__prepend) {
//     margin: 0;
// }
</style>