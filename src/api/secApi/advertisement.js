import axios from '../../utils/request.js'

let advertisement = {
    // 轮播图列表
    getBannerList(data) {
        return axios({
            url: '/Banner/getBannerList',
            method: 'post',
            data: data
        })
    },


}

export default advertisement