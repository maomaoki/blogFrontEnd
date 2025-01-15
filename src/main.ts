import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/routers";
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App);
const pinia = createPinia();
app.use(router);

app.use(pinia);


app.mount("#app");
