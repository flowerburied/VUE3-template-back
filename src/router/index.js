import { createRouter, createWebHashHistory } from "vue-router";


const routes = [

    {
        path: "/layout",
        name: "layout",
        meta: { title: "管理员管理", icon: "admin", Jurisdiction: "72" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/adminlist",
                name: "adminlist",
                meta: { title: "管理员列表", Jurisdiction: "151" },
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
        meta: { title: "用户管理", icon: "user", Jurisdiction: "84" },
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
        path: "/advertisement",
        name: "advertisement",
        meta: { title: "广告管理", icon: "advertisement", Jurisdiction: "85" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/advertisement",
                name: "advertisement",
                meta: { title: "广告列表" },
                component: () =>
                    import ("@/views/advertisement/advertisement.vue"),
            },

        ]
    },

    {
        path: "/news",
        name: "news",
        meta: { title: "消息管理", icon: "news", Jurisdiction: "86" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/news",
                name: "news",
                meta: { title: "消息列表" },
                component: () =>
                    import ("@/views/news/news.vue"),
            },
            {
                path: "/addNews",
                name: "addNews",
                hidden: true,
                meta: { title: "添加消息" },
                component: () =>
                    import ("@/views/news/addNews.vue"),
            },


        ]
    },
    {
        path: "/gift",
        name: "gift",
        meta: { title: "礼物管理", icon: "gift", Jurisdiction: "87" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/gift",
                name: "gift",
                meta: { title: "礼物列表" },
                component: () =>
                    import ("@/views/gift/gift.vue"),
            },


        ]
    },
    {
        path: "/Guild",
        name: "Guild",
        meta: { title: "公会管理", icon: "Guild", Jurisdiction: "88" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/Guild",
                name: "Guild",
                meta: { title: "公会列表" },
                component: () =>
                    import ("@/views/Guild/Guild.vue"),
            },
            {
                path: "/applyGuild",
                name: "applyGuild",
                meta: { title: "申请公会列表" },
                component: () =>
                    import ("@/views/Guild/applyGuild.vue"),
            },
            {
                path: "/applyRoom",
                name: "applyRoom",
                meta: { title: "申请房间列表" },
                component: () =>
                    import ("@/views/Guild/applyRoom.vue"),
            },


        ]
    },
    {
        path: "/agreement",
        name: "agreement",
        meta: { title: "用户协议管理", icon: "agreement", Jurisdiction: "89" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/agreement",
                name: "agreement",
                meta: { title: "用户协议列表" },
                component: () =>
                    import ("@/views/agreement/agreement.vue"),
            },


        ]
    },
    {
        path: "/report",
        name: "report",
        meta: { title: "举报管理", icon: "report", Jurisdiction: "90" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/report",
                name: "report",
                meta: { title: "举报列表" },
                component: () =>
                    import ("@/views/report/report.vue"),
            },
            {
                path: "/replyReport",
                name: "replyReport",
                hidden: true,
                meta: { title: "举报详情" },
                component: () =>
                    import ("@/views/report/replyReport.vue"),
            },

        ]
    },


    {
        path: "/Withdrawal",
        name: "Withdrawal",
        meta: { title: "提现管理", icon: "report", Jurisdiction: "90" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/Withdrawal",
                name: "Withdrawal",
                meta: { title: "提现列表" },
                component: () =>
                    import ("@/views/Withdrawal/Withdrawal.vue"),
            },


        ]
    },
    {
        path: "/expression",
        name: "expression",
        meta: { title: "表情管理", icon: "report", Jurisdiction: "90" },
        component: () =>
            import ("@/views/layout/layout.vue"),
        children: [{
                path: "/expression",
                name: "expression",
                meta: { title: "表情列表" },
                component: () =>
                    import ("@/views/expression/expression.vue"),
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
                path: "/myThreeDomeRing",
                name: "myThreeDomeRing",
                meta: { title: "计算公式" },
                component: () =>
                    import ("@/views/componentView/threeJs/myThreeDomeRing.vue"),
            },
            {
                path: "/myThreeDomeCar",
                name: "myThreeDomeCar",
                meta: { title: "汽车渲染" },
                component: () =>
                    import ("@/views/componentView/threeJs/myThreeDomeCar.vue"),
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


];

const router = createRouter({
    // createWebHistory  //不带#号
    // createWebHashHistory //带#号
    history: createWebHashHistory(),
    routes,
});

export default router;