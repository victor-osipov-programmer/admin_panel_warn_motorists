import { Users } from "@/pages/users"
import { ProcessingApplications } from "@/pages/processing-applications"
import { Mailing } from "@/pages/mailing"
import { Statistics } from "@/pages/statistics"

export const routes = [
    {
        path: '/',
        name: 'home',
        redirect: { name: 'statistics' }
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: Statistics
    },
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