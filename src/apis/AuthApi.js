import axios from 'axios';
import { getAccessToken, isExistRefreshToken, setAuth, unAuth } from '../utils/AuthUtil';

const renewalTokenInstance = axios.create({
    timeout : 1000,
})

export const authInstance = axios.create({
    timeout: 1000,
    withCredentials : true,
});

export const nonAuthInstance = axios.create({
    timeout: 1000,
    withCredentials : false
});

authInstance.interceptors.request.use(
    async config => { 

        if(!config.headers.Authorization && getAccessToken()){
            config.headers.Authorization = getAccessToken();
        }
        
        if(!config.headers.Authorization){
            if(isExistRefreshToken())
                await renewalToken()
                    .then( (response) => {
                        const accessToken = response.data.accessToken;
                        setAuth(accessToken);
                        config.headers.Authorization = getAccessToken();
                    })
                    .catch( (error) => {
                        unAuth()
                        window.location.replace("/")
                    })
        }
      return config
    },
    error => {
      return Promise.reject(error);
    },
  )


export function renewalToken(){
    return renewalTokenInstance.post(
        '/api/auth/renewal',
    );
}

export function login(email, password){
    return nonAuthInstance.post(
        '/api/auth/login',{
            email : email,
            password : password
        });
}

export function logout(){
    return nonAuthInstance.post(
        '/api/auth/logout'
    );
}