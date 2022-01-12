import axios from '../../utils/request.js'

let expression = {
    //删除表情
    EmoticonDeleTe(data) {
        return axios({
            url: '/Emoticon/EmoticonDeleTe',
            method: 'post',
            data: data
        })
    },
    // 表情列表
    getEmoticonList(data) {
        return axios({
            url: '/Emoticon/getEmoticonList',
            method: 'post',
            data: data
        })
    },

    //表情详情
    getFind(data) {
        return axios({
            url: '/Emoticon/getFind',
            method: 'post',
            data: data
        })
    },
    // 设置表情
    setEmoticon(data) {
        return axios({
            url: '/Emoticon/setEmoticon',
            method: 'post',
            data: data
        })
    },
}

export default expression