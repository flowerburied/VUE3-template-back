import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

// Vue I18ni18n
import i18n from './language'

//svg全局组件注册
import SvgIcon from "@/components/Svgicon"
//svg文件解析
import "./js/svg.js"

const app = createApp(App)
app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .component("svg-icon", SvgIcon)
    .mount("#app");