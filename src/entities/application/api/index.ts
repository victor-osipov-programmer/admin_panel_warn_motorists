import { http } from '@/shared/api'
import type { IApplicationApi } from '../types'
import { useApplicationModel } from '../model';

export async function fetchApplications(): Promise<{ total: number, reqs: IApplicationApi[] }> {
    const application_model = useApplicationModel();
    const params = new URLSearchParams();
    
    params.append('limit', application_model.currentPageSize.toString())
    params.append('offset', (application_model.currentPage * application_model.currentPageSize - application_model.currentPageSize).toString())
    params.append('age', application_model.age_applications.value)
    params.append('status', application_model.status_applications.value)

    const data = (await http.get('/admin/requests', { params })).data
    const requests = data.requests
    delete data.requests;
    data.applications = requests;
    
    return data;
}
