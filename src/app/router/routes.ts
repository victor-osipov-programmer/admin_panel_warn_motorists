import { Users } from "@/pages/users"
import { ProcessingApplications } from "@/pages/processing-applications"
import { Mailing } from "@/pages/mailing"
import { Statistics } from "@/pages/statistics"
import { PersonalMailing } from "@/pages/personal-mailing"
import { Login } from "@/pages/login"

export const routes = [
    {
        path: '/',
        name: 'home',
        redirect: { name: 'login' }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
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
        path: '/mailing/:id',
        name: 'personal-mailing',
        component: PersonalMailing
    },
    {
        path: '/mailing',
        name: 'mailing',
        component: Mailing
    },
]