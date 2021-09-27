import axios from '../../utils/request.js'

let news = {
    // 消息列表
    getMsgList(data) {
        return axios({
            url: '/Officialmsg/getMsgList',
            method: 'post',
            data: data
        })
    },

    //消息详情
    getMsgInfo(data) {
        return axios({
            url: '/Officialmsg/getMsgInfo',
            method: 'post',
            data: data
        })
    },

    // 设置消息
    setMsg(data) {
        return axios({
            url: '/Officialmsg/setMsg',
            method: 'post',
            data: data
        })
    },
    // schu消息
    DeleteMsg(data) {
        return axios({
            url: '/Officialmsg/DeleteMsg',
            method: 'post',
            data: data
        })
    },
    // schu消息
    MsgSearch(data) {
        return axios({
            url: '/Search/MsgSearch',
            method: 'post',
            data: data
        })
    },
}

export default news