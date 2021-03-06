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
    // 设置协议
    setAgreement(data) {
        return axios({
            url: '/Agreement/setAgreement',
            method: 'post',
            data: data
        })
    },
    // 删除协议
    deleteAgreement(data) {
        return axios({
            url: '/Agreement/deleteAgreement',
            method: 'post',
            data: data
        })
    },
    // 设置协议状态
    setAgreementStatus(data) {
        return axios({
            url: '/Agreement/setAgreementStatus',
            method: 'post',
            data: data
        })
    },
    // 协议搜索
    AgreementSearch(data) {
        return axios({
            url: '/Search/AgreementSearch',
            method: 'post',
            data: data
        })
    },
}

export default agreement