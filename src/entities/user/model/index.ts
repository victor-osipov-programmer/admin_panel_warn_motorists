import { defineStore } from 'pinia'
import { useDebouncedRefHistory, useOffsetPagination } from '@vueuse/core'
import { fetchUsers } from '../api'
import { computed, ref, watch } from 'vue'
import { IUserApi } from '../types'

export const useUserModel = defineStore('user', () => {
    const total_users = ref(0)
    const users = ref<IUserApi[]>([])
    const pagination = useOffsetPagination({
        total: total_users,
        page: 1,
        pageSize: 5,
        onPageChange: getUsers,
        onPageSizeChange: getUsers,
    })

    async function getUsers() {
        const response = await fetchUsers()
        users.value = response.users ?? [];
        total_users.value = response.found_users;
    }

    const offset = computed({
        get() {
            return pagination.currentPage.value * pagination.currentPageSize.value - pagination.currentPageSize.value
        },
        set(new_offset) {
            pagination.currentPage.value = new_offset / pagination.currentPageSize.value + 1
        }
    })

    const phone = ref('')
    const username = ref('')

    const online = ref<null | Date>(null)
    watch([phone, username], () => {
        online.value = new Date()
    })

    const { history } = useDebouncedRefHistory(online, { debounce: 1000 })
    watch(history, () => {
        getUsers()
    })

    return {
        users,
        offset,
        total_users,
        getUsers,
        phone,
        username,
        ...pagination
    }
})