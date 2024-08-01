import { http } from '@/shared/api'
import type { IApplicationApi } from '../types'

export async function fetchApplications(): Promise<IApplicationApi[]> {
    return (await http.get('/admin/requests')).data.requests
}
