import Router from "./index"
// 路由拦截
Router.beforeEach((to, from, next) => {
    next() //进入下一个路由
        // to  //下一个路由信息
        // from //上一个路由信息
        // console.log("to", to)
        // console.log("from", from)
        // console.log(next())
})