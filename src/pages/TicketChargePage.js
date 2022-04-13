import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NovelInfo from '../components/NovelInfo'
import { chargeTicket, getBuyTicketKinds, getTicket } from '../apis/TicketApi'
import { getAuthor, getNovel } from '../apis/Api'
import { getUserId } from '../utils/AuthUtil'
import { Container, Button, Row, ListGroup, Form, Col } from 'react-bootstrap'
import Ticket from '../components/Ticket'

const TicketChargePage = ({novelId, ...props}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [novel, setNovel] = useState({})
    const [author, setAuthor] = useState({})

    const [ticketList, setTicketList] = useState([])

    const [ticket, setTicket] = useState(undefined)
    const [ticketType, setTicketType] = useState('TP')

    const ticketTypeList = [ {text:"소장권", value : "TP"} ]

    useEffect( async () => {
       let novelResponse = await getNovel(novelId)

       if (novelResponse.data.free === "y"  || novelResponse.data.hidden === "y"){
            history.push("/")
            alert("무료 소설은 이용권 충전이 불가능 합니다!")
        }
        let authorResponse = await getAuthor(novelResponse.data.authorId)


        setNovel(novelResponse.data)
        setAuthor(authorResponse.data)
        setLoading(false)
    }, [novelId] )

    useEffect( async () => {
        let response = await getBuyTicketKinds()
        setTicketList(response.data.ticketKindsList)
     }, [novelId] )

    const charge = async () => {
        try{

            let response = await chargeTicket(getUserId(), novel.novelId, ticket.ticketKindsId)
            alert('이용권 충전이 성공적으로 완료되었습니다')
            window.location.replace(`/novel/${novelId}`)

        } catch(error) {
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
        }
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

    const renderTicketList = () => {
        return <Row className='justify-content-center mb-4'>
                    <Col md={6}> 
                        <ListGroup>
                            {ticketList.map( (t, index) => 
                                <ListGroup.Item key = {index} 
                                                className='d-flex justify-content-center'
                                                onClick = {() => setTicket(t)}>
                                    <Col>    
                                        <Form.Check type='radio' inline
                                                    checked = {ticket === t ? true : false}/>
                                        {`${t.pay} ${t.free !== 0 ? `(+${t.free})` : ``}개`}
                                    </Col>
                                    <Col>
                                        {`${novel.ticketPrice * t.pay}캐시`}
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
                    {renderTicketList()}
                                        
                    <Button type='button' onClick={charge}>
                        충전
                    </Button>
                </Container>
            );
}

export default TicketChargePage;