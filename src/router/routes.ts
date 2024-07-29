import { Users } from "@/widgets/users"
import { ProcessingApplications } from "@/widgets/processing-applications"
import { Mailing } from "@/widgets/mailing"

export const routes = [
    {
        path: '/users',
        name: 'users',
        component: Users
    },
    {
        path: '/processing_applications',
        name: 'processing_applications',
        component: ProcessingApplications
    },
    {
        path: '/mailing',
        name: 'mailing',
        component: Mailing
    },
]