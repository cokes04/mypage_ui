import axios from 'axios';
import {authInstance, nonAuthInstance} from './AuthApi';

export function getUserReply(userId){
    return authInstance.get( '/api/users/' + userId + '/replys/');
}

export function getEpisodeReply(episodeId){
    return nonAuthInstance.get('/api/episodes/' + episodeId + '/replys/');
}

export function writeReply(reply){
    return authInstance.post('/api/replys',{
        episodeId : reply.episodeId,
        parentReplyId : reply.parentReplyId,
        comment : reply.comment,
    });
}
export function changeReply(replyId, comment){
    return authInstance.patch('/api/replys/' + replyId, {
        comment : comment,
    });
}
export function deleteReply(replyId){
    return authInstance.delete('/api/replys/' + replyId);
}
export function recommendReply(replyId, recommendation){
    return authInstance.post('/api/replys/' + replyId + '/recommendation', {
        recommendation : recommendation === true || recommendation === "y" ?  "y" : "n",
    });
}