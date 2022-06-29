import axios from 'axios';
import {authInstance, nonAuthInstance} from './AuthApi';
import { boolToYn } from './mapper';

export function getIsRecommendReply(replyIds, userId){
    return authInstance.get(`/api/replys/${replyIds.join(",")}/is_recommend`, {
        params : {userId : userId}
    })
}

export function getUserReply(userId, onlyRoot, pageInfo){
    return nonAuthInstance.get(`/api/replys`, {
        params : {
            userId : userId,
            page : pageInfo.page,
            size : pageInfo.size,
            sort : pageInfo.sort,
            onlyRoot : boolToYn(onlyRoot)
        }
    });
}
export function getEpisodeReply(episodeId, onlyRoot, pageInfo){
    return nonAuthInstance.get(`/api/replys`, {
        params : {
            episodeId : episodeId,
            page : pageInfo.page,
            size : pageInfo.size,
            sort : pageInfo.sort,
            onlyRoot :  boolToYn(onlyRoot)
        }
    });
}

export function getChildReply(replyIds, includedGrandchildren){
    return nonAuthInstance.get(`/api/replys/${replyIds.join(",")}/child`, {
        params : {
            includedGrandchildren :  boolToYn(includedGrandchildren)
        }
    });
}


// POST PUT PATCH DELETE

export function writeReply(userId, reply){
    return authInstance.post('/api/replys',{
        userId : userId,
        episodeId : reply.episodeId,
        parentReplyId : reply.parentReplyId,
        comment : reply.comment,
    });
}
export function changeReply(replyId, comment){
    return authInstance.patch(`/api/replys/${replyId}`, {
        comment : comment,
    });
}
export function deleteReply(replyId){
    return authInstance.delete(`/api/replys/${replyId}`);
}
export function recommendReply(replyId, userId, recommendation){
    return authInstance.post(`/api/replys/${replyId}/recommendation`, {
        userId : userId,
        recommendation : boolToYn(recommendation)
    });
}