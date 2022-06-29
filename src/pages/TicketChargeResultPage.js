import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getAuthor } from '../apis/Api'
import { getUseCashHistory } from '../apis/CashApi'
import { getEpisodeInfo } from '../apis/EpisodeApi'
import { ynToBool } from '../apis/mapper'
import { getNovel } from '../apis/NovelApi'
import { spendTicket } from '../apis/TicketApi'
import EpisodeInfo from '../components/EpisodeInfo'
import NovelInfo from '../components/NovelInfo'
import Ticket from '../components/Ticket'
import { getUserId } from '../utils/AuthUtil'

const TicketChargeResultPage = () => {
    const history = useHistory()
    const location = useLocation()

    const [useId, setUseId] = useState(null)
    const [episodeId, setEpisodeId] = useState(null)
    const [novelId, setNovelId] = useState(null)

    const [novel, setNovel] = useState({})
    const [author, setAuthor] = useState({})
    const [episode, setEpisode] = useState({})

    const [episodeLoading, setEpisodeLoading] = useState(true)
    const [loading, setLoading] = useState(true)

    const [result, setResult] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    

    useEffect(() => {
        if (!location.state || !location.state.useId || !location.state.novelId){
            alert("접근 할 수 없는 페이지입니다.")
            history.push("/")
        } else{
            setUseId(location.state.useId)
            setEpisodeId(location.state.episodeId)
            setNovelId(location.state.novelId)
        }
    }, [])
    

    useEffect( () => {
        if(!useId) return

        const request = async (useId) => {
            try{
                const response = await getUseCashHistory(useId)
                if(response.data.status === "complete")
                    return true
                else if(response.data.status === "failure"){
                    setErrorMessage(response.data.message)
                    return false
                }

                return false

            }catch(error){
                try{
                    setErrorMessage(error.response.data.errors[0].message)
                } catch(error1){
                    setErrorMessage("이용권 충전에 실패하였습니다.")
                }

                return null
            }
        }

        const timerRequest = async (delay, count) => {
            if (count === 2) {
                setResult(false)
                alert("이용권 충전 처리가 지연되고 있습니다.\n 잠시만 기다려주세요.")
                return
            }

            const result = await request(useId)
            if (result === true || result === false){
                setResult(result)
                return
            }
            else if (result === null) 
                setTimeout( () => timerRequest(delay, count+1), delay)
            
        }

        timerRequest(500, 0)
    }, [useId] )


    useEffect( () => {
        if(!episodeId) return

        const request = async (episodeId) => {
            try{
                const episodeInfoResponse = await getEpisodeInfo(episodeId)
                episodeInfoResponse.data.adult = ynToBool(episodeInfoResponse.data.adult)
                episodeInfoResponse.data.free = ynToBool(episodeInfoResponse.data.free)
                episodeInfoResponse.data.hidden = ynToBool(episodeInfoResponse.data.hidden)
                setEpisode(episodeInfoResponse.data)
                setEpisodeLoading(false)
            }catch (error){}
        }

        request(episodeId)
    }, [episodeId])

    useEffect( () => {
        if(!novelId) return

        const request = async (novelId) => {
            const novelResponse = await getNovel(novelId)
            const authorId = novelResponse.data.authorId
            let authorResponse = await getAuthor(authorId)

            setNovel(novelResponse.data)
            setAuthor(authorResponse.data)
            setLoading(false)
        }
        
        request(novelId)

    }, [novelId] )

    const purchase = async () => {
        const userId = getUserId()

        try{
            const response = await spendTicket(userId, episodeId, "TP")
            history.push(`/episode/${episodeId}`)
        }catch (error){
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
       
        }
    }

    return ( result === null || loading ? <Spinner animation='border'/> : 
                <Container>
                    <NovelInfo novel = {novel} author = {author}/>
                    <Row className = 'm-3 justify-content-center' style={{fontSize:'20px'}}>
                        보유 이용권
                    </Row>
                    <Row className = 'm-3'>
                        <Ticket novelId={novelId} hideCharge = {true} />
                    </Row>

                    {!episodeLoading && 
                        <>
                        <Row className='justify-content-center'>
                            <Col md={8}>
                                <EpisodeInfo episodeInfo={episode}/>
                            </Col>
                        </Row>

                        {result && <Button onClick={purchase}>에피소드 구매</Button>}
                        </>
                    }
                
                    
                    <Row  className = 'm-3 justify-content-center' style={{"fontSize" : "50px"}}>
                        {result ? "충전 성공" : errorMessage }
                    </Row>
                    
                                        
                </Container>
        );
}

export default TicketChargeResultPage;