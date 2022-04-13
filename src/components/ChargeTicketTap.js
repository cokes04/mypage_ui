import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getNovelsByIds } from '../apis/Api';
import { getChargeTicketHistorys } from '../apis/TicketApi';
import { getUserId } from '../utils/AuthUtil';
import PageButtons from './PageButtons';

const ChargeTicketTap = ({}) => {

    const [chargeTikcetHistorys, setChargeTikcetHistorys] = useState([])

    const [novelMap, setNovelMap] = useState(new Map())

    const [pageInfo, setPageInfo] = useState({ page : 0,  size : 20,})
    const [totalPage, setTotalPage] = useState(0)
    

    useEffect( async () => {
        try{
            const userId = getUserId()
            let chargeTikcetHistoryResponse = await getChargeTicketHistorys(userId, pageInfo)
            setChargeTikcetHistorys(chargeTikcetHistoryResponse.data.historyList)
            setTotalPage(chargeTikcetHistoryResponse.data.totalPage)
            setNovelMapToResponse(chargeTikcetHistoryResponse.data.historyList)
        } catch (e) {
            
        }
    }, [pageInfo])

    const setNovelMapToResponse = async (historyList) => {
        const novelIdList = [... new Set(historyList.filter(cth => cth.novelId != null).map( ch => ch.novelId)) ]
        if(novelIdList.length !== 0){
            let novelResponse = await getNovelsByIds(novelIdList)
            let map = new Map();
            
            if (novelResponse.data.novelList){
                for( let novel of novelResponse.data.novelList)
                    map.set(novel.novelId, novel)
            }
            else
                map.set(novelResponse.data.novelId, novelResponse.data)

            setNovelMap(map)
        }
    }

    const renderTicketType = (ticketType) => {
        if (ticketType == "TP") 
            return "소장"
        else if (ticketType = "TR")
            return "대여"
        else 
            return "-"
    }
    const items = () => {
        return chargeTikcetHistorys.map ( (cth, index) => 
        <tr key = {index}>
            <td>{index}</td>
            <td>{novelMap.get(cth.novelId) ? <Link to = {`/novel/${novelMap.get(cth.novelId).novelId}`}> {novelMap.get(cth.novelId).title} </Link>: "-"}</td>
            <td>{renderTicketType(cth.ticketType)}</td>
            <td>{cth.paid + cth.free}</td>
            <td>{cth.usedCash}</td>
            <td>{cth.chargedDate}</td>
        </tr>)
    }
    const getPageButtons = () => {
        return <PageButtons printButtonCount = {5}
                            currentPage = {pageInfo.page} 
                            totalPage = {totalPage} 
                            setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />
    }

    return ( 
                <Container>
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>작품 명</th>
                            <th>소장/대여</th>
                            <th>이용권 갯수</th>
                            <th>사용 캐시</th>
                            <th>구매일</th>
                            </tr>
                        </thead>
                        <tbody>
                           {items()}
                        </tbody>
                    </Table>
                    {getPageButtons()}
                </Container>
            );
}

export default ChargeTicketTap;