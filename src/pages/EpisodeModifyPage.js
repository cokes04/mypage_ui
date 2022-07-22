import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory } from 'react-router-dom'
import { deleteEpisode, getEpisode, modifyEpisode } from '../apis/EpisodeApi'
import { getNovel} from '../apis/NovelApi'
import NovelInfo from '../components/NovelInfo';
import EpisodeForm from '../components/EpisodeForm'
import { getUserId } from '../utils/AuthUtil'
import { Button, Container, Spinner } from 'react-bootstrap'
import { ynToBool } from '../apis/mapper'

const EpisodeModifyPage = ({novelId, episodeId}) => {
    const [novelLoading, setNovelLoading] = useState(true)
    const [episodeLoading, setEpisodeLoading] = useState(true)

    const history = useHistory()

    const [episode, setEpisode] = useState({})
    const [novel, setNovel] = useState({})

    useEffect( () =>{
        const request = async (novelId) => {
            try{
                let response = await getNovel(novelId)
                if (response.data.authorId != getUserId()){
                    alert("해당 페이지에 접근할 수 없습니다.")
                    history.push("/")
                } else{
                    setNovel(response.data)
                    setNovelLoading(false)
                }
            }catch (error){
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("소설을 불러올 수 없습니다")
                }finally{
                    history.push("/")
                }
            }
        }
        request(novelId)
    },[novelId]);

    useEffect( () => {
        const request = async (episodeId) => {
            try{
                let response = await getEpisode(episodeId)
                if (response.data.authorId !== getUserId()){
                    alert("접근할 수 없습니다.")
                    history.push("/")
                } else{
                    response.data.free = ynToBool(response.data.free)
                    response.data.adult = ynToBool(response.data.adult)
                    setEpisode(response.data)
                    setEpisodeLoading(false)
                }
            }catch (error) {
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("해당 회차를 불러올 수 없습니다")
                }finally{
                    history.push("/")
                }
            }
        }
        request(episodeId)
    },[episodeId])

    const modify = async (episode) => {
        console.log(episode)
        try{
            let response =  await modifyEpisode(episodeId, episode)
            alert("해당 회차가 성공적으로 수정되었습니다.")
            history.push(`/novel/${novelId}`)
        }catch(error){
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
        }
    }

    const erase = async () => {
        try{
            let response =  await deleteEpisode(episodeId)
            alert("해당 회차가 성공적으로 제거되었습니다.")
        }catch(error){
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
        }finally{
            history.goBack()
        }
    }

    const isLoading = () => {
        return novelLoading || episodeLoading
    }
    return ( isLoading() ? <Spinner animation='border'/> :
            <Container>
                <NovelInfo  novel = {novel}
                            author={{}}
                            printReaderButton = {false}
                            isFavorite = "n"
                            />
                <EpisodeForm episode = {episode} 
                             freeNovel = {novel.free === "y" || novel.free==true ? true : false}
                             onsubmit = {modify}
                             submitBtnName = {"수정"} /> 
                <Button className='m-3' onClick={erase}>삭제</Button>
            </Container>
            );
}

export default EpisodeModifyPage;