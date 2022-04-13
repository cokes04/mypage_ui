import React, { useEffect, useState } from 'react'
import { writeEpisode, getNovel } from '../apis/Api'
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory } from 'react-router-dom'
import EpisodeForm from '../components/EpisodeForm'
import NovelInfo from '../components/NovelInfo'
import { Container, Spinner } from 'react-bootstrap'
import { getUserId } from '../utils/AuthUtil'

const EpisodeRegisterPage = ({novelId}) => {
    const [loading, setLoading] = useState(true) 
    const history = useHistory()
    const [novel, setNovel] = useState({})

    useEffect(() =>{
        getNovel(novelId)
        .then( (response) => {    
            if (response.data.authorId != getUserId()){
                alert("접근할 수 없습니다.")
                history.push("/")
            }

            setNovel(response.data)
            setLoading(false)
        })
        .catch( (error) => {
            history.push("/")
        })
    },[novelId])

    const register = (episode) => {
        writeEpisode(novelId, episode)
            .then( (response) => {
                history.push("/novel/" + novelId)
            })
            .catch( (error) => {
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("잠시 후 다시 시도해주세요!")
                }
            })
    }

    return ( loading ? <Spinner animation='border' />:
            <Container>
                <NovelInfo novel = {novel} author={{}} />
                <EpisodeForm freeNovel = {novel.free==="y" ? true : false}
                             onsubmit = {register}
                             submitBtnName = "등록" /> 
            </Container>
            )
}

export default EpisodeRegisterPage;