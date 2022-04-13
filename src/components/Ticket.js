import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTicket } from "../apis/TicketApi";
import { getUserId } from "../utils/AuthUtil";

const Ticket = ({novelId, hideCharge}) => {

    const [possessionCount, setPossessionCount] = useState(0);
    const [rentCount, setRentCount] = useState(0);

    useEffect( async () => {
        let response = await getTicket( getUserId(), novelId)

        const amount = response.data.amountInfo
        setRentCount(amount.remainsRentalFree + amount.remainsRentalPaid)
        setPossessionCount(amount.remainsPossessionFree + amount.remainsPossessionPaid)

    },[novelId] );

    return(
        <Container  className="d-flex" 
                    style={{ border :"1px solid #CED4DA", borderRadius : "10px", fontSize:"20px"}}>
            <Col md={11} >
                <Row>
                    <Col>대여권</Col>  
                    <Col>소장권</Col>
                </Row>
                <Row>
                    <Col>{rentCount}</Col>
                    <Col>{possessionCount}</Col>
                </Row>
            </Col>

            { hideCharge ? <></> :

            <Col md={1} className="align-self-center">
                <Link to = {{
                    pathname : '/ticket/charge',
                    search : "?novelId=" + novelId}}>
                    충전
                </Link>
            </Col>
            }
        </Container>
    ); 
}

export default Ticket;