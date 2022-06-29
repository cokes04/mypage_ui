import axios from 'axios'
import {authInstance, nonAuthInstance} from './AuthApi'

export function getNovel(novelId){
    return authInstance.get(`/api/novels/${novelId}`);
}

export function getNovels(novelIds){
    return authInstance.get(`/api/novels/${novelIds.join(',')}`);
}

export function getNovelsOfAuthor(authorId, pageInfo){
    return authInstance.get( '/api/novels', {
            params: {
                authorId : authorId,
                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
              },
        }
    )
}

export function SearchNovel(searhInfo, pageInfo){
    return authInstance.get('/api/novels', {
            params: {
                keyword : searhInfo.keyword,
                type : searhInfo.type,
                genre : searhInfo.genre,
                payment : searhInfo.payment,
                ageGroup : searhInfo.ageGroup,

                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
              },   
        }
    )
}

export function getFavoriteNovelsOfUser(userId, pageInfo){
    return authInstance.get(`/api/favorites`, {
            params : {
                userId : userId,
                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
            }
        });
}

export function isFavoriteNovel(novelIds, userId){
    return authInstance.get(`/api/novels/${novelIds.join(',')}/is_favorite`, {
        params : { userId : userId }
    });
}

// POST PUT PATCH DELETE

export function writeNovel(authorId, novel){
    return authInstance.post('/api/novels', {
                    authorId : authorId,
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
        return authInstance.put(`/api/novels/${novelId}`, {
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

export function applyPaidNovel(novelId){
    return authInstance.post(`/api/novels/${novelId}/paid-apply` );
}

export function deleteNovel(novelId){
    return authInstance.delete(`/api/novels/${novelId}`);
}

export function addFavorite(userId, novelId){
    return authInstance.post(`/api/favorites`,{
        userId : userId, 
        novelId : novelId
    } );
}

export function deleteFavorite(userId, novelId){
    return authInstance.delete(`/api/favorites/${novelId}`, {
        params : {
            userId : userId,
        }
    } );
}