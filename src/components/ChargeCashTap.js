import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getChargeCashHistorys } from '../apis/CashApi';
import { paymentMethodInfo } from '../apis/mapper';
import {  getPaymentHistorysByIds } from '../apis/PaymentApi';
import { getUserId } from '../utils/AuthUtil';
import PageButtons from './PageButtons';

const ChargeCashTap = () => {

    const [paymentHistoryMap, setPaymentHistoryMap] = useState(new Map())
    const [chargeCashHistorys, setChargeCashHistorys] = useState([])
    const [pageInfo, setPageInfo] = useState({ page : 0,  size : 20,})
    const [totalPage, setTotalPage] = useState(0)

    const status = ["complete"]
    
    useEffect( () => {  
        const request = async () => {
            try{
                const userId = getUserId()
                let chargeCashHistorysResponse = await getChargeCashHistorys(userId, status, pageInfo)
                setChargeCashHistorys(chargeCashHistorysResponse.data.chargeHistoryList)
                setTotalPage(chargeCashHistorysResponse.data.totalPage)

                const payIdList = [... new Set(chargeCashHistorysResponse.data.chargeHistoryList.filter(ch => ch.payId != null).map( ch => ch.payId)) ]
                if(payIdList.length !== 0){
                    let paymentHistorysResponse = await getPaymentHistorysByIds(payIdList)
                    let map = new Map();
                    
                    if (paymentHistorysResponse.data.historyList){
                        for( let history of paymentHistorysResponse.data.historyList)
                            map.set(history.id, history)
                    }
                    else
                        map.set(paymentHistorysResponse.data.id, paymentHistorysResponse.data)
                    
                    setPaymentHistoryMap(map)
                }

            }catch (error){
                
            }
        }
        request()

    },[pageInfo])

    const itmes = () => {
        
        return chargeCashHistorys.map((cch, index) => {
            const pay = paymentHistoryMap.get(cch.payId)
            return <tr key = {index}>
                <td>{index}</td>
                <td>{cch.cashKinds}</td>
                <td>{pay ? pay.payout : "0"}</td>
                <td>{cch.paid + cch.free}</td>
                <td>{pay ? paymentMethodInfo.get(pay.method) : "-" }</td>
                <td>{cch.chargedDate}</td>
            </tr>
            }) 
    }

    const getPageButtons = () => {
        return <PageButtons printButtonCount = {5}
                            currentPage = {pageInfo.page} 
                            totalPage = {totalPage} 
                            setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />
    }

    return ( 
                <Container>
                    <Table >
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>충전 정보</th>
                            <th>결제 금액</th>
                            <th>충전 캐시</th>
                            <th>결제 수단</th>
                            <th>충전일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itmes()}
                        </tbody>
                    </Table>
                    
                    {getPageButtons()}
                </Container>
            );
}

export default ChargeCashTap;