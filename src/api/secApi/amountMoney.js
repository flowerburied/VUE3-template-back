import axios from '../../utils/request.js'

let amountMoney = {
    // 日周月
    SumRechargeLog(data) {
        return axios({
            url: '/Recharge/SumRechargeLog',
            method: 'post',
            data: data
        })
    },
    //提现  日周月
    SumWithdrawal(data) {
        return axios({
            url: '/Withdrawal/SumWithdrawal',
            method: 'post',
            data: data
        })
    },


}

export default amountMoney