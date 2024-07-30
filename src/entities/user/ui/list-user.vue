<template>
    <v-list-item :subtitle="user.telephone" :title="user.first_name">
        <template v-slot:prepend>
            {{ user.number_cars }}

            <v-avatar>
                <v-icon icon="mdi-car"></v-icon>
            </v-avatar>

            <v-tooltip activator="parent">Количество машин</v-tooltip>
        </template>

        <template v-slot:append>
            <div class="d-flex ga-3">
                <v-chip color="deep-orange-darken-1" label>
                    <v-icon icon="mdi-fire" start></v-icon>
                    {{ new Date(user.end_subscription).toLocaleString() }}

                    <v-tooltip activator="parent" location="top">Подписка активна до</v-tooltip>
                </v-chip>
 
                <v-dialog width="auto" v-model="dialog_gift">
                    <template #activator="{props}">
                        <app-button v-bind="props" @click.stop="dialog_gift = true" :size="window_width < 1000 ? 'min' : null" icon="mdi-gift" tooltip="Подарить подписку">Подарить подписку</app-button>
                    </template>

                    <v-card title="Уверены?">
                        <v-card-text>
                            Вы <span class="green">подарите</span> подписку выбранному пользователю
                        </v-card-text>
                        
                        <v-card-actions>
                            <v-btn @click="donateSubscription">Да</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                
                
                <app-button @click.stop :size="window_width < 1150 ? 'min' : null" icon="mdi-email" tooltip="Персональная рассылка">Персональная рассылка</app-button>
                <v-dialog width="auto" v-model="dialog_ban">
                    <template v-slot:activator="{props}">
                        <app-button v-bind="props" @click.stop="dialog_ban = true" :size="window_width < 1250 ? 'min' : null" color="deep-orange-darken-4" icon="mdi-lock" tooltip="Блокировать пользователя">Блокировать</app-button>
                    </template>

                    <v-card title="Уверены?">
                        <v-card-text>
                            Вы <span class="red">заблокируете</span> пользователя
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="red" @click="ban()">Да</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import { window_width } from '@/shared/libs';
import { IUser } from './types';
import { AppButton } from '@/shared/ui/app-button';
import { ref } from 'vue';

defineProps<{
    user: IUser
}>()

const dialog_ban = ref(false)
const dialog_gift = ref(false)
function ban() {
    dialog_ban.value = false;
}
function donateSubscription() {
    dialog_gift.value = false;
}
</script>

<style lang="scss" scoped>
</style>