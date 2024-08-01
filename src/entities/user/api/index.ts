import { http } from '@/shared/api'
import type { IUserApi } from '../types'
import { useUserModel } from '../model';

export async function fetchUsers(): Promise<{ total: number, users: IUserApi[] }> {
    const user_model = useUserModel();
    const params = new URLSearchParams();
    
    params.append('limit', user_model.currentPageSize.toString())
    params.append('offset', (user_model.currentPage * user_model.currentPageSize - user_model.currentPageSize).toString())

    return (await http.get('/admin/users', { params })).data
}
