import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory } from 'react-router-dom'
import { deleteEpisode, getEpisode, getNovel, modifyEpisode } from '../apis/Api'
import NovelInfo from '../components/NovelInfo';
import EpisodeForm from '../components/EpisodeForm'
import { getUserId } from '../utils/AuthUtil'
import { Button } from 'react-bootstrap'

const EpisodeModifyPage = ({novelId, episodeId}) => {
    
    const history = useHistory()
    const [episode, setEpisode] = useState({})
    const [novel, setNovel] = useState({})

    useEffect(() =>{
        getNovel(novelId)
        .then( (response) => {
            if (response.data.authorId != getUserId()){
                alert("접근할 수 없습니다.")
                history.push("/")
            }

            setNovel(response.data)
        })
        .catch( (error) => {
            if(error.response.data.errors)
                    alert(error.response.data.errors[0].message)
                else 
                    alert("소설을 불러올 수 없습니다")
            history.push("/")
        })

    },[novelId]);

    useEffect( () => {
        getEpisode(episodeId)
        .then( (response) => {
            if (response.data.authorId != getUserId()){
                alert("접근할 수 없습니다.")
                history.push("/")
            }
            
            setEpisode(response.data)
        })
        .catch( (error) => {
            if(error.response.data.errors)
                    alert(error.response.data.errors[0].message)
                else 
                    alert("회차를 불러올 수 없습니다")
            history.push("/")
        })   
    },[episodeId])

    const modify = (episode) => {

        modifyEpisode(episodeId, episode)
            .then( (response) => {
                history.push("/novel/"+novelId)
            })
            .catch( (error) => {
                if(error.response.data.errors)
                    alert(error.response.data.errors[0].message)
                else 
                    alert("잠시 후 다시 시도해주세요!")

            history.goBack()
            })
    }

    const erase = () => {
        deleteEpisode(episodeId)
        .then(response => {
            alert("에피소드가 성공적으로 제거되었습니다.")
        })
        .catch( (error) => {
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
        })
        history.goBack()
    }
    return ( 
            <div>
                <NovelInfo novel = {novel} author={{}}/>
                <EpisodeForm episode = {episode} 
                             freeNovel = {novel.free === "y" ? true : false}
                             onsubmit = {modify}
                             submitBtnName = {"수정"} /> 
                <Button className='m-3' onClick={erase}>삭제</Button>
            </div>
            );
}

export default EpisodeModifyPage;