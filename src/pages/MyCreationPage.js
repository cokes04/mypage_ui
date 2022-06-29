import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NovelInfo from '../components/NovelInfo';
import PageButtons from '../components/PageButtons';
import { getNovelsOfAuthor } from '../apis/NovelApi';
import { getUserId } from '../utils/AuthUtil';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

const MyCreationPage = ({...props}) => {
    const [loading, setLoading] = useState(true)
    const [pageInfo, setPageInfo] = useState({ 
        page : 0,
        size : 10,
        sort : 'newest_create'
    })

    const [novelList, setNovelList] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    useEffect( () =>{
        const request = async (userId, pageInfo) => {
            let novelResponse = await getNovelsOfAuthor(userId, pageInfo)

            setTotalCount(novelResponse.data.totalCount)
            setTotalPage(novelResponse.data.totalPage)
            setNovelList(novelResponse.data.novelList)
            setLoading(false)
        }
        const userId = getUserId()
        request(userId, pageInfo)
    }, [pageInfo]); 


    const novelInfos = () => {
        return novelList.map( (novel, index) => 
            <Row key = {index}>
                <Col md={10}><NovelInfo novel = {novel} author={{}}/> </Col>

                <Col md={2} className='p-4 align-self-start'>
                    <Row>
                        <Link to={'/my_creation/write/' + novel.novelId} style={{fontSize : "30px"}}>
                            글쓰기
                        </Link>
                    </Row>
                    <Row>
                        <Link to={'/my_creation/manage/' + novel.novelId} style={{fontSize : "30px"}}>
                            작품 관리
                        </Link>
                    </Row>
                </Col>
            </Row>
        );
    }


    return ( loading ? <Spinner animation='border'/> :
        <Container>
            
            <Row className='m-4 justify-content-center'>
                <Col>
                    <Link to = '/my_creation/register'  style={{fontSize : "50px"}}>
                        작품 등록
                    </Link>  
                </Col>
                <Col>
                    <Link to = '/my_creation/settlement'  style={{fontSize : "50px"}}>
                        정산관리
                    </Link> 
                </Col>
                 
            </Row>

            {totalCount === 0 ? <p>등록된 작품이 없습니다.</p> : novelInfos()}

            <PageButtons    printButtonCount={3}
                            currentPage = {pageInfo.page}
                            totalPage = {totalPage}
                            setPage = { (newPage) => setPageInfo({...pageInfo, page : newPage})} />
            
        </Container>
            );
}

export default MyCreationPage;