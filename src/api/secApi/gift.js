import axios from '../../utils/request.js'

let gift = {
    // 列表
    getGift(data) {
        return axios({
            url: '/Gift/getGift',
            method: 'post',
            data: data
        })
    },

    // 删除礼物
    deleteGift(data) {
        return axios({
            url: '/Gift/deleteGift',
            method: 'post',
            data: data
        })
    },
    // 设置礼物
    setGift(data) {
        return axios({
            url: '/Gift/setGift',
            method: 'post',
            data: data
        })
    },
    // 礼物搜索
    GiftSearch(data) {
        return axios({
            url: '/Search/GiftSearch',
            method: 'post',
            data: data
        })
    },
}

export default gift