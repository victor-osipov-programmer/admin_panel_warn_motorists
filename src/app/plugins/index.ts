import vuetify from './vuetify'
import { router } from '@/app/router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import type { App } from 'vue'

export function registerPlugins(app: App) {
    app.use(vuetify)
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: '.dark',
                cssLayer: false
            }
        }
    })
    app.use(ConfirmationService)
    app.use(ToastService)
    app.use(router)
}
