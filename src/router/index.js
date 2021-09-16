import { createRouter, createWebHashHistory } from "vue-router";


const routes = [

    {
        path: "/",
        name: "layout",
        meta: { title: "首页", icon: "all" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/ogin",
                name: "ogin",
                meta: { title: "首页" },
                component: () =>
                    import ("@/views/Login.vue"),
            },
            {
                path: "/rolePermissions1",
                name: "rolePermissions1",
                meta: { title: "角色权限" },
                component: () =>
                    import ("@/views/componentView/rolePermissions.vue"),
            },
        ]
    },
    {
        path: "/admin",
        name: "admin",
        meta: { title: "管理员管理", icon: "admin" },
        component: () =>
            import ("@/views/layout/layout.vue"),

    },

    {
        path: "/componentView",
        name: "componentView",
        meta: { title: "组件", icon: "all" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/rolePermissions",
                name: "rolePermissions",
                meta: { title: "角色权限" },
                component: () =>
                    import ("@/views/componentView/rolePermissions.vue"),
            },
            {
                path: "/comForm",
                name: "comForm",
                meta: { title: "表单" },
                component: () =>
                    import ("@/views/componentView/Form/comForm.vue"),
            },
        ]

    },
    {
        path: "/index",
        name: "index",
        hidden: true,
        meta: { title: "首页" },
        component: () =>
            import ("@/views/home/index.vue"),

    },
    {
        path: "/Login",
        name: "Login",
        hidden: true,
        meta: { title: "登录1" },
        component: () =>
            import ("@/views/Login.vue"),
    },
    {
        path: "/news",
        name: "news",
        hidden: true,
        meta: { title: "新闻" },
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