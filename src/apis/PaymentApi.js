import {authInstance, nonAuthInstance} from './AuthApi';

export function readyKakaoPay(productId, productName) {
    return authInstance.get('/api/pay/kakaopay/ready',{
        params : {
            productId : productId,
            productName : productName
        }
    })
}

export function approvalKakaoPay(pgToken, tid) {
    return authInstance.get('/api/pay/kakaopay/approval',{
        params : {
            pgToken : pgToken,
            tid : tid
        }
    })
}
export function getPaymentHistorysByIds(payIds) {
    return authInstance.get(`/api/pay/history/${payIds.join(",")}`)
}
export function getPaymentHistorys(userId, pageInfo) {
    return authInstance.get('/api/pay/history',{
        params : {
            userId : userId,
            page : pageInfo.page,
            size : pageInfo.size
        }
    })
}
