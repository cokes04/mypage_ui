import {authInstance, nonAuthInstance} from './AuthApi';

export function getBuyTicketKinds(){
    return authInstance.get('/api/ticket-kinds')
}

export function getTicket(userId, novelId){
    return authInstance.get('/api/tickets', {
        params : {
            userId : userId,
            novelId : novelId
        }
    })
}
export function getChargeTicketHistorys(userId, pageInfo){
    return authInstance.get(`/api/users/${userId}/tickets/history/charge`,{
        params : {
            page : pageInfo.page,
            size : pageInfo.size
        }
    })
}

export function chargeTicket(userId, novelId, ticketKindsId){
    return authInstance.post('/api/tickets', {
        userId : userId,
        novelId : novelId,
        ticketKindsId : ticketKindsId,
    })
}

export function refundTicket(ticketId){
    return authInstance.patch('/api/tickets/refund', {
        ticketId : ticketId,
    })
}