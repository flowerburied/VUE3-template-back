import Router from "./index"
import $store from "../store/index"
// 路由拦截
Router.beforeEach((to, from, next) => {
    // next() //进入下一个路由
    // to  //下一个路由信息
    // from //上一个路由信息
    console.log("to", to)
        // console.log("from", from)
    let getJur = JSON.parse($store.state.Jurisdiction)
    console.log("1权限", getJur)

    // const getid=

    const testfun = () => {
        let simpleArr = getJur.filter((item, i) => {
            if (item.id == from.meta.Jurisdiction) {
                return true
            } else {
                if (item.path.length != 0) {
                    // if()
                    item.path.map((it) => {
                        if (it == from.meta.Jurisdiction) {
                            return true
                        } else {
                            return false
                        }
                    })
                } else {
                    return false
                }
            }
            //  return item != 1;
        })
        return simpleArr
    }
    if (testfun()) {
        next()
    } else {
        console.log("无")
    }

    let tet = testfun()
    console.log("tet", tet)

})