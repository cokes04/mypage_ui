import axios from 'axios'
import {authInstance, nonAuthInstance} from './AuthApi'

export function getBuyCashKinds(){
    return authInstance.get('/api/cash-kinds', { params: { type : "buy"},  })
}

export function getCash(userId){
    return authInstance.get(`/api/users/${userId}/cashes`);
}

export function chargeCash(charge){
    return authInstance.post('/api/cashs',{
        userId : charge.userId,
        paid : charge.paid,
        free : charge.free,
        expiredDate : charge.expiredDate,
    });
}
export function useCash(use){
    return authInstance.patch('/api/cashes/use', {
        userId : use.userId,
        amount : use.amount,
    });
}

export function getChargeCashHistorys(userId, pageInfo){
    return authInstance.get(`/api/users/${userId}/cashes/history/charge`,{
        params : {
            page : pageInfo.page,
            size : pageInfo.size
        }
    });
}

export function getUseCashHistorys(userId, pageInfo){
    return authInstance.get(`/api/users/${userId}/cashes/history/use`,{
        params : {
            page : pageInfo.page,
            size : pageInfo.size
        }
    });
}