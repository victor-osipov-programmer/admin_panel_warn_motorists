import { defineStore } from 'pinia'
import { useOffsetPagination } from '@vueuse/core'
import { fetchApplications } from '../api'
import { computed, ref, watch } from 'vue'
import { IApplicationApi } from '../types'

export const useApplicationModel = defineStore('application', () => {
    const total_applications = ref(0)
    const applications = ref<IApplicationApi[]>([])
    const pagination = useOffsetPagination({
        total: total_applications,
        page: 1,
        pageSize: 5,
        onPageChange: getApplications,
        onPageSizeChange: getApplications,
    })

    async function getApplications() {
        const response = await fetchApplications()
        applications.value = response.reqs;
        total_applications.value = response.total;
    }

    const offset = computed({
        get() {
            return pagination.currentPage.value * pagination.currentPageSize.value - pagination.currentPageSize.value
        },
        set(new_offset) {
            pagination.currentPage.value = new_offset / pagination.currentPageSize.value + 1
        }
    })

    const age_options = ref([
        { label: 'Сначала старые', value: 'old' },
        { label: 'Сначала новые', value: 'new' },
    ]);
    const status_options = ref([
        { label: 'В ожидании', value: 'wait' },
        { label: 'Отклоненные', value: 'rejected' },
        { label: 'Принятые', value: 'success' },
    ]);
    
    const age_applications = ref(age_options.value[1])
    const status_applications = ref(status_options.value[0])

    watch([age_applications, status_applications], () => {
        getApplications()
    })

    return {
        applications,
        offset,
        total_applications,
        getApplications,
        age_applications,
        status_applications,
        age_options,
        status_options,
        ...pagination
    }
})