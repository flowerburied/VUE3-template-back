import { createStore } from "vuex";
import router from "@/router/index";
export default createStore({
    state: {
        Jurisdiction: null
    },
    mutations: {
        SET_JURISDICTION(state, step) {
            state.Jurisdiction = step
        },
    },
    actions: {
        getJurisdiction({
            commit,
            state
        }, step) {
            // console.log("Jurisdiction", state.Jurisdiction)
            let getJurisdiction = localStorage.getItem("Jurisdiction")
            if (getJurisdiction) {
                commit("SET_JURISDICTION", getJurisdiction)
                    // state.Jurisdiction = JSON.parse(getJurisdiction)
            } else {
                console.log("无")
                router.replace({ path: "/" });
            }
        },
    },
    modules: {},
});