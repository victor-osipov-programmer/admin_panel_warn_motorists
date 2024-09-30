<template>
    <div class="processing-applications">
        <DataView data-key="id" :value="application_model.applications" :rows="application_model.currentPageSize">
            <template #header>
                <list-header title="Заявки на обработку">
                    <Select v-model="application_model.age_applications" :options="application_model.age_options"
                        optionLabel="label" />
                    <Select v-model="application_model.status_applications" :options="application_model.status_options"
                        optionLabel="label" />
                </list-header>
            </template>

            <template #list="slotProps">
                <div class="py-5 d-flex flex-column ga-2">

                    <ListApplication @click="openDialog(application.id)" v-for="application in slotProps.items"
                        :key="application.id" :application />

                </div>
            </template>

            <template #empty>
                <div class="pl-4 py-5 text-grey">
                    Заявок больше нет
                </div>
            </template>

            <template #footer>
                <Paginator v-model:rows="application_model.currentPageSize" v-model:first="application_model.offset"
                    :totalRecords="application_model.total_applications" :rowsPerPageOptions="[5, 10, 15]">
                </Paginator>
            </template>
        </DataView>

        <application-cars v-model:visible="dialog" header="Заявка" :application_cars :application @accept="acceptApplication"
            @deny="dialog_deny = true" />


        <Dialog v-model:visible="dialog_deny">
            <template #header>
                <div class="mr-3">
                    Причина отклонения
                </div>
            </template>

            <div class="d-flex flex-column ga-3">
                <v-textarea class="message mb-3" v-model="cause" label="Сообщение" prepend-icon="mdi-comment" rows="2"
                    auto-grow></v-textarea>
            </div>

            <template #footer>
                <Button @click="denyApplication">Отклонить</Button>
            </template>
        </Dialog>
    </div>
</template>

<script lang="ts" setup>
import { IApplicationApi, useApplicationModel } from '@/entities/application';
import { computed, ref } from 'vue';
import { ListApplication } from '@/entities/application';
import { ApplicationCars } from '@/widgets/application-cars';
import { http } from '@/shared/api';
import { useToast } from 'primevue/usetoast';
import { ListHeader } from '@/shared/ui/list-header';

const toast = useToast()

const application_model = useApplicationModel()
application_model.getApplications()

const application_id = ref<null | number>(null)
const application = computed((): IApplicationApi | undefined => {
    return application_model.applications?.find((application) => application.id == application_id.value);
})
const application_cars = computed((): string[] => {
    const application = application_model.applications?.find((application) => application.id == application_id.value);
    return application?.photo ? [application.photo] : []
})

const dialog = ref(false)
const dialog_deny = ref(false)
const cause = ref('')

function openDialog(id: number) {
    application_id.value = id;
    dialog.value = true;
}

async function acceptApplication() {
    // const params = new URLSearchParams()
    // params.append('action', 'submit')
    // const { status } = await http.get(`/admin/submit/${application_id.value}`, { params })
    const { status } = await http.put(`/admin/request`, {
        id: application_id.value,
        aprove: true,
        cause: ''
    })

    if (status === 200) {
        dialog.value = false;
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Заявление принято', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Ошибка', detail: 'НЕ удалось выполнить запрос', life: 3000 });
    }

    application_model.getApplications()
}

async function denyApplication() {
    dialog_deny.value = false;
    // const params = new URLSearchParams()
    // params.append('action', 'decline')
    // const { status } = await http.get(`/admin/submit/${application_id.value}`, { params })
    const { status } = await http.put(`/admin/request`, {
        id: application_id.value,
        aprove: false,
        cause: cause.value
    })

    if (status === 200) {
        dialog.value = false;
        toast.add({ severity: 'warn', summary: 'Успешно', detail: 'Заявление отклонено', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Ошибка', detail: 'НЕ удалось выполнить запрос', life: 3000 });
    }

    application_model.getApplications()
}
</script>

<style lang="scss" scoped>
</style>