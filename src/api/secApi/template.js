import axios from '../../utils/request.js'

let template = {
    // 场地列表
    getPlaceList(data) {
        return axios({
            url: '/H5/getPlaceList',
            method: 'post',
            data: data
        })
    },


}

export default template