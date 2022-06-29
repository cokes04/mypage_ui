import React, { useState } from 'react'
import { Container, Spinner, Tab, Tabs } from 'react-bootstrap'
import ChargeCashTap from '../components/ChargeCashTap'
import ChargeTicketTap from '../components/ChargeTicketTap'
import PurchaseEpisodeTap from '../components/PurchaseEpisodeTap'

const UsageHistoryPage = ({}) => {
    const [loading, setLoading] = useState(false)

    const [key, setKey] = useState('chargeCash')

    return ( loading ? <Spinner animation = 'border' /> :
                <Container>
                    <Tabs   className="m-3"
                            activeKey={key} 
                            onSelect={setKey} >
                        <Tab eventKey="chargeCash" title="캐시 충전 내역">
                            {key === "chargeCash" ? <ChargeCashTap /> : <></>}
                        </Tab>
                        <Tab eventKey="chargeTicket" title="이용권 구매 내역">
                            {key === "chargeTicket" ? <ChargeTicketTap /> : <></>}
                        </Tab>
                        <Tab eventKey="useTikcet" title="작품 구매 내역">
                            {key === "useTikcet" ? <PurchaseEpisodeTap /> : <></>}
                        </Tab>
                    </Tabs>
                </Container>
            );
}

export default UsageHistoryPage;