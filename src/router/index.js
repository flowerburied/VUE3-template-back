import { createRouter, createWebHashHistory } from "vue-router";


const routes = [{
        path: "/",
        name: "Login",
        component: () =>
            import ("@/views/Login.vue"),
    },

];

const router = createRouter({
    // createWebHistory  //不带#号
    // createWebHashHistory //带#号
    history: createWebHashHistory(),
    routes,
});

export default router;