import { http } from '@/shared/api'
import type { IUserApi } from '../types'

export async function fetchUsers(): Promise<IUserApi[]> {
    return (await http.get('/admin/users')).data.users
}
