import './styles/main.scss'
import { registerPlugins } from '@/app/plugins'
import App from './App.vue'
import { createApp } from 'vue'

const app = createApp(App)
registerPlugins(app)
app.mount('#app')

console.log('BASE_URL', import.meta.env.BASE_URL)
console.log('url', import.meta.url)
console.log('PROD', import.meta.env.PROD)
console.log('DEV', import.meta.env.DEV)