import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getEpisodeInfosInOfNovel } from '../apis/Api';
import EpisodeInfo from './EpisodeInfo';
import PageButtons from './PageButtons';
import style from '../css/components/EpisodeInfoList.module.css';
import {Container, Row, InputGroup, ListGroup, Form, Col} from 'react-bootstrap';

const EpisodeInfoList = ({novelId, ...props}) => {

    const history = useHistory()
    const [printNotification, setPrintNotification] = useState(true)
    const [notificationList, setNotificationList] = useState([])
    const [episodeList, setEpisodeList] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const [pageInfo, setPageInfo] = useState({ 
        page : 0,
        size : 20,
        sort : 'newest_create'
     })

    useEffect( () => {
        getEpisodeInfoList()
    }, [novelId, pageInfo])

    const togglePrintNotification = () => {
        setPrintNotification(!printNotification)
    }

     const getEpisodeInfoList = () => {
        getEpisodeInfosInOfNovel(novelId, pageInfo)
            .then( (response) => {

                let itemList = response.data.episodeList
                
                let notificationList = []
                let episodeList = []

                itemList.map( (item) => {
                    item.adult = item.adult === "y" ? true : false;
                    item.free = item.free === "y" ? true : false
                    item.hidden = item.hidden === "y" ? true : false
                })

                for(let item of itemList){
                    if(item.category === "notice")
                        notificationList.push(item)
                    else
                        episodeList.push(item)
                }
                setNotificationList(notificationList)
                setEpisodeList(episodeList)
                setTotalCount(response.data.totalCount)
                setTotalPage(response.data.totalPage)
            })
            .catch( (error) => {

            });
    }

    const renderNotificationList = () => {
        if(!printNotification) return <></>
        
        const create_date_asc = (a, b) => { 
            console.log(new Date(a.createdDate), new Date(b.createdDate), new Date(a.createdDate) < new Date(b.createdDate))
            return new Date(a.createdDate) < new Date(b.createdDate)
        }

        return  <ListGroup as="ul">{ 
                        notificationList.sort(create_date_asc).map( (item, index) =><ListGroup.Item key = {index} as='li' className='p-1 px-4'>
                                                                <EpisodeInfo episodeInfo = {item}/>
                                                              </ListGroup.Item>)
                }</ListGroup>
    }

    const renderEpisodeInfoList = () => {
        return  <ListGroup as="ul">{ 
                        episodeList.map( (item, index) =><ListGroup.Item key = {index} as='li' className='p-1 px-4'>
                                                            <EpisodeInfo episodeInfo = {item}/>
                                                         </ListGroup.Item>)
                }</ListGroup>
    }

    return (
                <Container className='w-75'>
                    <Row>
                        <Col md={3} className='d-flex justify-content-start align-self-center'>
                            <Col md={2}>
                                <span>공지</span>
                            </Col>
                            <Col md={4}>
                                <Form.Check md={3} type="switch" 
                                            checked = {printNotification}
                                            onChange = {togglePrintNotification}/>
                            </Col>
                        </Col>
                        <Col md={9} className="py-1">
                            <InputGroup>
                                <InputGroup.Text>정렬</InputGroup.Text>
                                <Form.Select value = {pageInfo.sort}  onChange = {(e) => setPageInfo( {...pageInfo, sort : e.target.value})} >
                                    <option value="newest_create">최신화 부터</option>
                                    <option value="oldest_create">첫화 부터</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
 
                    {renderNotificationList()}
                    {renderEpisodeInfoList()}

                    <Container className="d-flex justify-content-center"> 
                        <PageButtons printButtonCount = {3}
                                     currentPage = {pageInfo.page} 
                                     totalPage = {totalPage} 
                                     setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />
                    </Container>

                </Container>
    );
}

export default EpisodeInfoList;