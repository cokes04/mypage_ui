import Cookies from 'universal-cookie'; 
import jwt from 'jwt-decode';

const cookies = new Cookies();

const ACCESS_TOKEN_NAME = 'a_t';
const REFRESH_TOKEN_NAME = "r_t";

const AUTHENTICATED = 'ex_r_t';
const USER_ID = 'id';

const REFRESH_TOKEN_EXPIRY_MINUTE = 6 * 60;

let accessToken = undefined;
            
export function setAuth(newAccessToken){
    setAccessToken(newAccessToken)

    const expired_date =  new Date()
    expired_date.setMinutes(expired_date.getMinutes() + REFRESH_TOKEN_EXPIRY_MINUTE)

    setExistRefreshTokenCookie(expired_date)
}

export function unAuth(){
    removeAccessToken();

    const expired_date =  new Date('1970-01-01')
    setExistRefreshTokenCookie(expired_date)
}


export function getAccessToken(){
    //const token = axios.defaults.headers.common[ACCESS_TOKEN_NAME];
    if(!accessToken) return undefined;
    
    const decodeToken = jwt(accessToken);
    if(decodeToken.exp  < (Date.now()/1000))
        accessToken = undefined;
    
    return accessToken;
}

export function isExistRefreshToken(){
    const isExist = cookies.get(AUTHENTICATED);
    if(isExist === "true")
        return true;
    return false;    
} 

export function getUserId(){
    return cookies.get(USER_ID);
}

export function getUserInfo(){
    const token = getAccessToken();

    let decodeToken;
    try{
        decodeToken = jwt(token);
    }catch(e){
        return {
            id : undefined,
            email : undefined,
            roles : undefined,
            exp : undefined,
        }
    }
    
    return {
        id : decodeToken.sub,
        email : decodeToken.email,
        roles : decodeToken.roles,
        exp : decodeToken.exp
    };
}


const setAccessToken = (newAccessToken) => {
    accessToken = newAccessToken;
    //axios.defaults.headers.common[ACCESS_TOKEN_NAME] = accessToken;
}

const removeAccessToken = () => {
    accessToken = undefined;
}

const setExistRefreshTokenCookie = (expired_date) => {
    cookies.set(AUTHENTICATED, true, {
        path: '/',
        expires : expired_date,
        httpOnly : false,
        secure : false,
        sameSite : "Lax"
        });  
}

const setUserIdCookie = () => {
    const userInfo = getUserInfo();
    cookies.set(USER_ID, userInfo.id, {
        path: '/',
        expires : userInfo.exp,
        httpOnly : false,
        secure : false,
        sameSite : "Lax"
    }); 
}