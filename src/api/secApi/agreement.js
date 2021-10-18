import axios from '../../utils/request.js'

let agreement = {
    // 协议列表
    getAgreementList(data) {
        return axios({
            url: '/Agreement/getAgreementList',
            method: 'post',
            data: data
        })
    },



}

export default agreement