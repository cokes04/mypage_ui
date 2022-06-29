import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ArrowImg from '../img/arrow.png'
import Reply from './Reply'

const ReplyTree = ({rootReply, reload}) => {

    const render = (replys, depth) => {
        // 자식 댓글은 오래된 순으로 정렬
        if(depth >= 1) replys.sort( (r1, r2) =>{
            if ( r1.createdDate < r2.createdDate) return -1
            if ( r1.createdDate > r2.createdDate) return 1
            if ( r1.createdDate == r2.createdDate) return 0
        } ) 

        return replys.map((r, index) => 
            <Container key = {index} style ={{marginLeft: `${3 * depth}px`}}>
                <Row className='pb-1 mb-3' style={{borderBottom : "1px solid #C0C0C0"}}>
                    {depth >= 1 &&
                    <Col md="auto">
                        <Image src={ArrowImg} style={{width:'15px', height:'10px'}}  /> 
                    </Col>}

                    <Col>
                        <Reply  reply={r} 
                                isRecommend = {r.isRecommend}
                                reload = {reload}
                                />
                    </Col>
                </Row>    
                {r.children && render(r.children, depth+1)}
            </Container>
        )
    }

    return (    <Container>
                    {render([rootReply], 0)}
                </Container>
            );
}

export default ReplyTree;