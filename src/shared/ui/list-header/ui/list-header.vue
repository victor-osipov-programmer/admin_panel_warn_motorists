<template>
    <div class="d-flex align-center justify-space-between my-3">
        <h2 class="text-grey">
            {{ title }}
        </h2>

        <div class="d-flex align-center ga-3">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    title: string
}>()
</script>

<style lang="scss" scoped></style>