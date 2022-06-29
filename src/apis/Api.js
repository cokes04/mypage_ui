import axios from 'axios';
import {authInstance, nonAuthInstance} from './AuthApi';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function getAuthor(authorId){
    return authInstance.get(`/api/authors/${authorId}`);
}
export function getAuthors(authorIdList){
    return authInstance.get(`/api/authors/${authorIdList.join(',')}`)
}

export const ChangeDateFormat = (date) => {
    console.log(date.getFullYear())
        
    const ymd = `${date.getFullYear()}` +
                `-${(date.getMonth() + 1) < 10 ? "0" : ""}${(date.getMonth() + 1)}` +
                `-${date.getDate() < 10 ? "0" : ""}${(date.getDate())}`

    const hms = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}` +
                `:${date.getMinutes() < 10 ? "0" : ""}${(date.getMinutes())}` + 
                `:00`

    return `${ymd}T${hms}`

}