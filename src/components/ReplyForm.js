import React, { useState } from 'react'
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap'
import { writeReply } from '../apis/ReplyApi'
import { getAccessToken, getUserId } from '../utils/AuthUtil'

const ReplyForm = ({episodeId, parentReplyId, reload, toggleIsWrite}) => {
    const [writingComment, setWritingComment] = useState("")

    const write = () => {
        try{
            const request = {
                episodeId : episodeId,
                parentReplyId : parentReplyId,
                comment : writingComment,
            } 

            const userId = getUserId()
            if (!userId || !getAccessToken()){
                alert("로그인 후 댓글을 작성해주세요!")
                return
            }

            let response = writeReply(userId, request)
            setWritingComment('')   
            if(toggleIsWrite)
                toggleIsWrite()
            reload()
            
        }catch(error){
            alert("댓글 작성에 실패 하였습니다. 다시 시도하여주세요.")
        }
    }

    return ( 
        <Container >
        <Row>
            <Col>
            <FormControl   as="textarea"
                            value={writingComment}
                            placeholder="댓글을 입력해주세요." 
                            onChange={(e) => setWritingComment(e.target.value)}
                            style = {{  height : "100px",
                                        background : "#F5F5F5",
                                        fontSize : "15px",
                                        resize: "none",
                                        fontWeight : "300"}}/>
            </Col>
            <Col md="auto" className="align-self-end">
                <Button variant="primary" onClick={write}>작성</Button>
            </Col>
        </Row>
    </Container>
            );
}

export default ReplyForm