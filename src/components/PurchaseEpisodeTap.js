import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getNovels } from '../apis/NovelApi'
import {getEpisodeInfoByIds, getEpisodePurchaseHistoryOfUser} from '../apis/EpisodeApi'
import { getUserId } from '../utils/AuthUtil'
import PageButtons from './PageButtons'

const PurchaseEpisodeTap = ({}) => {

    const [purchaseEpisodeHistorys, setPurchaseEpisodeHistorys] = useState([])
    const [episodeMap, setEpisodeMap] = useState(new Map())
    const [novelMap, setNovelMap] = useState(new Map())
    const [pageInfo, setPageInfo] = useState({ page : 0,  size : 20,})
    const [totalPage, setTotalPage] = useState(0)

    useEffect( () => {
        const reqeust = async (userId) => {
            let response = await getEpisodePurchaseHistoryOfUser(userId, pageInfo);
            setPurchaseEpisodeHistorys(response.data.historyList)
            setTotalPage(response.data.totalPage)
            setEpisodeMapAndNovelMapToResponse(response.data.historyList)
        }

        const userId = getUserId()
        reqeust(userId)
    }, [pageInfo])

    const setEpisodeMapAndNovelMapToResponse = async (historyList) => {
        const episodeIdList = [... new Set(historyList.filter(cth => cth.episodeId != null).map( ch => ch.episodeId)) ]
        let novelIdList = []
        if(episodeIdList.length !== 0){
            let episodeResponse = await getEpisodeInfoByIds(episodeIdList)
            let map = new Map();
            
            if (episodeResponse.data.episodeList){
                for( let episode of episodeResponse.data.episodeList){
                    map.set(episode.episodeId, episode)
                    novelIdList.push(episode.novelId)
                }
            }
            else{
                map.set(episodeResponse.data.episodeId, episodeResponse.data)
                novelIdList.push(episodeResponse.data.novelId)
            }
            setEpisodeMap(map)
            setNovelMapToResponse([... new Set(novelIdList)])

        }
    }

    const setNovelMapToResponse = async (novelIdList) => {
        if(novelIdList.length !== 0){
            let novelResponse = await getNovels(novelIdList)
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

    const renderPossOrRental = (rental) => {
        if(rental == "n")
            return "소장"
        else if(rental == "y")
            return "대여"
        else 
            return "-"    
    }
    const items = () => {
        return purchaseEpisodeHistorys.map ( (peh, index) => {
            const episode = episodeMap.get(peh.episodeId) 
            const novel = episode && novelMap.get(episode.novelId)
            
            return <tr key = {index}>
                        <td>{index}</td>
                        <td>{novel ? <Link to = {`/novel/${novel.novelId}`}>{novel.title} </Link>   
                            : "-"}</td>
                        <td>{episode ? <Link to = {`/episode/${episode.episodeId}`}>{episode.title}</Link> 
                            : "-"}
                        </td>
                        <td>{renderPossOrRental(peh.rental)}</td>
                        <td>{peh.purchasedDate}</td>
                    </tr>})
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
                    <th>제목</th>
                    <th>소장/대여</th>
                    <th>사용일</th>
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

export default PurchaseEpisodeTap;