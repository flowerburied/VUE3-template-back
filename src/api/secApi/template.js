import axios from '../../utils/request.js'

let template = {
    // 场地列表
    getPlaceList(data) {
        return axios({
            url: '/AdminLogin/login',
            method: 'post',
            data: data
        })
    },


}

export default template