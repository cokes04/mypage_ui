import React, { useEffect, useState } from 'react'
import { Col, Container, FormControl, Image, Row } from 'react-bootstrap'
import { recommendReply } from '../apis/ReplyApi'
import good2Img from "../img/good2.png"
import good1Img from "../img/good1.png"
import {getUserId} from "../utils/AuthUtil"
import { Link } from 'react-router-dom'
import ReplyForm from './ReplyForm'

const Reply = ({reply, reload}) => {
    const [recommendation, setRecommendation] = useState(reply.isRecommend)
    const [isWrite, setIsWrite] = useState(false)

    const toggleRecommend = async () => {
        
        try{
            const userId = getUserId()
            if(!userId) return

            await recommendReply(reply.replyId, userId, !recommendation)
            reply.recommendationCount += !recommendation ? 1 : -1
            setRecommendation(!recommendation)
        }catch(error) {
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("알 수 없는 원인으로 등록에 실패하였습니다.")
            }
        }
    }

    const toggleIsWrite = () => {
        setIsWrite(!isWrite)
    }

    return ( 
                <Container>
                    <Row style={{fontSize : "15px", fontWeight : "550"}} >
                        <Link to={reply.author ? `/author/${reply.author.authorId}` : `/reader/${reply.reader.readerId}`}>
                            {reply.author ? 
                            <>
                                <span style={{color:"#1E82FF"}}>{'작가 '}</span>
                                <span>{reply.author.authorName}</span>
                            </>
                             : <>{reply.reader.readerName}</>}
                            
                            <span style={{fontSize:"12px", color:"#B0B0B0"}}>
                                {` (${reply.reader.readerId})`}
                            </span>
                        </Link>
                    </Row>
                    <Row >
                        <FormControl    as="textarea"
                                        value={reply.comment}
                                        readOnly
                                        style = {{  maxHeight : "5000px",
                                                    background : "#FFFFFF",
                                                    fontSize : "20px",
                                                    fontWeight : "300",
                                                    resize : "none",
                                                    border : "none",
                                                    wordBreak:"break-all"}}/>
                    </Row>
                    <Row className="justify-content-end">
                        <Col>
                            {reply.createdDate}
                        </Col>
                        
                        <Col md="auto" >
                            추천
                            <span>
                                {reply.recommendationCount}
                            </span>
                            <Image  src = {recommendation ? good2Img : good1Img}
                                onClick = {toggleRecommend}
                                style={{width : "20px", height : "20px", cursor:"pointer"}} />
                        </Col>
        
                         <Col md="auto" onClick={toggleIsWrite} style={{cursor:"pointer"}}>
                            답글
                         </Col>
                    </Row>
                    {!isWrite ? <></> : 
                    <Row>
                        <ReplyForm  episodeId = {reply.episodeId}
                                    parentReplyId = {reply.replyId}
                                    reload = {reload}
                                    toggleIsWrite = {toggleIsWrite} />    
                    </Row>
                    }

                </Container>
            );
}

export default Reply;