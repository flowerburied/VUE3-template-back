import { createRouter, createWebHashHistory } from "vue-router";


const routes = [

    {
        path: "/",
        name: "layout",
        component: () =>
            import ("@/views/layout/layout.vue"),
    },
    {
        path: "/index",
        name: "index",
        component: () =>
            import ("@/views/home/index.vue"),
    }, {
        path: "/Login",
        name: "Login",
        component: () =>
            import ("@/views/Login.vue"),
    },
    {
        path: "/news",
        name: "news",
        component: () =>
            import ("@/views/news/news.vue"),
    },

];

const router = createRouter({
    // createWebHistory  //不带#号
    // createWebHashHistory //带#号
    history: createWebHashHistory(),
    routes,
});

export default router;