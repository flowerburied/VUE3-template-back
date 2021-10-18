import axios from '../../utils/request.js'

let Guild = {
    // 工会列表
    getUnionApplyList(data) {
        return axios({
            url: '/UnionAdmin/getUnionApplyList',
            method: 'post',
            data: data
        })
    },

    // 工会详情
    UnionFind(data) {
        return axios({
            url: '/UnionAdmin/UnionFind',
            method: 'post',
            data: data
        })
    },

}

export default Guild