import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Form, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAuthor } from '../apis/Api'
import { getNovelsOfAuthor } from '../apis/NovelApi'
import TmpImg from '../img/tmp.png'

const AuthorPage = ({id}) => {

    const [loading, setLoading] = useState(true)

    const [author, setAuthor] = useState({})
    const [novelList, setNovelList] = useState([])

    const [pageInfo, setPageInfo] = useState({  page : 0,
                                                size : 10,
                                                sort : 'newest_create'
                                            })
    useEffect( () => {
        getAuthor(id)
        .then( response => {
            setAuthor(response.data)
            setLoading(false)
        })
        .catch( error => {
            if(error.response.data.errors)
            alert(error.response.data.errors[0].message)
        else 
            alert("잠시 후 다시 시도해주세요!")
        })
    }, [])

    useEffect( () => {
        getNovelsOfAuthor(id, pageInfo)
        .then( response => {
            setNovelList(response.data.novelList)
            setLoading(false)
        })
        .catch( error => {
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("잠시 후 다시 시도해주세요!")
            }
        })
    }, [])

    const renderNovelList = () => {
        return novelList && novelList.map( (novel, index) =>
            <Row className='m-1 mb-2' 
                key = {index}
                style={ { borderBottom : "5px solid #F0F0F0"} } >
                
                <Col md="auto">
                    <Link to={'/novel/' + novel.novelId} >
                        <Image src={TmpImg} style = {{  height: "40px",
                                                        width : "40px"}}/>
                    </Link>
                </Col>

                <Col md={9} >
                    <Row className='text-start' style={{   display:"block", overflow : "hidden", textOverflow: "ellipsis",whiteSpace:"nowrap", }} >
                        <Link to={'/novel/' + novel.novelId}> {novel.title } </Link>
                    </Row>
                    <Row className='text-start px-3' style={{   display:"block", overflow : "hidden", textOverflow : "ellipsis", whiteSpace:"nowrap",
                                                                fontSize : "10px", color : "#A0A0A0" }}>
                        {novel.description}
                    </Row>
                </Col>
            </Row>
        );
    }

    return ( loading ? <Spinner animation='border' /> :
                <Container className='d-flex justify-content-center my-3' style={{border : "3px solid #F0F0F0", borderRadius:"10px"}}>
                    <Col md={7} className = 'my-2 p-2'>
                        <Row className = "mb-2 justify-content-center">
                            작가 정보
                        </Row>
                        <Row className = 'p-3 m-1' style={{border : "3px solid #F0F0F0", borderRadius:"10px"}}>
                            <InputGroup>
                                <InputGroup.Text>필명</InputGroup.Text>
                                <FormControl type="text" disabled value={author.authorName} />
                            </InputGroup>

                            <InputGroup>
                                <InputGroup.Text>소개</InputGroup.Text>
                                <FormControl as="textarea" disabled value={author.aboutAuthor} rows={10} style={{resize : "none"}} />
                            </InputGroup>      
                        </Row>

                    </Col>
                    <Col md={5} className = 'my-2 p-2'>
                        <Row  className = "mb-2 justify-content-center">
                            소설 목록
                        </Row>
                        <Row className = 'p-3 m-1' style={{border : "3px solid #F0F0F0", borderRadius:"10px"}}>
                            {renderNovelList()}
                        </Row>
                    </Col>
                    
                </Container>
            );
}

export default AuthorPage;