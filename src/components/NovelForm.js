import { useEffect, useState } from 'react';
import { Button, Form, Row,Col, InputGroup, FormControl, Image } from 'react-bootstrap';
import { genreInfo } from '../apis/mapper';
import tmp2Img from "../img/tmp2.png"

const NovelForm = ({novel, onsubmit, submitBtnName}) => {

    const [id, setId] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState("publish")
    const [ageGrade, setAgeGrade] = useState(-1)
    const [serialCycles, setSerialCycles] = useState([])
    const [genres, setGenres] = useState([])
    const [free, setFree] = useState("y")
    const [finish, setFinish] = useState("n")
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailURL, setThumbnailURL] = useState(null)

    const max_title_length = 30;
    const max_description_length = 1000;  

    useEffect( () => {
        if(!novel) return
        setId(novel.novelId)
        setTitle(novel.title)
        setDescription(novel.description)
        setStatus(novel.status)
        setAgeGrade(novel.ageGrade)
        setSerialCycles(novel.serialCycles)
        setGenres(novel.genres)
        setFree(novel.free)
        setFinish(novel.finish)
        setThumbnail(null)
        setThumbnailURL(novel.thumbnailUrl)
    }, [novel]);

    const setNovel = () => {
        return {
            title : title,
            description : description,
            status : status,
            ageGrade : ageGrade,
            genres : genres,
            serialCycles : serialCycles,
            finish : finish,
            thumbnail : thumbnail
        }
    }

    const toggleFinish = () =>{
        if(finish === 'y')
            setFinish('n')
        else
            setFinish('y')
    }

    const changeGenres = (genre) => {
        const index = genres.indexOf(genre);
            
        if(index === -1)
            setGenres([...genres, genre])
        else   
            setGenres(genres.filter(item => item !== genre));     
        
    }

    const changeSerialCycles = (day) => {
        const index = serialCycles.indexOf(day);
        if(index === -1)
            setSerialCycles([...serialCycles, day])
        else
            setSerialCycles(serialCycles.filter(item => item !== day));    
        
    }       

    return (
        <Form className='m-2'>
            <Row>
                <Col md = {3}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>
                            <Image 
                                src={thumbnailURL || tmp2Img}
                                style={{height:"240px", width:"200px"}}
                             />
                            </Form.Label>
                        <Form.Control 
                            type="file"
                            accept='image/*'
                            onChange={e => {
                                const file = e.target.files[0]
                                const image_url = URL.createObjectURL(e.target.files[0])
                                if (file.size > 2097152)
                                    alert("이미지 파일을 2MB이하로 첨부하세요")
                                else
                                    setThumbnail(file)
                                    setThumbnailURL(image_url)
                            }}/>
                    </Form.Group>
                </Col>
                <Col md = {9}>
                    <InputGroup className='m-1 mt-3'>
                        <InputGroup.Text>작품명</InputGroup.Text>
                        <FormControl
                                type = "text" 
                                placeholder="작품 명을 입력하시오 (30자 이하)"
                                value={title} 
                                onChange={e => setTitle(e.target.value)}
                                maxLength = {max_title_length}>
                        </FormControl>
                    </InputGroup>

                    <Row className='m-2'>
                        <Col>
                            <Form.Label>공개 여부</Form.Label>
                            <Form.Select value = {status}  onChange = { e => setStatus(e.target.value)}  
                                        disabled = {novel && novel.free === "n" }>
                                <option value="publish">공개</option>
                                <option value="private">비공개</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>유료 여부</Form.Label>
                            <Form.Select value = {free}  onChange = { e => setFree(e.target.value)} disabled >
                                <option value="y">무료</option>
                                <option value="n">유료</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>연령대</Form.Label>
                            <Form.Select value = {ageGrade}  onChange = { e => setAgeGrade(e.target.value)} >
                                <option value="-1">전체</option>
                                <option value="7">7세</option>
                                <option value="12">12세</option>
                                <option value="15">15세</option>
                                <option value="19">19세</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className='mt-3 mb-1'>
                        <Col>
                            <Form.Label className='pe-4'>연재 주기</Form.Label>
                            {[
                                {text : '월', value : '월'},
                                    {text : '화', value : '화'},
                                    {text : '수', value : '수'},
                                    {text : '목', value : '목'},
                                    {text : '금', value : '금'},
                                    {text : '토', value : '토'},
                                    {text : '일', value : '일'},
                                ].map((item, index) =>  <Form.Check inline type='checkbox' key={index}>
                                                            <Form.Check.Input   type='checkbox' 
                                                                                checked = {serialCycles.includes(item.value) ? true : false}
                                                                                onChange = {(e) => changeSerialCycles((item.value))}  />
                                                            <Form.Check.Label >{item.text}</Form.Check.Label>
                                                        </Form.Check> )
                            }
                        </Col>
                    </Row>
                    <Row className='mt-3 mb-1'>
                        <Col>
                            <Form.Label className='pe-4'>장르</Form.Label>
                            {
                                Array.from(genreInfo, ([value, kor]) => ({ value : value, text : kor }))
                                .map((item, index) =>  <Form.Check inline type='checkbox' key={index}>
                                                        <Form.Check.Input   type='checkbox'
                                                                            checked = {genres.includes(item.value) ? true : false}
                                                                            onChange = {(e) => changeGenres((item.value))}  />
                                                        <Form.Check.Label >{item.text}</Form.Check.Label>
                                                    </Form.Check> )
                            }
                        </Col>
                        <Col md='auto'>
                            <Form.Label className='pe-4'>완결</Form.Label>
                            <Form.Check inline type='checkbox'>
                                <Form.Check.Input  type='checkbox' disabled = {(novel && novel.finish === "y" || !novel) }
                                    checked = {finish === "y"}
                                    onChange = {toggleFinish}  />
                            </Form.Check>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Form.Label className="text-start">작품 소개</Form.Label>
                <Form.Control as="textarea"
                            value={description}
                            placeholder="소개글을 입력하시오 (1000자 이하)" 
                            onChange={e => setDescription(e.target.value)}
                            maxLength = {max_description_length}
                            style = {{  "height" : "250px",
                                        "background" : "#FEFEFE",
                                        "fontSize" : "15px",
                                        "fontWeight" : "300",
                                        "wordBreak":"break-all"}}/>
                
            </Row>

            <Button type='button' onClick={() => onsubmit(setNovel())}>
                {submitBtnName}
            </Button> 

        </Form>
    );
}

export default NovelForm;