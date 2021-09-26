import axios from '../../utils/request.js'

let user = {
    // 用户模块
    getMemberlist(data) {
        return axios({
            url: '/Member/getMemberlist',
            method: 'post',
            data: data
        })
    },

    // 设置用户状态
    setMemberStatus(data) {
        return axios({
            url: '/Member/setMemberStatus',
            method: 'post',
            data: data
        })
    },

    // 用户搜索
    UserSearch(data) {
        return axios({
            url: '/Search/UserSearch',
            method: 'post',
            data: data
        })
    },
}

export default user