import axios from '../../utils/request.js'

let Withdrawal = {
    // 确认支付宝提现
    ConfirmAliPay(data) {
        return axios({
            url: '/Withdrawal/ConfirmAliPay',
            method: 'post',
            data: data
        })
    },
    // 提现列表
    WithdrawaList(data) {
        return axios({
            url: '/Withdrawal/WithdrawaList',
            method: 'post',
            data: data
        })
    },

}

export default Withdrawal