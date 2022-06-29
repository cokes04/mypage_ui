import axios from 'axios'
import {authInstance, nonAuthInstance} from './AuthApi'

export function getBuyCashKinds(){
    return authInstance.get('/api/cash-kinds',{
        params: {
             type : "buy"
            },  
    })
}

export function getCash(userId){
    return authInstance.get(`/api/cashes`,{
        params : {
            userId : userId
        }
    })
}
export function getChargeCashHistorys(userId, status, pageInfo){
    return authInstance.get(`/api/cashes/history/charge`,{
        params : {
            userId : userId,
            page : pageInfo.page,
            size : pageInfo.size,
            status : status.join(',')
        }
    })
}

export function getUseCashHistorys(userId, pageInfo){
    return authInstance.get(`/api/cashes/history/use`,{
        params : {
            userId : userId,
            page : pageInfo.page,
            size : pageInfo.size
        }
    })
}

export function getUseCashHistory(useId){
    return authInstance.get(`/api/cashes/history/use/${useId}`)
}


// POST PUT PATCH DELETE

export function spendCash(userId, novelId, ticketKindsId, amount){
    return authInstance.patch('/api/cashes/use', {
        userId : userId,
        novelId : novelId,
        ticketKindsId : ticketKindsId,
        amount : amount,
    })
}



