import { defineStore } from 'pinia'
import { ApplicationApi } from '../index'
import type { IApplicationApi } from '../index'

export const useApplicationModel = defineStore('application', {
    state: (): {
        applications: IApplicationApi[]
    } => ({
        applications: []
    }),
    actions: {
        async fetchApplications() {
            this.applications = await ApplicationApi.fetchApplications()
        }
    }
})