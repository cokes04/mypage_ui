import { useEffect, useState } from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import style from '../css/components/NovelInfo.module.css'
import TmpImg from "../img/tmp2.png"
import heart1Img from "../img/heart1.png"
import heart2Img from "../img/heart2.png"
import { addFavorite, deleteFavorite } from '../apis/NovelApi'
import { genreInfo } from '../apis/mapper'
import { getUserId } from '../utils/AuthUtil'
import NineteenImg from '../img/nineteen.png'
import PayImg from '../img/u.png'
import FinishImg from '../img/finish.png'

const NovelInfo = ({novel, author, printReaderButton, isFavorite, ...props }) => { 
    const [favoriteCount, setFavoriteCount] = useState(novel.favoriteCount)
    const [favorite, setFavorite] = useState(isFavorite)

    const toggleFavorite = ( ) => {
        const userId = getUserId()

        if (!userId){
            alert("로그인이 필요합니다!")
            return
        }

        if(favorite){
            deleteFavorite( userId, novel.novelId ) 
            .then( (response) => {
                setFavoriteCount(favoriteCount-1)
                setFavorite(false)
            })
        }
        else {
            addFavorite( userId, novel.novelId )
            .then( (response) => {
                setFavoriteCount(favoriteCount+1)
                setFavorite(true)
            })
             
        }
    }

    const renderReaderButton = () =>{
        if (printReaderButton)
            return <>
                <Col md={1}>
                    <Image src= {favorite ? heart2Img : heart1Img}
                           onClick = { toggleFavorite }
                           fluid />
                </Col>
            </>
    }
    return (
        <Container>
            <Row className='justify-content-md-center m-3'>

                <Col md={2}>
                    <Link to={'/novel/' + novel.novelId} >
                        <Image fluid src={novel.thumbnailUrl ? novel.thumbnailUrl : TmpImg} style={{height:"160px", weigth:"50px"}}/>
                    </Link>
                </Col>

                <Col md={10}>

                    <Row className='justify-content-end mb-3'>
                        <Col md={9} className={`align-self-center text-start ${style['novel-title']}`}>
                            {!novel.free ? <Image  src = {PayImg} className='mx-1'
                                        style = {{height: "20px", weigth : "20px"}} /> : <></>}
                            {novel.ageGrade >= 19 ? <Image  src = {NineteenImg} className='mx-1'
                                    style = {{height: "20px", weigth : "20px"}} /> : <></>}

                            <Link to={`/novel/${novel.novelId}`}>{novel.title}</Link>

                            {novel.finish ? <Image  src = {FinishImg} className='mx-1'
                                        style = {{height: "20px", weigth : "20px"}} /> : <></>}

                        </Col>
                        <Col md={3} className={`align-self-center ${style['novel-author']}`}>
                            <Link to={`/author/${author.authorId}`} >{author.authorName}</Link>
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-start '>
                        <Col md={2} className="text-end">{`${novel.openEpisodeCount || 0} 회차`}</Col>
                        <Col md={2} className="text-end">{`열람 ${novel.readCount || 0}`}</Col>
                        <Col md={2} className="text-end">{`추천 ${novel.recommendationCount || 0}`}</Col> 
                        <Col md={2} className="text-end">{`선호 ${favoriteCount || 0}`}</Col> 
                    
                    {renderReaderButton()}
                    </Row>

                    <Row className='p-1 m-1'>
                        <Col md={6} className="text-start">장르&nbsp;{novel.genres && novel.genres.map( (item, index) => <span key = {index} className='mx-1'>{genreInfo.get(item)}</span>)}</Col>
                        { novel.serialCycles && novel.serialCycles.length === 0 ? <></> : 
                        <Col md={3} className="text-start">연재&nbsp;{novel.serialCycles.map( (item, index) => <span key = {index} className='mx-1'>{item}</span>)}</Col>     
                        }
                    </Row>

                    <Row>
                        <Form.Control disabled readOnly
                                    as="textarea"
                                    value={novel.description}
                                    style = {{  "height" : "100px",
                                                "border" : "none",
                                                "resize" : "none",
                                                "background" : "#FFFFFF",
                                                "fontSize" : "15px",
                                                "fontWeight" : "300",
                                                "color" : "#5a5a5a",
                                                "wordBreak":"break-all"}}/>
                    </Row>
                </Col>
            </Row>
        </Container>
        
    );
};

export default NovelInfo;