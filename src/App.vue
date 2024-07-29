<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
            <v-list-item nav>
                <template v-slot:append>
                    <v-btn :class="{flip: rail}" icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
                </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item :to="{name: 'users'}" prepend-icon="mdi-account-group-outline" title="Пользователи" value="users"></v-list-item>
                <v-list-item :to="{name: 'processing_applications'}" prepend-icon="mdi-check-all" title="Заявки на обработку"
                    value="applications"></v-list-item>
                <v-list-item :to="{name: 'mailing'}" prepend-icon="mdi-email" title="Рассылка" value=""></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <RouterView></RouterView>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true)
const rail = ref(true)
</script>


<style lang="scss" scoped>
.flip {
    scale: -1 1;
}
</style>
