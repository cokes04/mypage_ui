import axios from 'axios';
import {authInstance, nonAuthInstance} from './AuthApi';
import { boolToYn } from './mapper';

export function getUser(userId){
    return authInstance.get(
        '/api/users/'+ userId,
    );
}

export function getReaders(readerIds){
    return authInstance.get(`/api/readers/${readerIds.join(',')}`);
}

// POST PUT PATCH DELETE

export function join(user){
    return nonAuthInstance.post(
        '/api/users', {
            email : user.email,
            password : user.password
        });
}

export function verifyEmailRequest(userId, freepass){
    return authInstance.post(
        `/api/users/${userId}/email/verify`, undefined, {
            params:{
                freePass : boolToYn(freepass),
            }
        });
}

export function verifyEmail(userId, verifyKey){
    return authInstance.put(
        `/api/users/${userId}/email/verify`, undefined, {
            params:{
                key : verifyKey,
            }
        });
}

export function verifyAdult(userId){
    return authInstance.put(
        `/api/users/${userId}/adult`);
}

export function changeReaderInfo(userId, newReaderInfo){
    return authInstance.put(
        `/api/users/${userId}/reader`, {
            readerName : newReaderInfo.readerName,
            gender : newReaderInfo.gender,
            aboutReader : newReaderInfo.aboutReader,
            openReaderInfo : newReaderInfo.openReaderInfo,
        }
    );
}

export function changeAuthorInfo(authorId, newInfo){
    return authInstance.put(`/api/users/${authorId}/author`, {
        authorName : newInfo.authorName,
        aboutAuthor : newInfo.aboutAuthor,
        }
    );
}

export function changePassword(userId, oldPassword, newPassword){
    return authInstance.put(
        `/api/users/${userId}/password`, {
            oldPassword : oldPassword,
            newPassword : newPassword,
        }
    );
}

export function resetPassword(userId, resetKey, newPassword){
    return nonAuthInstance.put(
        `/api/users/${userId}/password/reset`, {
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
    return authInstance.delete(`/api/users/${userId}`);
}