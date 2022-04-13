import axios from 'axios';
import {authInstance, nonAuthInstance} from './AuthApi';

export function getUser(userId){
    return authInstance.get(
        '/api/users/'+ userId,
    );
}

export function getUserInfo(userId){
    return authInstance.get(
        '/api/users/' + userId + '/info',
    );
}

export function join(user){
    return nonAuthInstance.post(
        '/api/users', {
            email : user.email,
            password : user.password
        });
}

export function changeUserInfo(userId, newInfo){
    return authInstance.put(
        '/api/users/' + userId, {
            name : newInfo.name,
            gender : newInfo.gender,
            introduction : newInfo.aboutReader,
            openInfo : newInfo.openInfo,
        }
    );
}

export function changePassword(userId, oldPassword, newPassword){
    return authInstance.put(
        '/api/users/' + userId + '/password', {
            oldPassword : oldPassword,
            newPassword : newPassword,
        }
    );
}

export function resetPassword(resetKey, newPassword){
    return nonAuthInstance.put(
        '/api/users/password/reset', {
            passwordResetKey : resetKey,
            newPassword : newPassword,
        }
    );
}

export function resetPasswordRequest(email){
    return nonAuthInstance.post(
        '/api/users/password/reset',{
            email : email
        }
    );
}

export function withdraw(userId){
    return authInstance.delete(
        '/api/users/' + userId,
    );
}