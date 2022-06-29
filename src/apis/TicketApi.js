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
    return authInstance.get(`/api/tickets/history/charge`,{
        params : {
            userId : userId,
            page : pageInfo.page,
            size : pageInfo.size,
            sort : pageInfo.sort
        }
    })
}


// POST PUT PATCH DELETE

export function spendTicket(userId, episodeId, type){
    return authInstance.patch('/api/tickets/use', {
        userId : userId, 
        episodeId : episodeId, 
        type : type
    })
}

export function refundTicket(ticketId){
    return authInstance.patch('/api/tickets/refund', {
        ticketId : ticketId,
    })
}