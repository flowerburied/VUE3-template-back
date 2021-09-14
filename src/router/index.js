import { createRouter, createWebHashHistory } from "vue-router";


const routes = [

    {
        path: "/",
        name: "layout",
        meta: { title: "首页" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
            path: "/ogin",
            name: "ogin",
            meta: { title: "首页" },
            component: () =>
                import ("@/views/Login.vue"),
        }, ]
    },

    {
        path: "/componentView",
        name: "componentView",
        meta: { title: "组件" },
        children: [{
                path: "/rolePermissions",
                name: "rolePermissions",
                meta: { title: "角色权限" },
                component: () =>
                    import ("@/views/componentView/rolePermissions.vue"),
                children: [{
                    path: "/comForm",
                    name: "comForm",
                    meta: { title: "表单1" },
                    component: () =>
                        import ("@/views/componentView/Form/comForm.vue"),
                    children: [{
                        path: "/comForm",
                        name: "comForm",
                        meta: { title: "表单2" },
                        component: () =>
                            import ("@/views/componentView/Form/comForm.vue"),
                        children: [{
                            path: "/comForm",
                            name: "comForm",
                            meta: { title: "表单3" },
                            component: () =>
                                import ("@/views/componentView/Form/comForm.vue"),
                        }, ]
                    }, ]
                }, ]
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
        meta: { title: "登录" },
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