import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { readyKakaoPay } from '../apis/PaymentApi'
import { getBuyCashKinds } from '../apis/CashApi';

const CashChargePage = ({...props}) => {

    useEffect( () => {
        window.success = () => {
            window.location.assign('/')
            }

        window.failure = () => {
            window.location.reload()
        }
    }, [])

    const [cashList, setCashList] = useState([]);
    const [paymentMethodList, setPaymentMethodList] = useState([
        {id : 1, name : "카카오페이", request : readyKakaoPay },
    ]);

    const [cash, setCash] = useState({})
    const [paymentMethod, setPaymentMethod] = useState(paymentMethodList[0])
    const [tid, setTid]  = useState(undefined)

    useEffect( async () => {
        let response = await getBuyCashKinds()
        setCashList(response.data.cashKindsList)
    }, [])

    const charge = () => {
        if( Object.keys(cash).length === 0 || !cash ||
            Object.keys(paymentMethod).length === 0 || !paymentMethod ){
            alert("결제 금액 및 결제 수단을 선택해주세요")
            return
        }

        paymentMethod.request(cash.cashKindsId, "cash")
            .then( (response) => {
                setTid(response.data.tid)
                window.open( response.data.redirectUrl, "_blank", "channelmode=no,height=600,width=500,", true)
            })
            .catch( (error) => {
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("잠시 후 다시 시도해주세요!")
                }
            } )
            
    }

    const renderCashList = () => {
        return <ListGroup>
                    {cashList.map( (c, index) => 
                    <ListGroup.Item key = {index} onClick = {() => setCash(c)} >
                        <Form.Check type='radio'
                                    checked = {cash === c ? true : false}
                                    onChange = {() => setCash(c)}
                                    label = {`${c.pay} ${c.free !== 0 ? `(+${c.free})` : ``} 캐시`}
                                    inline />
                    </ListGroup.Item> )}
               </ListGroup>
    }

    const renderPaymentMethodList = () => {
        return <ListGroup horizontal>
                    {paymentMethodList.map((p, index) =>
                    <ListGroup.Item key = {index}>
                        <Form.Check type='radio'
                                    checked = {paymentMethod === p ? true : false}
                                    onChange = {() => setPaymentMethod(p)}
                                    label = {p.name}
                                    inline />
                    </ListGroup.Item>  )}      
               </ListGroup>
    }

    return (    
                <Container className='my-3'>
                    <Row md='auto' className='my-3 justify-content-center' style={{"fontSize" : "20px"}}>
                        캐시 충전
                    </Row>

                    <Row md='auto' className='justify-content-center'>
                        {renderCashList()}
                    </Row>

                    <Row md='auto' className='my-2 justify-content-center'>
                        {renderPaymentMethodList()}
                    </Row>

                    <Row md='auto' className='my-2 justify-content-center' style={{border : "2px solid #E0E0E0"}}>
                        <Col>충전 캐시 {cash.pay || 0}</Col>
                        <span>+</span>
                        <Col>추가 캐시 {cash && cash.free || 0}</Col>
                        <span>=</span> 
                        <Col>최종 캐시 {( cash.free + cash.pay )  || 0}</Col>
                    </Row>

                    <Row md='auto' className='justify-content-center'>
                        <Col className='align-self-center'>
                            <span> 결제 금액 {cash.payOut || 0}원</span>
                        </Col>
                        <Col>
                            <Button onClick = {charge}>충전</Button>
                        </Col>        
                    </Row>
                    <Row>
                    <span style={{"color":"#B0B0B0"}}>테스트 결제하기 확인! (실결제 아님)</span>
                    </Row>
                    <Form.Control type='text' hidden = {true} id="tid"  value = {tid}/>
                </Container>
            );
}

export default CashChargePage;