import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/auth'


const app = createApp(App)

app.config.globalProperties.$http = axios

app.use(router)
app.use(createPinia())

const authStore = useAuthStore()
authStore.setCsrfToken()

app.mount('#app');



//createApp(App).mount('#app');