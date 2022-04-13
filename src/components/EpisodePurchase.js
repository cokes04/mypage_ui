import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap'
import { getAuthor, getEpisodeInfo, getNovel, purchaseEpisode } from '../apis/Api'
import { getUserId } from '../utils/AuthUtil'
import EpisodeInfo from './EpisodeInfo'
import NovelInfo from './NovelInfo'
import { Link } from 'react-router-dom'
import {getAccessToken} from '../utils/AuthUtil'

const EpisodePurchase = ({id}) => {
    const [loading, setLoading] = useState(true)

    const [novel, setNovel] = useState({})
    const [episode, setEpisode] = useState({})
    const [author, setAuthor] = useState({})

    useEffect( async () => {
        try{
            const episodeResponse = await getEpisodeInfo(id)
            const novelResponse = await getNovel(episodeResponse.data.novelId)
            const authorResponse = await getAuthor(novelResponse.data.authorId)

            episodeResponse.data.adult = episodeResponse.data.adult === "y" ? true : false;
            episodeResponse.data.free = episodeResponse.data.free === "y" ? true : false
            episodeResponse.data.hidden = episodeResponse.data.hidden === "y" ? true : false
 
            setEpisode(episodeResponse.data)
            setNovel(novelResponse.data)
            setAuthor(authorResponse.data)
            setLoading(false)
        }catch (error){

        }
        

    }, [])

    const purchase = async () => {
        try{
            const response = await purchaseEpisode(id, getUserId(), "TP")

            console.log(response)
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
                                <Link to = {`/ticket/charge?novelId=${novel.novelId}`} style={{color : "#FFFFFF"}}> 이용권 충전 </Link>
                            </Button>
                        </Col>
                    </Row>

                    
                </Container>
            );
}

export default EpisodePurchase;