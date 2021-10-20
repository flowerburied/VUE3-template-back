import axios from '../../utils/request.js'

let template = {
    // 举报信息列表
    getRportFedbackList(data) {
        return axios({
            url: '/Info/getRportFedbackList',
            method: 'post',
            data: data
        })
    },
    // 回复处理结果
    RepleyRportFed(data) {
        return axios({
            url: '/Info/RepleyRportFed',
            method: 'post',
            data: data
        })
    },


}

export default template