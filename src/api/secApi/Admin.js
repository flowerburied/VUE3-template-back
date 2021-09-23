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
    // 设置模块
    setMoudle(data) {
        return axios({
            url: '/Jurisdiction/setMoudle',
            method: 'post',
            data: data
        })
    },
    // 设置节点
    setNode(data) {
        return axios({
            url: '/Jurisdiction/setNode',
            method: 'post',
            data: data
        })
    },
    // 删除模块
    deleteMoudle(data) {
        return axios({
            url: '/Jurisdiction/deleteMoudle',
            method: 'post',
            data: data
        })
    },
    // 删除节点
    deleteNode(data) {
        return axios({
            url: '/Jurisdiction/deleteNode',
            method: 'post',
            data: data
        })
    },
    // 设置i管理员状态
    setAdminUserStatus(data) {
        return axios({
            url: '/AdminLogin/setAdminUserStatus',
            method: 'post',
            data: data
        })
    },
    // 设置管理员
    setAdminUser(data) {
        return axios({
            url: '/AdminLogin/setAdminUser',
            method: 'post',
            data: data
        })
    },
    // 删除管理员
    DeleteAdminUser(data) {
        return axios({
            url: '/Member/DeleteAdminUser',
            method: 'post',
            data: data
        })
    },

}

export default Admin