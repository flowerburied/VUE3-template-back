import axios from '../../utils/request.js'
import qs from 'qs'
let template = {
    // 场地列表
    getPlaceList(data) {
        return axios({
            url: '/H5/getPlaceList',
            method: 'post',
            data: qs.stringify(data)
        })
    },


}

export default template