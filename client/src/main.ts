import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { watch } from 'vue'
import './index.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'
// import { plugin as storePlugin } from './stores'

const app = createApp(App)
const pinia = createPinia()

if (localStorage.getItem("state")) {
    pinia.state.value = JSON.parse(localStorage.getItem("state")!);
}

watch(
    pinia.state,
    (state) => {
        localStorage.setItem("state", JSON.stringify(state))
    },
    { deep: true}
);

app.use(VueSweetalert2);
app.use(pinia)

app.use(router)

app.mount('#app')
