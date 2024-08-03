<template>
    <div class="processing-applications">
        <Card class="card ma-5">
            <template #title>
                <div class="text-grey mb-3">
                    Заявки на обработку
                </div>
            </template>

            <template #subtitle>
                <div class="d-flex ga-3">
                    <Select v-model="application_model.age_applications" :options="application_model.age_options"
                        optionLabel="label" />
                    <Select v-model="application_model.status_applications" :options="application_model.status_options"
                        optionLabel="label" />
                </div>

            </template>

            <template #content>
                <DataView data-key="id" :value="application_model.applications"
                    :rows="application_model.currentPageSize">
                    <template #list="slotProps">
                        <div class="py-5">

                            <ListApplication @click="openDialog(application.id)" v-for="application in slotProps.items"
                                :key="application.id" :application />

                        </div>
                    </template>

                    <template #empty>
                        <div class="py-5 text-grey">
                            Заявок больше нет
                        </div>
                    </template>

                    <template #footer>
                        <Paginator v-model:rows="application_model.currentPageSize"
                            v-model:first="application_model.offset"
                            :totalRecords="application_model.total_applications" :rowsPerPageOptions="[5, 10, 15]">
                        </Paginator>
                    </template>
                </DataView>
            </template>
        </Card>

        <application-cars v-model:visible="dialog" header="Заявка" :application_cars @accept="acceptApplication"
            @deny="denyApplication" />
    </div>
</template>

<script lang="ts" setup>
import { useApplicationModel } from '@/entities/application';
import { computed, ref } from 'vue';
import { ListApplication } from '@/entities/application';
import { ApplicationCars } from '@/widgets/application-cars';
import { http } from '@/shared/api';
import { useToast } from 'primevue/usetoast';

const toast = useToast()

const application_model = useApplicationModel()
application_model.getApplications()

const application_id = ref<null | string>(null)
const application_cars = computed((): string[] => {
    const photo = application_model.applications.find((application) => application.id === application_id.value)?.photo
    return photo ? [photo] : []
})

const dialog = ref(false)

function openDialog(id: string) {
    application_id.value = id;
    dialog.value = true;
}

async function acceptApplication() {
    const params = new URLSearchParams()
    params.append('action', 'submit')
    const { status } = await http.get(`/admin/submit/${application_id.value}`, {params})

    if (status === 200) {
        dialog.value = false;
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Заявление принято', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Ошибка', detail: 'НЕ удалось выполнить запрос', life: 3000 });
    }

    application_model.getApplications()
}

async function denyApplication() {
    const params = new URLSearchParams()
    params.append('action', 'decline')
    const { status } = await http.get(`/admin/submit/${application_id.value}`, {params})

    if (status === 200) {
        dialog.value = false;
        toast.add({ severity: 'warn', summary: 'Успешно', detail: 'Заявление отклонено', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Ошибка', detail: 'НЕ удалось выполнить запрос', life: 3000 });
    }

    application_model.getApplications()
}
</script>

<style lang="scss" scoped></style>