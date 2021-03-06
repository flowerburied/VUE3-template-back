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
    //设置轮播图
    setBanner(data) {
        return axios({
            url: '/Banner/setBanner',
            method: 'post',
            data: data
        })
    },
    //删除轮播图
    deleteBanner(data) {
        return axios({
            url: '/Banner/deleteBanner',
            method: 'post',
            data: data
        })
    },
}

export default advertisement