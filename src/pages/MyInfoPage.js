import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUser, changeReaderInfo, withdraw, verifyEmailRequest, verifyAdult } from '../apis/UserApi';
import { getUserId } from '../utils/AuthUtil';
import { Button, Container, Form, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap';
import { logout } from '../apis/AuthApi';
import { changeAuthorInfo } from '../apis/UserApi';

const MyInfoPage = ({unAuthenticate, ...props}) => {
    
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    const [userId, setUserId] = useState(0)
    const [email, setEmail] = useState("")

    const [name, setName] = useState("")
    const [aboutReader, setAboutReader] = useState("")
    const [gender, setGender] = useState("male")
    const [adult, setAdult] = useState(false)
    const [openInfo, setOpenInfo] = useState("n")

    const [penName, setPenName] = useState("")
    const [aboutAuthor, setAboutAuthor] = useState("")

    const [verificationStatus, setVerificationStatus] = useState(false)

    const max_name_length = 20


    useEffect( () =>  {
        const userId = getUserId();

        getUser(userId)
            .then( (response) => {
                setUserId(response.data.userId)
                setEmail(response.data.email)
                setAdult(response.data.adultConfirm === "y" ? true : false)

                const readerInfo = response.data.readerInfo
                setName(readerInfo.readerName)
                setAboutReader(readerInfo.aboutReader)
                setGender(readerInfo.gender)
                setOpenInfo(readerInfo.openReaderInfo)

                const authorInfo = response.data.authorInfo
                setPenName(authorInfo.authorName)
                setAboutAuthor(authorInfo.aboutAuthor)

                setVerificationStatus(response.data.verify === "y" ? true : false)
                setLoading(false)
            })
            .catch ( (error) => {
                alert("사용자 정보를 불러올 수 없습니다.")
                history.push('/')
            });
    

    }, []);

    const withdrawal = () => {
        let go = window.confirm("회원 탈퇴를 진행하시겠습니까?")

        if(go)
            go = window.confirm("탈퇴 이후 해당하는 이메일로 재가입이 불가능하여, 작가 정보와 작성하신 유료 소설은 삭제 되지 않습니다.")

        if(go)
            withdraw(getUserId())
            .then( response => {
                alert("회원 탈퇴가 성공적으로 이루어졌습니다.")
                
                logout()
                .then(response => window.location.replace("/") )
                .catch(error => window.location.replace("/") )
                
                unAuthenticate()
            })
            .catch( error => {
                if(error.response.data.errors)
                    alert(error.response.data.errors[0].message)
                else 
                    alert("회원 탈퇴에 실패했습니다")
                window.location.replace("/") 
            })
    }

    const verifyEmail = () => {
        const request = async (userId) => {
            try{
                const response = await verifyEmailRequest(userId);
                alert("이메일 인증이 완료되었습니다\n잠시 후 새로고침 해주세요")

            }catch (error){
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("잠시 후 다시 시도해주세요!")
                }
            }
        }

        const userId = getUserId()
        request(userId)
    }
    
    const certifyAdult = () => {
        const request = async (userId) => {
            try{
                const response = await verifyAdult(userId);
                alert("성인 인증이 완료되었습니다!")

            }catch (error){
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("잠시 후 다시 시도해주세요!")
                }
            }
        }

        let go = window.confirm("성인 인증을 진행하시겠습니까?")

        if(go)
            go = window.confirm("성인입니까?")
        if(go){
            const userId = getUserId()
            request(userId)
        }
            
    }

    const modifyReader = () => {
        const userId = getUserId()
        const newReaderInfo = {
            readerName : name,
            gender : gender,
            aboutReader : aboutReader,
            openReaderInfo : openInfo,
         }

         changeReaderInfo(userId, newReaderInfo)
            .then( (response) => {
                alert("프로필 변경 성공")
            })
            .catch( (error) => {
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("잠시 후 다시 시도해주세요!")
                }
            })
    }

    const modifyAuthor = async () =>{
        const authorId = getUserId()
        const newAuthorInfo = {
            authorName : penName,
            aboutAuthor : aboutAuthor,
         }

        changeAuthorInfo(authorId, newAuthorInfo)
        .then(r => {
            alert("작가 정보 변경 성공")
        } )
        .catch(error =>{
            if(error.response.data.errors)
                alert(error.response.data.errors[0].message)
            else 
                alert("작가 정보 변경 실패")
        })
        
    }

    return (
        loading ? <Spinner animation = "border"/> :
        <Container  className='p-3 justify-content-center my-3' 
                    style={{border : "3px solid #F0F0F0", borderRadius:"10px"}} >
            <Row className='mt-1 justify-content-center'> 기본 정보 </Row>
            <InputGroup>
                <InputGroup.Text>아이디</InputGroup.Text>
                <FormControl disabled value={userId}/>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>이메일</InputGroup.Text>
                <FormControl disabled value={email}/>
                {verificationStatus ? <InputGroup.Text>인증 완료</InputGroup.Text> : 
                    <Button onClick={verifyEmail}>이메일 인증</Button>
                }
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>성인</InputGroup.Text>
                <FormControl disabled value={adult ? "인증 완료" : "미인증"}/>
                {adult ? <></> : <Button onClick={certifyAdult}>성인 인증</Button>}
            </InputGroup>

            <Row className='mt-3 justify-content-center'> 프로필 </Row>
            <InputGroup>
                <InputGroup.Text>닉네임</InputGroup.Text>
                <Form.Control 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    maxLength = {max_name_length} />
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>성별</InputGroup.Text>
                <Form.Select value = {gender} 
                             onChange = {e => {setGender(e.target.value)} } >
                    <option value="male">남</option>
                    <option value="famale">여</option>
                    <option value="thirdGender">제 3의 성</option>
                    <option value="notDisclosed">비공개</option>
                </Form.Select>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>독자 프로필</InputGroup.Text>
                <Form.Select value = {openInfo}  
                             onChange = {e => {setOpenInfo(e.target.value)} } >
                    <option value="y">공개</option>
                    <option value="n">비공개</option>
                </Form.Select>
            </InputGroup>
            <InputGroup>
                    <InputGroup.Text>소개</InputGroup.Text>
                    <FormControl as="textarea" 
                                 rows={5}
                                 value={aboutReader} 
                                 onChange={e => setAboutReader(e.target.value)}  />
                </InputGroup>

            <Row md="auto" className='justify-content-center'>
                <Button onClick={modifyReader}>수정</Button>
            </Row>


            <Row className='mt-3 justify-content-center'> 작가 정보 </Row>
            <InputGroup>
                <InputGroup.Text>필명</InputGroup.Text>
                <Form.Control   type="text" 
                                value={penName} 
                                onChange={e => setPenName(e.target.value)} 
                                maxLength = {max_name_length} />
            </InputGroup>
            <InputGroup>
                    <InputGroup.Text>작가 소개</InputGroup.Text>
                    <FormControl as="textarea" 
                                 rows={5}
                                 value={aboutAuthor} 
                                 onChange={e => setAboutAuthor(e.target.value)}  />
                </InputGroup>

            <Row md="auto" className='justify-content-center'>
                <Button onClick={modifyAuthor}>수정</Button>
            </Row>


            <Row md="auto" className='m-5 justify-content-center'>
                <Button onClick={withdrawal}>회원 탈퇴</Button>
            </Row>            
            
        </Container>
        
    );
}

export default MyInfoPage;