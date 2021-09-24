import { createRouter, createWebHashHistory } from "vue-router";


const routes = [

    {
        path: "/layout",
        name: "layout",
        meta: { title: "管理员管理", icon: "admin" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/adminlist",
                name: "adminlist",
                meta: { title: "管理员列表" },
                component: () =>
                    import ("@/views/admin/admin.vue"),

            },
            {
                path: "/jurisdiction",
                name: "jurisdiction",
                meta: { title: "权限列表" },
                component: () =>
                    import ("@/views/admin/jurisdiction.vue"),
            },
            {
                path: "/addAdmin",
                name: "addAdmin",
                hidden: true,
                meta: { title: "添加管理员" },
                component: () =>
                    import ("@/views/admin/addAdmin.vue"),
            },
        ]
    },
    {
        path: "/user",
        name: "user",
        meta: { title: "用户管理", icon: "admin" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/user",
                name: "user",
                meta: { title: "用户列表" },
                component: () =>
                    import ("@/views/user/user.vue"),
            },

        ]

    },

    {
        path: "/componentView",
        name: "componentView",
        meta: { title: "组件", icon: "all" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [

            {
                path: "/myThreeDome",
                name: "myThreeDome",
                meta: { title: "Three.js" },
                component: () =>
                    import ("@/views/componentView/threeJs/myThreeDome.vue"),
            },
            {
                path: "/rolePermissions",
                name: "rolePermissions",
                meta: { title: "角色权限" },
                component: () =>
                    import ("@/views/componentView/rolePermissions.vue"),
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
        path: "/",
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