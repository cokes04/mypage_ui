import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { getChildReply, getEpisodeReply, getIsRecommendReply, } from '../apis/ReplyApi'
import ReplyForm from "./ReplyForm"
import PageButtons from "./PageButtons"
import { getReaders } from '../apis/UserApi'
import { getAuthor } from '../apis/Api'
import {ynToBool} from "../apis/mapper"
import { getUserId } from '../utils/AuthUtil'
import ReplyTree from './ReplyTree'

const ReplyBox = ({episodeId, authorId}) => {
    const [loading, setLoading] = useState(true)

    const [errorMessage, setErrorMessage] = useState(undefined)
    const [pageInfo, setPageInfo] = useState({
        page : 0,
        size : 20,
        sort : "newest_create",
    })

    const [totalCount, setTotalCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [replys,  setReplys] = useState([])

    useEffect( () => {
        getReplys() 
    }, [])

    const getReplys = async () =>{ 
        let rootReplyResponse
        let childReplyResponse
        try{
            rootReplyResponse = await getRootReplys()
            rootReplyResponse = rootReplyResponse.data

            const rootReplyIdList = [... new Set(rootReplyResponse.replyList.map( r => r.replyId)) ]
            if (rootReplyIdList.length != 0)
                childReplyResponse = await getChildReplys(rootReplyIdList)
                childReplyResponse = childReplyResponse.data
        }catch{
            setLoading(false)
            return
        }  

        const rootReplyIdList = [... new Set(rootReplyResponse.replyList.map( r => r.replyId)) ]
        const childReplyIdList = childReplyResponse ? [ ... new Set(childReplyResponse.replyList.map( r => r.replyId)) ] : []
        let replyIdList = [... new Set([...rootReplyIdList, ...childReplyIdList ])]


        const rootReplyUserIdList = [... new Set(rootReplyResponse.replyList.map( r => r.userId)) ]
        const childReplyUserIdList = childReplyResponse ? [ ... new Set(childReplyResponse.replyList.map( r => r.userId)) ] : []
        let userIdList = [... new Set([...rootReplyUserIdList, ...childReplyUserIdList ])]

        let author = false
        if (userIdList.find(i => i === authorId))
            author = await getAuthorInfo()

        const readerMap = await getReaderMap(userIdList)
        const isRecommendMap = await getIsRecommendMap(replyIdList)
        
        console.log(readerMap)
        console.log(isRecommendMap)
        
        const reply_tree = getReplyTree(rootReplyResponse.replyList, childReplyResponse.replyList, readerMap, isRecommendMap, author)
        setReplys(reply_tree)


        setLoading(false)
    }
    const getAuthorInfo = async () => {
        try{
            const authorResponse = await getAuthor(authorId)
            return authorResponse.data
        }catch (error){
            return false
         }
    }

    const getRootReplys = async() => {
        try{
            const rootReplyResponse = await getEpisodeReply(episodeId, true, pageInfo)
        
            setTotalCount(rootReplyResponse.data.totalCount)
            setTotalPage(rootReplyResponse.data.totalPage)

            return rootReplyResponse
        }catch (error){
            try{
                setErrorMessage(error.response.data.errors[0].message)
            } catch(error1){
                setErrorMessage("댓글을 불러 올 수 없습니다")
            }
        }
    }

    const getChildReplys = async (rootReplyIdList) => {
        try{
            return await getChildReply(rootReplyIdList, true) 
        }catch (error){
            try{
                setErrorMessage(error.response.data.errors[0].message)
            } catch(error1){
                setErrorMessage("댓글을 불러 올 수 없습니다")
            }
        }

    }
    const getReplyTree = (rootReplyList, childReplyList, readerMap, isRecommendMap, author) => {
        let map = new Map()
        for (let cr of childReplyList){
            cr.reader = readerMap.get(cr.userId)
            cr.isRecommend = isRecommendMap.get(cr.replyId)
            
            if (cr.userId === authorId)
                cr.author = author

            let value = map.get(cr.parentReplyId)
            if (!value)
                map.set(cr.parentReplyId, [cr])
            else{
                value.push(cr)
                map.set(cr.parentReplyId, value)
        }}
        
        for (let rr of rootReplyList){
            rr.reader = readerMap.get(rr.userId)
            rr.isRecommend = isRecommendMap.get(rr.replyId)

            if (rr.userId === authorId)
                rr.author = author

            if (!map.get(rr.replyId)) continue
            addChildren(map, rr)
            }
        
        return rootReplyList
    }

    const addChildren = (map, parentReply) => {
        parentReply.children = []
        let crs = map.get(parentReply.replyId)
        if(!crs) return
        for (let cr of crs){
            parentReply.children.push(cr)
            addChildren(map, cr)
        }
    }
    
    const getReaderMap = async (readerIds) => {
        try{
            if(readerIds.length !== 0){
                let readerListResponse = await getReaders(readerIds)
                let readerMap;

                if (readerListResponse.data.readerList){
                    const readerList = readerListResponse.data.readerList.map( r => [Number(r.readerId), r]);
                    readerMap = new Map(readerList)
                }
                else
                    readerMap = new Map([
                        [Number(readerListResponse.data.readerId), readerListResponse.data]
                    ])
            
                return readerMap
            }

        }catch(err){
            return new Map()
        }
    }

    const getIsRecommendMap = async (replyIdList) => {
        try{
            const userId = getUserId()
            if(replyIdList.length !== 0){
                let isRecommendResponse = await getIsRecommendReply(replyIdList, userId)
                const reco = Object.entries(isRecommendResponse.data).map(([k, v]) => [Number(k), ynToBool(v)])
                return new Map(reco)
            }

        }catch(err){ 
            return new Map()
         }
    }

    const reload = async () => {
         getReplys()    
    }

    const renderReplys = (replys) => {
        return replys.map((rr, index) => 
            <Container key = {index}>
                <ReplyTree rootReply = {rr} reload = {reload}/>
            </Container>
        )
    }

    return (  loading ? <Spinner animation='border' /> :
                <Container>
                    {errorMessage ? <p style={{fontSize:"30px"}}>{errorMessage}</p> : 
                    <>
                        <Row className="mb-5">
                            <ReplyForm  episodeId = {episodeId} parentReplyId = {undefined}  reload = {reload}/>
                        </Row>
                        
                        {totalCount == 0 ? <></> : 
                        <Container className = 'p-5'>
                            {renderReplys(replys)}
                        </Container>
                        }
                        <PageButtons currentPage = {pageInfo.page} 
                                    totalPage = {totalPage} 
                                    setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />
                    </>
                    }    
                </Container>
            );
}

export default ReplyBox;