import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import NovelInfo from '../components/NovelInfo'
import {  getBuyTicketKinds } from '../apis/TicketApi'
import { getAuthor } from '../apis/Api'
import { spendCash } from '../apis/CashApi'
import { getNovel } from '../apis/NovelApi'
import { getUserId } from '../utils/AuthUtil'
import { Container, Button, Row, ListGroup, Form, Col } from 'react-bootstrap'
import Ticket from '../components/Ticket'
import { ynToBool } from '../apis/mapper'

const TicketChargePage = ({novelId, episodeId, ...props}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [novel, setNovel] = useState({})
    const [author, setAuthor] = useState({})

    const [ticketKindsList, setTicketKindsList] = useState([])

    const [selectedTicket, setSelectedTicket] = useState(undefined)
    const [ticketType, setTicketType] = useState('TP')

    const ticketTypeList = [ {text:"소장권", value : "TP"} ]


    useEffect( () => {
        const novelReqeust = async (novelId) => {
            let novelResponse = await getNovel(novelId)

            if (ynToBool(novelResponse.data.free)){
                 history.push("/")
                 alert("무료 소설은 이용권 충전이 불가능 합니다!")
             }
             else if(ynToBool(novelResponse.data.hidden)) {
                history.push("/")
                alert("비공개 소설은 이용권 충전이 불가능 합니다!")
             }

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

    useEffect( () => {
        const reqeust = async () => {
            let response = await getBuyTicketKinds()
            setTicketKindsList(response.data.ticketKindsList)
        }
        reqeust()
     }, [novelId] )

    const charge = async () => {
        try{
            const userId = getUserId()
            let response = await spendCash(userId, novel.novelId, selectedTicket.ticketKindsId, getPayout(selectedTicket.pay))
            
            history.push({
                pathname : "/ticket/charge/result",
                state : {
                    novelId : novel.novelId,
                    episodeId : episodeId,
                    useId : response.data.useId 
                }
            })
            

        } catch(error) {
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
        }
    }

    const getPayout = (payCount) => {
        return novel.ticketPrice * payCount
    }
    const renderTicketTypeList = () => {   
        return  <Row style={{fontSize:'20px'}} className='mt-5 mb-2 justify-content-center'>
                    {ticketTypeList.map( (item, index) => 
                            <Col md={2} key = {index} onClick = {() => setTicketType(item.value)}>
                                <Form.Check inline type='checkbox'>
                                    <Form.Check.Input   type='checkbox' 
                                                        checked = {ticketType === item.value ? true : false}/>
                                    <Form.Check.Label >{item.text}</Form.Check.Label>
                                </Form.Check>
                            </Col>)}
                </Row>
    }

    const renderTicketKindsList = () => {
        return <Row className='justify-content-center mb-4'>
                    <Col md={6}> 
                        <ListGroup>
                            {ticketKindsList.map( (t, index) => 
                                <ListGroup.Item key = {index} 
                                                className='d-flex justify-content-center'
                                                onClick = {() => setSelectedTicket(t)}>
                                    <Col>    
                                        <Form.Check type='radio' inline
                                                    checked = {selectedTicket === t ? true : false}/>
                                        {`${t.pay} ${t.free !== 0 ? `(+${t.free})` : ``}개`}
                                    </Col>
                                    <Col>
                                        {`${getPayout(t.pay)}캐시`}
                                    </Col>        
                                </ListGroup.Item> )}
                        </ListGroup>
                    </Col>
               </Row>
    }

    return ( loading ? <></> : 
                <Container>
                    <NovelInfo novel = {novel} author = {author}/>
                    <Row className = 'm-3 justify-content-center' style={{fontSize:'20px'}}>
                        보유 이용권
                    </Row>
                    <Row className = 'm-3'>
                        <Ticket novelId={novelId} hideCharge = {true} />
                    </Row>
                    
                    {renderTicketTypeList()}
                    {renderTicketKindsList()}
                                        
                    <Button type='button' onClick={charge}>
                        충전
                    </Button>
                </Container>
            );
}

export default TicketChargePage;