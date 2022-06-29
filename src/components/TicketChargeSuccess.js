import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NovelInfo from '../components/NovelInfo'
import { getAuthor } from '../apis/Api'
import { getNovel } from '../apis/NovelApi'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Ticket from '../components/Ticket'
import EpisodeInfo from './EpisodeInfo'
import { ynToBool } from '../apis/mapper'
import { getEpisodeInfo } from '../apis/EpisodeApi'

const TicketChargeSuccess = ({novelId, episodeId}) => {
    const [loading, setLoading] = useState(true)
    const [novel, setNovel] = useState({})
    const [author, setAuthor] = useState({})
    const [episode, setEpisode] = useState({})

    useEffect( () => {
        const request = async (episodeId) => {
            try{
                const episodeInfoResponse = await getEpisodeInfo(episodeId)
                episodeInfoResponse.data.adult = ynToBool(episodeInfoResponse.data.adult)
                episodeInfoResponse.data.free = ynToBool(episodeInfoResponse.data.free)
                episodeInfoResponse.data.hidden = ynToBool(episodeInfoResponse.data.hidden)
                setEpisode(episodeInfoResponse.data)
                return episodeInfoResponse.data
            }catch (error){}
        }
        request()
    }, [])

    useEffect( () => {
        const novelReqeust = async (novelId) => {
            let novelResponse = await getNovel(novelId)
             setNovel(novelResponse.data)

             return novelResponse.data
            }

        const authorRequest = async (authorId) => {
            let authorResponse = await getAuthor(authorId)
             setAuthor(authorResponse.data)

             return authorResponse.data
        }

        const request = async (novelId) => {
            const novelResponse = await novelReqeust(novelId)
            await authorRequest(novelResponse.authorId)
            setLoading(false)
        }
        
        request(novelId)

    }, [novelId] )

    return ( loading ? <></> : 
                <Container>
                    <NovelInfo novel = {novel} author = {author}/>
                    <Row className = 'm-3 justify-content-center' style={{fontSize:'20px'}}>
                        보유 이용권
                    </Row>
                    <Row className = 'm-3'>
                        <Ticket novelId={novelId} hideCharge = {true} />
                    </Row>

                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <EpisodeInfo episodeInfo={episode}/>
                        </Col>
                    </Row>
                
                    <Button><Link to = {`/episode/${episodeId}`}>에피소드 읽기</Link></Button>
                                        
                </Container>
            );
}

export default TicketChargeSuccess;