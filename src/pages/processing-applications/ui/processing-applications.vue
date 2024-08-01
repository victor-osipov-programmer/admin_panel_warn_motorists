<template>
    <div class="processing-applications">
        <Card class="card ma-5">
            <template #title>
                <div class="text-grey mb-3">
                    Заявки на обработку
                </div>
            </template>

            <template #subtitle>
                <Select v-model="sortByDate" :options="sortOptions" optionLabel="label" />
            </template>

            <template #content>
                <DataView data-key="id" :value="application_model.applications" paginator :rows="5"
                    :sortOrder="sortByDate.value" :sortField="'application_time'">
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
                </DataView>
            </template>
        </Card>

        <application-cars v-model:visible="dialog" header="Заявка" :application_cars @deleteApplication="deleteApplication" />
    </div>
</template>

<script lang="ts" setup>
import { useApplicationModel } from '@/entities/application';
import { computed, ref } from 'vue';
import { ListApplication } from '@/entities/application';
import { ApplicationCars } from '@/widgets/application-cars';

const application_model = useApplicationModel()
application_model.fetchApplications()

const sortByDate = ref({ label: 'Сночало старые', value: 1 })
const sortOptions = ref([
    { label: 'Сночало новые', value: -1 },
    { label: 'Сночало старые', value: 1 },
]);
const application_id = ref<null | string>(null)
const application_cars = computed(() => {
    // @ts-ignore
    return application_model.applications.find((application) => application.id === application_id.value)?.cars ?? []
})
const dialog = ref(false)


function openDialog(id: string) {
    application_id.value = id;
    dialog.value = true;
}
function deleteApplication() {
    application_model.applications = application_model.applications.filter(application => application.id !== application_id.value)
    application_id.value = null
}
</script>

<style lang="scss" scoped></style>