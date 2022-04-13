import React, { useEffect, useState } from "react"
import { Col, Container, FormControl, Image, Row, Spinner } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { cancelRecommendEpisode, getEpisode, recommendEpisode } from "../apis/Api"
import good2Img from "../img/good2.png"
import good1Img from "../img/good1.png"
import { getUserId } from "../utils/AuthUtil"
import EpisodePurchase from "../components/EpisodePurchase"


const EpisodePage = ({id}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    const [episode, setEpisode] = useState({})
    const [recommendation, setRecommendation] = useState(false)
    const [needPurchase, setNeedPurchase]= useState(false)

    useEffect( async () => {
        try{
            let response = await getEpisode(id)
            setEpisode(response.data)
            setRecommendation(response.data.recommendation)
            setLoading(false)
        }catch (error){
            if(error.response.data.errors){
                if(error.response.data.errors.filter( e => e.code == "010002") ){
                    setNeedPurchase(true)
                    setLoading(false)
                } else{
                    alert(error.response.data.errors[0].message)
                    history.goBack()
                }
            } else {
                alert("잠시 후 다시 시도해주세요!")
                history.goBack()
            }
        }
    },[id])

    const toggleRecommendation = () => {
        const userId = getUserId()

        if (!userId){
            alert("로그인이 필요합니다!")
            return
        }

        if(recommendation === "y"){
            cancelRecommendEpisode(userId, id) 
            .then( (response) => {
                setRecommendation("n")
            })
        }
        else {
            recommendEpisode(userId, id)
            .then( (response) => {
                setRecommendation("y")
            })
         
        }
    }

    const autoRows = (text) => {
        if (!text || text === null)  return 0

        const defaultLine = 5
        const newLine = (text.match(/\n/g) || []).length
        return defaultLine + newLine + text.length/104      
    }

    return(
            loading ? <Spinner animation="border"/> : 
            needPurchase ? <EpisodePurchase id = {id} /> :
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
                        <Image  src = {recommendation === "y" ? good2Img : good1Img}
                                onClick = { toggleRecommendation }
                                style={{width : "25px", height : "25px"}} />
                    </Col>
                    <Col>
                        댓글창 공사중
                    </Col>
                </Row>
            </Container>
    );

}

export default EpisodePage;