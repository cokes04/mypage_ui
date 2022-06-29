import axios from 'axios'
import {ChangeDateFormat} from './Api'
import {authInstance, nonAuthInstance} from './AuthApi'
import { boolToYn } from './mapper';

//GET
export function getEpisode(episodeId){
    return authInstance.get(`/api/episodes/${episodeId}` );
}

export function getEpisodeInfosOfNovel(novelId, pageInfo){
    return authInstance.get('/api/episodes/info', {
                params : {
                    novelId : novelId,
                    page : pageInfo.page,
                    size : pageInfo.size,
                    sort : pageInfo.sort,
                }
            }
    );
}
export function getEpisodeInfoByAuthor(authorId, pageInfo){
    return authInstance.get(`/api/episodes/info`, {
                params : {
                    authorId : authorId,
                    page : pageInfo.page,
                    size : pageInfo.size,
                    sort : pageInfo.sort,
                }
            }
    );
}

export function getEpisodeInfo(episodeId){
    return authInstance.get( `/api/episodes/${episodeId}/info` );
}
export function getEpisodeInfoByIds(episodeIds){
    return authInstance.get( `/api/episodes/${episodeIds.join(",")}/info` );
}

export function isReadEpisode(episodeIds, userId){
    return authInstance.get(`/api/episodes/${episodeIds.join(',')}/is_read`, {
        params : { userId : userId }
    });
}

export function isReadEpisodeOfNovel(novelId, userId){
    return authInstance.get(`/api/episodes/is_read`, {
        params : {
            novelId : novelId,
            userId : userId 
            }
    });
}

export function isRecommendedEpisode(episodeIds, userId){
    return authInstance.get(`/api/episodes/${episodeIds.join(',')}/is_recommend`, {
        params : { userId : userId }
    });
}

export function isRecommendedEpisodeOfNovel(novelId, userId){
    return authInstance.get(`/api/episodes/is_recommend`, {
        params : {
            novelId : novelId,
            userId : userId 
            }
    });
}

export function getEpisodePurchaseHistory (episodeIds, userId){
    return authInstance.get(`/api/episodes/${episodeIds.join(',')}/purchase-history`, {
        params : {
            userId  : userId
        }
    })
}

export function getEpisodePurchaseHistoryOfUser (userId, pageInfo){
    return authInstance.get(`/api/episodes/purchase-history`, {
        params : {
            userId : userId,
            size : pageInfo.size,
            page : pageInfo.page,
        }
    })
}




// POST PUT PACTH DELETE
 
export function writeEpisode(novelId, authorId, episode){
    return authInstance.post('/api/episodes', {
                novelId : novelId,
                authorId : authorId,
                category : episode.category,
                title : episode.title,
                mainText : episode.mainText,
                authorComment : episode.authorComment,
                adult : boolToYn(episode.adult),
                free :  boolToYn(episode.free),
                openLevel : episode.openLevel,
                openDate : episode.openDate && ChangeDateFormat(episode.openDate)
            });
}

export function applyChagePaidEpisode(episodeId){
    return authInstance.post(`/episodes/${episodeId}/free/n`);
}

export function modifyEpisode(episodeId, episode){
    return authInstance.put(`/api/episodes/${episodeId}`, {
                category : episode.category,
                title : episode.title,
                mainText : episode.mainText,
                authorComment : episode.authorComment,
                adult : boolToYn(episode.adult),
                free :  boolToYn(episode.free),
                openLevel : episode.openLevel
            });
}

export function deleteEpisode(episodeId){
    return authInstance.delete(`/api/episodes/${episodeId}`);
}

export function recommendEpisode(userId, episodeId){
    return authInstance.post(`/api/episodes/${episodeId}/recommender/${userId}`);
}

export function cancelRecommendEpisode(userId, episodeId){
    return authInstance.delete(`/api/episodes/${episodeId}/recommender/${userId}`);
}