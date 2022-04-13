import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import {ko} from "date-fns/esm/locale"
import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap"

const EpisodeForm = ({onsubmit, submitBtnName, freeNovel, episode}) => {
    
    const [title, setTitle] = useState('')
    const [mainText, setMainText] = useState('')
    const [authorComment, setAuthorComment] = useState('')
    const [category, setCategory] = useState('episode')
    const [adult ,setAdult] = useState("n")
    const [free, setFree] = useState("y")

    const [openLevel, setOpenLevel] = useState("now")
    const [openDate, setOpenDate] = useState(new Date())
    const [openHours, setOpenHours] = useState(openDate.getHours())
    const [openMinutes, setOpenMinutes] = useState(openDate.getMinutes())

    useEffect( () => {
        if(!episode) return
        
        setTitle(episode.title)
        setMainText(episode.mainText)
        setAuthorComment(episode.authorComment)
        setCategory(episode.category)
        setAdult(episode.adult)
        setFree(episode.free)
        setOpenLevel(episode.openLevel)


    }, [episode])

    
    const setEpisode = () => {
        let open = openLevel;
        let date;

        if (openLevel === "now")
            open = "open"

        else if( openLevel === "reservation"){
            open = "open"
            date = openDate;
            date.setHours(openHours);
            date.setMinutes(openMinutes);
        }

        return {
            category : category,
            title : title,
            mainText : mainText,
            authorComment : authorComment,
            adult : adult,
            free : free,
            openLevel : open,
            openDate : date,
        }
    }

    const renderHoursBox = () => {
        const changeOpenHours = (hours) => {
            if(typeof hours == "string")
                hours = parseInt(hours);
            setOpenHours(hours);
        } 

        const now = new Date();
        
        let startIndex = 0;
        if (now.getMonth() ===  openDate.getMonth() 
            && now.getDate() === openDate.getDate()){
            startIndex = now.getHours();
        }
        const options = Array.from( {length : 24}, ( item, index )=>{ 
                return <option value={index}>{index  + "시"}</option>
            })
            .filter( (item, index) => startIndex <= index);

            return  <InputGroup>
                        <Form.Select value = {openHours}  onChange = {e => changeOpenHours(e.target.value)} >
                            {options}
                        </Form.Select>
                    </InputGroup>
    }

    const renderMinutesBox = () => {
        const changeOpenMinutes = (minutes) => {
            if(typeof minutes == "string")
                minutes = parseInt(minutes);
            setOpenMinutes(minutes);
        } 
        const now = new Date();
        let startIndex = 0;

        if (now.getMonth() === openDate.getMonth() 
            && now.getDate() === openDate.getDate()
            && now.getHours() >= openHours){
            startIndex = now.getMinutes();
        }
        const options = Array.from( {length : 60}, ( item, index )=>{ 
            return <option value={index}>{index  + "분"}</option>
        })
        .filter( (item, index) => startIndex <= index);

        return  <InputGroup>
                    <Form.Select value = {openMinutes}  onChange = {e => changeOpenMinutes(e.target.value)} >
                        {options}
                    </Form.Select>
                </InputGroup>
    }

    return  <Container className="justify-content-center">
                
                <InputGroup className='my-3'>
                    <InputGroup.Text>제목</InputGroup.Text>
                    <FormControl
                            type = "text" 
                            placeholder="제목을 입력하시오 (100자 이하)"
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            maxLength = {100}>
                    </FormControl>
                </InputGroup>

                <Row className="m-3 align-items-center justify-content-center">
                    <Col md={3}>
                        <InputGroup>
                            <InputGroup.Text>카테고리</InputGroup.Text>
                            <Form.Select value = {category}  onChange = {e => setCategory(e.target.value)} >
                                <option value="episode">연재회차</option>
                                <option value="notice">공지사항</option>
                                <option value="prologue">프롤로그</option>
                                <option value="epilogue">에필로그</option>
                            </Form.Select>
                        </InputGroup>
                    </Col> 

                    <Col md={3}>
                        <InputGroup>
                            <InputGroup.Text>열람 대상</InputGroup.Text>
                            <Form.Select value = {adult}  onChange = {e => setAdult(e.target.value)} >
                                <option value="n">전체 이용</option>
                                <option value="y">성인 전용</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>   

                    <Col md={3}>
                        <InputGroup>
                            <InputGroup.Text>공개 방식</InputGroup.Text>
                            <Form.Select value = {openLevel}  onChange = {e => setOpenLevel(e.target.value)} >
                                <option value="now">즉시</option>
                                <option value="reservation" disabled={!(!episode ||  episode.hidden || ( episode.openDate && episode.openDate >= new Date())) }>예약</option>
                                <option value="hidden">내용 비공개</option>
                                <option value="secret">완전 비공개</option>
                            </Form.Select>
                        </InputGroup>         
                    </Col>

                    <Col md={3}>
                        <InputGroup>
                            <Form.Select value = {freeNovel ? "y" : free} disabled = {freeNovel} onChange = {e => setFree(e.target.value)} >
                                <option value="y">무료</option>
                                <option value="n">유료</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
                
                    { openLevel == 'reservation' ? 
                        <Row className="m-3 align-items-center justify-content-center">
                            <Col md={1}>공개시간</Col>
                            <Col md={2}> 
                                <DatePicker 
                                            locale={ko} 
                                            selected={openDate} 
                                            minDate={new Date()}
                                            maxDate={ new Date(openDate.getFullYear()+1, openDate.getMonth(), openDate.getHours())}
                                            onChange={ (date) => setOpenDate(date)} />
                            </Col>
                            <Col md={2}> {renderHoursBox()} </Col>
                            <Col md={2}> {renderMinutesBox()} </Col>        
                        </Row>
                    :
                        <></> }

                <Row className="my-3">
                    <Form.Label className="text-start">본문 내용</Form.Label>
                    <Form.Control   as="textarea"
                                    value={mainText}
                                    placeholder="" 
                                    onChange={e => setMainText(e.target.value)}
                                    style = {{  "height" : "600px",
                                                "background" : "#F2F2F2",
                                                "fontSize" : "15px",
                                                "fontWeight" : "300",
                                                "wordBreak":"break-all"}}/>
                    
                </Row>

                <Row className="my-3">
                    <Form.Label className="text-start">작가의 말</Form.Label>
                    <Form.Control   as="textarea"
                                    value={authorComment}
                                    placeholder="" 
                                    onChange={e => setAuthorComment(e.target.value)}
                                    style = {{  "height" : "200px",
                                                "background" : "#F2F2F2",
                                                "fontSize" : "15px",
                                                "fontWeight" : "300",
                                                "wordBreak":"break-all"}}/>
                    
                </Row>

                <Button type='button' onClick={() => onsubmit(setEpisode())}>
                    {submitBtnName}
                </Button> 
                </Container>
}

export default EpisodeForm;