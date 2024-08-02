import { defineStore } from 'pinia'
import { useOffsetPagination } from '@vueuse/core'
import { fetchUsers } from '../api'
import { computed, ref } from 'vue'
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
        users.value = response.users;
        total_users.value = response.users_total;
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
        users,
        offset,
        total_users,
        getUsers,
        ...pagination
    }
})