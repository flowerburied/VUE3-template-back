import Router from "./index"
import $store from "../store/index"
import { Back } from "@element-plus/icons"
// 路由拦截
Router.beforeEach((to, from, next) => {
    // next() //进入下一个路由
    // to  //下一个路由信息
    // from //上一个路由信息
    // console.log("to", to)
    // console.log("from", from)




    // const testfun = () => {

    //     let getJur = JSON.parse($store.state.Jurisdiction)
    //     console.log("to.meta.Jurisdiction", to)
    //     let simpleArr = true
    //     if (getJur == 0) {
    //         simpleArr = true
    //     } else {


    //         for (let i = 0; i < getJur.length; i++) {
    //             console.log("getJur[i].id", getJur[i].id)
    //             if (getJur[i].id == to.meta.Jurisdiction) {
    //                 simpleArr = true
    //                 break
    //             } else {
    //                 if (getJur[i].path.length != 0) {
    //                     for (let v = 0; v < getJur[i].path.length; v++) {
    //                         console.log("getJur[i].path", getJur[i].path[v])
    //                         if (getJur[i].path[v] == to.meta.Jurisdiction) {
    //                             simpleArr = true
    //                             continue
    //                         } else {
    //                             simpleArr = false
    //                         }
    //                     }

    //                 } else {
    //                     simpleArr = false
    //                 }
    //             }
    //         }


    //     }
    //     return simpleArr
    // }
    // console.log("testfun", testfun())
    next()
        // let tet = testfun()
        // console.log("tet", tet)
        // if (testfun()) {
        //     next()
        // } else {
        //     next()
        //     console.log("无")
        // }


})