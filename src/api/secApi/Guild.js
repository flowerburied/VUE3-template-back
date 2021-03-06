import axios from '../../utils/request.js'

let Guild = {
    // 解散房间
    DissolutionRoom(data) {
        return axios({
            url: '/UnionAdmin/DissolutionRoom',
            method: 'post',
            data: data
        })
    },
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
    // 工会列表
    getUnionList(data) {
        return axios({
            url: '/UnionAdmin/getUnionList',
            method: 'post',
            data: data
        })
    },
    // 通过申请
    ApplyUnion(data) {
        return axios({
            url: '/UnionAdmin/AdoptUnionApply',
            method: 'post',
            data: data
        })
    },
    // 拒绝申请
    RefuseUnionApply(data) {
        return axios({
            url: '/UnionAdmin/RefuseUnionApply',
            method: 'post',
            data: data
        })
    },

    // 房间申请列表
    getRoomApplyList(data) {
        return axios({
            url: '/UnionAdmin/getRoomApplyList',
            method: 'post',
            data: data
        })
    },
    // 通过房间申请
    AdoptRoomApply(data) {
        return axios({
            url: '/UnionAdmin/AdoptRoomApply',
            method: 'post',
            data: data
        })
    },
    // 拒绝房间申请
    RefuseRoomApply(data) {
        return axios({
            url: '/UnionAdmin/RefuseRoomApply',
            method: 'post',
            data: data
        })
    },


}

export default Guild