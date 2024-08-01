import { defineStore } from 'pinia'
import { useOffsetPagination } from '@vueuse/core'
import { fetchApplications } from '../api'
import { computed, ref } from 'vue'
import { IApplicationApi } from '../types'

export const useApplicationModel = defineStore('application', () => {
    const total_applications = ref(1)
    const applications = ref<IApplicationApi[]>([])
    const pagination = useOffsetPagination({
        total: total_applications.value,
        page: 1,
        pageSize: 5,
        onPageChange: fetchApplications,
        onPageSizeChange: fetchApplications,
    })

    async function getApplications() {
        const response = await fetchApplications()
        applications.value = response.applications;
        // total_applications.value = response.total;
    }

    const offset = computed({
        get() {
            return pagination.currentPage.value * pagination.currentPageSize.value - pagination.currentPageSize.value
        },
        set(new_offset) {
            pagination.currentPage.value = new_offset / pagination.currentPageSize.value + 1
        }
    })

    return {
        applications,
        offset,
        total_applications,
        getApplications,
        ...pagination
    }
})