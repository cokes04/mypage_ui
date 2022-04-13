import axios from 'axios';
import {authInstance, nonAuthInstance} from './AuthApi';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function getNovel(novelId){
    return authInstance.get('/api/novels/' + novelId);
}

export function getNovels(novelInfo, pageInfo){
    return authInstance.get( '/api/novels',{
            params: {
                keyword : novelInfo.keyword,
                type : novelInfo.type,
                genre : novelInfo.genre,
                payment : novelInfo.payment,
                ageGroup : novelInfo.ageGroup,

                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
              },   
        }
    )
}

export function getNovelsByIds(novelIds){
    return authInstance.get(`/api/novels/${novelIds.join(',')}`);
}

export function getNovelsOfAuthor(authorId, pageInfo){
    return authInstance.get( '/api/authors/' + authorId + '/novels', {
            params: {
                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
              },
        }
    )
}

export function getNovelsOfUser(userId, pageInfo){
    return authInstance.get( '/api/users/' + userId + '/novels', {
            params: {
                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
              }, 
        }
    )
}

export function getFavoriteNovelsOfUser(userId, pageInfo){
    return authInstance.get('/api/users/' + userId + '/favorites', {
            params : {
                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
            }
        });
}

export function writeNovel(novel){
    return authInstance.post('/api/novels', {
                    title : novel.title,
                    description : novel.description,
                    ageGrade : novel.ageGrade,
                    genres : novel.genres,
                    serialCycles : novel.serialCycles,
                    status : novel.status,       
                }
    );
}

export function modifyNovel(novelId, novel){
        return authInstance.put('/api/novels/' + novelId, {
                    title : novel.title,
                    description : novel.description,
                    ageGrade : novel.ageGrade,
                    genres : novel.genres,
                    serialCycles : novel.serialCycles,
                    status : novel.status,       
                    finish : novel.finish,
                }
        );
}

export function deleteNovel(novelId){
    return authInstance.delete( '/api/novels/' + novelId );
}

export function addFavorite(userId, novelId){
    return authInstance.post( '/api/users/' + userId + '/favorites/novels/' + novelId );
}

export function deleteFavorite(userId, novelId){
    return authInstance.delete( '/api/users/' + userId + '/favorites/novels/' + novelId );
}

export function paidApply(novelId){
    return authInstance.post( `/api/novels/${novelId}/paid` );
}

export function monopolyApply(novelId){
    return authInstance.post( `/api/novels/${novelId}/monopoly` );
}

export function getEpisode(episodeId){
    return authInstance.get('/api/episodes/'+episodeId );
}

export function getEpisodeInfosInOfNovel(novelId, pageInfo){
    return authInstance.get('/api/novels/' + novelId + '/episodes/info', {
                params : {
                    page : pageInfo.page,
                    size : pageInfo.size,
                    sort : pageInfo.sort,
                }
            }
    );
}

export function getEpisodeInfo(episodeId){
    return authInstance.get( '/api/episodes/' + episodeId + '/info' );
}
export function getEpisodeInfoByIds(episodeIds){
    return authInstance.get( `/api/episodes/${episodeIds.join(",")}/info` );
}

export function getReadhistory(userId, novelId, pageInfo){
    return authInstance.get('/api/users/' + userId + '/read-history', {
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
    return authInstance.get(`/api/authors/${authorId}/episodes/info`, {
                params : {
                    page : pageInfo.page,
                    size : pageInfo.size,
                    sort : pageInfo.sort,
                }
            }
    );
}

export function getPurchaseEpisodeHistorys(userId, pageInfo){
    return authInstance.get(`/api/users/${userId}/episodes/history/purchase`,{
        params : {
            page : pageInfo.page,
            size : pageInfo.size
        }
    })
}
export function writeEpisode(novelId, episode){
    return authInstance.post('/api/episodes', {
                novelId : novelId,
                category : episode.category,
                title : episode.title,
                mainText : episode.mainText,
                authorComment : episode.authorComment,
                adult : episode.adult === true || episode.adult === "true" ||  episode.adult === "y" ? "y" : "n",
                free : episode.free === true || episode.free === "true" ||  episode.free === "y" ? "y" : "n",
                openLevel : episode.openLevel,
                openDate : episode.openDate && ChangeDateFormat(episode.openDate)
            });
}

export function modifyEpisode(episodeId, episode){
    return authInstance.put('/api/episodes/' + episodeId, {
                category : episode.category,
                title : episode.title,
                mainText : episode.mainText,
                authorComment : episode.authorComment,
                adult : episode.adult === true || episode.adult === "true" ||  episode.adult === "y" ? "y" : "n",
                free : episode.free === false || episode.free === "false" ||  episode.free === "n" ? "n" : undefined,
                openLevel : episode.openLevel
            });
}

export function deleteEpisode(episodeId){
    return authInstance.delete(
        '/api/episodes/' + episodeId
    );
}

export function recommendEpisode(userId, episodeId){
    return authInstance.post(`/api/users/${userId}/episodes/${episodeId}/recommendation`);
}

export function cancelRecommendEpisode(userId, episodeId){
    return authInstance.delete(`/api/users/${userId}/episodes/${episodeId}/recommendation`);
}

export function purchaseEpisode(episodeId, userId, purchaseType){
    return authInstance.post(`/api/purchase/episodes/${episodeId}`,{
                userId : userId,
                type : purchaseType                                    
    })
}
export function getAuthor(authorId){
    return authInstance.get(`/api/authors/${authorId}`);
}
export function getAuthors(authorIdList){
    return authInstance.get(`/api/authors/${authorIdList.join(',')}`)
}

export function changeAuthorInfo(authorId, newInfo){
    return authInstance.put(`/api/authors/${authorId}`, {
                name : newInfo.name,
                introduction : newInfo.aboutAuthor || '',
        }
    );
}

const ChangeDateFormat = (date) => {

    console.log(date.getFullYear())
        
    const ymd = `${date.getFullYear()}` +
                `-${(date.getMonth() + 1) < 10 ? "0" : ""}${(date.getMonth() + 1)}` +
                `-${date.getDate() < 10 ? "0" : ""}${(date.getDate())}`

    const hms = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}` +
                `:${date.getMinutes() < 10 ? "0" : ""}${(date.getMinutes())}` + 
                `:00`

    return `${ymd}T${hms}`

}