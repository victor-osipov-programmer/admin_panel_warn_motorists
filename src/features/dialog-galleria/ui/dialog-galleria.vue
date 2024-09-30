<template>
    <Dialog v-model:visible="visible" modal :header>
        <Galleria :value="images" :numVisible="3">
            <template #item="{ item }">
                <slot name="item" :item>

                </slot>
            </template>

            <template #thumbnail="{ item }">
                <slot name="thumbnail" :item>

                </slot>
            </template>
        </Galleria>

        <slot name="content">

        </slot>
        

        <slot name="actions">

        </slot>
    </Dialog>
</template>

<script lang="ts" setup>
defineProps<{
    header: string,
    images: string[]
}>()

const visible = defineModel<boolean>('visible')
</script>

<style lang="scss" scoped>
.p-galleria  {
    margin-bottom: 1rem;
}
.img {
    object-fit: cover;
}

// без этого при закрытии Dialog съезжают маленькие картинки
:deep(.p-galleria-thumbnail-item) {
    flex: 1 0 33.333333333333336%;
}
</style>