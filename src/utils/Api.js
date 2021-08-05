import axios from 'axios';

const tokenName = 'Authorization';

export function setDefaultHeader(){
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function setToken(token){
    axios.defaults.headers.common[tokenName] = token;
}

export function getToken(){
    return axios.defaults.headers.common[tokenName];
}

export function removeToken(){
    delete axios.defaults.headers.common[tokenName];
}


export function signUp(data){
    return axios.post(
        '/api/auth/signup',
        data
        );
}

export function login(data){
    return axios.post(
        '/api/auth/login',
        data
        );
}
export function logout(data){
    return axios.post(
        '/api/auth/logout',
        data,
    );
}

export function getNovelToId(novel_id){
    return axios.get(
        '/api/novel/' + novel_id
    );
}

export function getNovelList(novelInfo, pageInfo){
    return axios.get(
        '/api/novel',
        {
            params: {
                free : novelInfo['free'],
                genre : novelInfo['genre'],

                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
              },
            
        }
    )
}

export function searchNovel(keyword, pageInfo){
    return axios.get('/novel/searsh/' + keyword, 
        {
            params : {
                page : pageInfo.page,
                size : pageInfo.size,
                sort : pageInfo.sort,
            }
        });
}