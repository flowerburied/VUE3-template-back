import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/lib/theme-chalk/display.css'

const app = createApp(App)

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount("#app");