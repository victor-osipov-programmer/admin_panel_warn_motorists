/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import { router } from '@/app/router'
// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(router)
}
