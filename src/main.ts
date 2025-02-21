import { createApp } from 'vue'
import './style.css'
import './assets/css/admin.css'
import './assets/css/home.css'
import App from './App.vue'
import router from "@/routers";
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'


// 权限校验
import "@/auth/access.ts"

// icon
import "@/assets/icon/iconfont.css"

const app = createApp(App);
const pinia = createPinia();
app.use(router);

app.use(pinia);


app.mount("#app");
