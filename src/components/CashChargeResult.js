import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { paymentMethodInfo } from '../apis/mapper';


const CashChargeResult = ({payReuslt, payCashKinds}) => {

    useEffect( () => {
        console.log(payReuslt, payCashKinds)
    })

    const close = () => {
        window.close()
    }

    return (payCashKinds === 0 ?
            <Container className='justify-content-center'> 결제 실패</Container> :
    
            <Container className='border rounded-3'>
                <Row className='justify-content-center mb-3'>
                    충전 결과
                </Row>

                <Row className='my-2'>
                        <Col>
                            <Row className='justify-content-center'>충전 캐시</Row>
                            <Row className='justify-content-center'>{payCashKinds.pay}</Row>
                        </Col>
                        <Col>
                            <Row className='justify-content-center'>추가 캐시</Row>
                            <Row className='justify-content-center'>{payCashKinds.free}</Row>
                        </Col>
                        <Col>
                            <Row className='justify-content-center'>최종 캐시</Row>
                            <Row className='justify-content-center'>{payCashKinds.free + payCashKinds.pay}</Row>
                        </Col>
                 </Row>

                <Row className='justify-content-center'>
                    결제 수단 {paymentMethodInfo.get(payReuslt.paymentMethod)}
                </Row>
                <Row className='justify-content-center'>
                    결제 금액 {payReuslt.payout}
                </Row>
                <Row>
                    <Button type='button' onClick={close}>창 닫기</Button>
                </Row>
            </Container>
            );
}

export default CashChargeResult;