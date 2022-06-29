import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap'
import { getAuthor } from '../apis/Api'
import { getNovel } from '../apis/NovelApi'
import { getEpisodeInfo } from '../apis/EpisodeApi'
import { getUserId } from '../utils/AuthUtil'
import EpisodeInfo from './EpisodeInfo'
import NovelInfo from './NovelInfo'
import { Link } from 'react-router-dom'
import {getAccessToken} from '../utils/AuthUtil'
import { ynToBool } from '../apis/mapper'
import { spendTicket } from '../apis/TicketApi'

const EpisodePurchase = ({id}) => {
    const [loading, setLoading] = useState(true)

    const [novel, setNovel] = useState({})
    const [episode, setEpisode] = useState({})
    const [author, setAuthor] = useState({})

    useEffect( () => {
        const episodeInfoRequest = async (episodeId) => {
            try{
                const episodeInfoResponse = await getEpisodeInfo(episodeId)
                episodeInfoResponse.data.adult = ynToBool(episodeInfoResponse.data.adult)
                episodeInfoResponse.data.free = ynToBool(episodeInfoResponse.data.free)
                episodeInfoResponse.data.hidden = ynToBool(episodeInfoResponse.data.hidden)
                setEpisode(episodeInfoResponse.data)
                return episodeInfoResponse.data
            }catch (error){}
        }
        const novelRequest = async (novelId) => {
            try{
                const novelResponse = await getNovel(novelId)
                setNovel(novelResponse.data)
                return novelResponse
            }catch (error){}
         }

        const authorReqeust = async (authorId) => {
            try{
                const authorResponse = await getAuthor(authorId)
                setAuthor(authorResponse.data)
                return authorResponse
            }catch (error){}
         }
        
        const request = async (episodeId) => { 
            const episodeInfoResponse = await episodeInfoRequest(episodeId)
            await novelRequest(episodeInfoResponse.novelId)
            await authorReqeust(episodeInfoResponse.authorId)
            setLoading(false)
         }

        request(id)
        
    }, [])

    const purchase = async () => {
        const userId = getUserId()

        try{
            const response = await spendTicket(userId, id, "TP")
            window.location.reload()

        }catch (error){
            
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
       
        }
    }
    

    const isLoggedInState = () => {
        return getAccessToken()
    }
    const redirectLoginPage = () => {

        window.location.assign('/sign')
        return <></>
    }

    return ( loading ? <Spinner animation='border'/> :
            !isLoggedInState() ? redirectLoginPage() :
                <Container className='m-5'>
                    <NovelInfo novel = {novel} author={author}/>

                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <EpisodeInfo episodeInfo={episode}/>
                        </Col>
                    </Row>

                    <Row className='justify-content-center my-5'>
                        <Col md={3}>
                            <Button type='button' onClick={purchase}>구매하기</Button>
                        </Col>

                        <Col md={3}>
                            <Button type='button'>
                                <Link to = {`/ticket/charge?novelId=${novel.novelId}&episodeId=${id}`} style={{color : "#FFFFFF"}}> 이용권 충전 </Link>
                            </Button>
                        </Col>
                    </Row>

                    
                </Container>
            );
}

export default EpisodePurchase;