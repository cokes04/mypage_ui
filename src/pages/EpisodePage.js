import React, { useEffect, useState } from "react"
import { Col, Container, FormControl, Image, Offcanvas, Row, Spinner} from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { cancelRecommendEpisode, getEpisode, isRecommendedEpisode, recommendEpisode } from "../apis/EpisodeApi"
import good2Img from "../img/good2.png"
import good1Img from "../img/good1.png"
import { getUserId } from "../utils/AuthUtil"
import EpisodePurchase from "../components/EpisodePurchase"
import ReplyBox from "../components/ReplyBox"
import { ynToBool } from "../apis/mapper"

const EpisodePage = ({episodeId}) => {
    const history = useHistory()

    const [recommendationLoading, setRecommendationLoading] = useState(true)
    const [episodeLoading, setEpisodeLoading] = useState(true)

    const [episode, setEpisode] = useState({})
    const [recommendation, setRecommendation] = useState(false)
    
    const [needPurchase, setNeedPurchase]= useState(false)
    const [showReplys, setShowReplys] = useState(false)

    useEffect( () =>{
    const request = async () => {
            try{
                let response = await getEpisode(episodeId)
                setEpisode(response.data)
            
            }catch (error){
                try{
                    if(error.response.data.errors.filter( e => e.code === "010002").length === 1){
                        setNeedPurchase(true)

                    }else if(error.response.data.errors.filter( e => e.code === "010003").length === 1){
                        alert(error.response.data.errors.filter( e => e.code === "010003")[0]["message"])
                        history.push("/my_info")

                    }else{
                        alert(error.response.data.errors[0].message)
                        history.goBack()
                    }

                } catch(e){
                    alert("잠시 후 다시 시도해주세요!")
                    history.goBack()
                }
            }finally{
                setEpisodeLoading(false)
            }
        }
        request()
    }, [episodeId])

    useEffect(() => {
        const userId = getUserId()
        const request = async (userId) => {
            try{
                let isRecommededEpisodeResponse = await isRecommendedEpisode([episodeId], userId)
                setRecommendation( ynToBool(isRecommededEpisodeResponse.data[episodeId]) )
            }catch{

            }finally{
                setRecommendationLoading(false)
            }
        }
        
        if(userId)
            request(userId)
        else
            setRecommendationLoading(false)
    }, [episodeId])
    
    const toggleRecommendation = async () => {
        const userId = getUserId()

        if (!userId){
            alert("로그인이 필요합니다!")
            return
        }
        
        let request = undefined
        if(recommendation === true){
            request = () => cancelRecommendEpisode(userId, episodeId) 
            .then( (response) => {setRecommendation(false)})
        }
        else {
            request = () => recommendEpisode(userId, episodeId)
            .then( (response) => {setRecommendation(true)})
        }

        request()
        .catch((e) => {
            alert("잠시 후 다시 시도해주세요")
        })
    }

    const autoRows = (text) => {
        if (!text || text === null)  return 0

        const defaultLine = 5
        const newLine = (text.match(/\n/g) || []).length
        return defaultLine + newLine + text.length/104      
    }

    const replys = () => {
        return  <Offcanvas show={showReplys} onHide={() => setShowReplys(false)} style={{width: "75%" }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{`${episode.title} 댓글창`}</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <ReplyBox episodeId = {episodeId} authorId={episode.authorId}/>
                    </Offcanvas.Body>
                </Offcanvas>
    }

    const isLoading = () => {
        return episodeLoading || recommendationLoading
    }

    return(
            isLoading() ? <Spinner animation="border" /> : 
            needPurchase ? <EpisodePurchase id = {episodeId} /> :
            <Container className="justify-content-center mb-5">
                <Row className='my-5'
                     style = {{
                            fontWeight : 800,
                            fontSize : '25px',
                            overflow : 'hidden',
                            whiteSpace : 'nowrap',
                            textOverflow : 'ellipsis'}}>
                    {episode.title}
                </Row>

                <Row className = 'my-3'>
                    <FormControl as="textarea"
                                 disabled  plaintext
                                 rows = {autoRows(episode.mainText)}
                                 value={episode.mainText}
                                 style={{
                                    padding: '20px',
                                    border: 'none',
                                    fontSize : '20px',
                                    fontWeight : '500',
                                    backgroundColor: '#FFFFFF',
                                    resize : 'none',
                                    
                                    }}/>
                </Row>
                
                <Row className = 'my-3'>
                    {!episode.authorComment ? <></> :
                    <FormControl as="textarea"
                                 disabled plaintext
                                 rows = {autoRows(episode.authorComment)}
                                 value={episode.authorComment}
                                 style={{
                                        padding: '20px',
                                        border: '1px solid #A0A0A0',
                                        borderRadius : '13px',
                                        fontSize : '20px',
                                        fontWeight : '500',
                                        backgroundColor: '#FFFFFF',
                                        resize: 'none',
                                        }} />
                    }
                </Row>

                <Row>
                    <Col>
                        <Image  src = {recommendation ? good2Img : good1Img}
                                onClick = { toggleRecommendation }
                                style={{width : "35px", height : "35px"}} />
                    </Col>

                    <Col>
                        <p style={{fontSize:"30px", cursor:"Pointer"}} onClick={() => setShowReplys(true)}>댓글창</p>
                    </Col>
                    {replys()}
                </Row>
            </Container>
    );

}

export default EpisodePage;