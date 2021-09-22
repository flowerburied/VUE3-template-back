import axios from '../../utils/request.js'

let Admin = {
    // 场地列表
    getAdminUserList(data) {
        return axios({
            url: '/Member/getAdminUserList',
            method: 'post',
            data: data
        })
    },

    // 权限列表
    getJurisdictionList(data) {
        return axios({
            url: '/Jurisdiction/getJurisdictionList',
            method: 'post',
            data: data
        })
    },

}

export default Admin