import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUser, changeReaderInfo, withdraw, verifyEmailRequest, verifyAdult } from '../apis/UserApi';
import { getUserId } from '../utils/AuthUtil';
import { Button, Col, Container, Form, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap';
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
    const [authProvider, setAuthProvider] = useState("")

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
                setAuthProvider(response.data.authProvider)
                setLoading(false)
            })
            .catch ( (error) => {
                alert("????????? ????????? ????????? ??? ????????????.")
                history.push('/')
            });
    

    }, []);

    const withdrawal = () => {
        let go = window.confirm("?????? ????????? ?????????????????????????")

        if(go)
            go = window.confirm("?????? ?????? ???????????? ???????????? ???????????? ???????????????, ?????? ????????? ???????????? ?????? ????????? ?????? ?????? ????????????.")

        if(go)
            withdraw(getUserId())
            .then( response => {
                alert("?????? ????????? ??????????????? ?????????????????????.")
                
                logout()
                .then(response => window.location.replace("/") )
                .catch(error => window.location.replace("/") )
                
                unAuthenticate()
            })
            .catch( error => {
                if(error.response.data.errors)
                    alert(error.response.data.errors[0].message)
                else 
                    alert("?????? ????????? ??????????????????")
                window.location.replace("/") 
            })
    }

    const verifyEmail = (freepass) => {
        const request = async (userId) => {
            try{
                const response = await verifyEmailRequest(userId, freepass)
                if (freepass){
                    alert("?????? ????????? ?????????????????????.")
                    window.location.replace("/my_info")
                }else
                    alert("?????? ?????? ???????????? ?????????????????????.\n ????????? ??????????????????.")

            }catch (error){
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("?????? ??? ?????? ??????????????????!")
                }
                window.location.replace("/my_info")
            }
        }

        const userId = getUserId()
        request(userId)
    }
    
    const certifyAdult = () => {
        const request = async (userId) => {
            try{
                const response = await verifyAdult(userId);
                alert("?????? ????????? ?????????????????????!")
                window.location.replace("/my_info")

            }catch (error){
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("?????? ??? ?????? ??????????????????!")
                }
            }
        }

        let go = window.confirm("?????? ????????? ?????????????????????????")

        if(go)
            go = window.confirm("????????????????")
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
                alert("????????? ?????? ??????")
            })
            .catch( (error) => {
                try{
                    alert(error.response.data.errors[0].message)
                } catch(e){
                    alert("?????? ??? ?????? ??????????????????!")
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
            alert("?????? ?????? ?????? ??????")
        } )
        .catch(error =>{
            if(error.response.data.errors)
                alert(error.response.data.errors[0].message)
            else 
                alert("?????? ?????? ?????? ??????")
        })
        
    }

    const changePassword = () => {
        history.push("/change/password")
    }
    return (
        loading ? <Spinner animation = "border"/> :
        <Container  className='p-3 justify-content-center my-3' 
                    style={{border : "3px solid #F0F0F0", borderRadius:"10px"}} >
            <Row className='mt-1 justify-content-center'> ?????? ?????? </Row>
            <InputGroup>
                <InputGroup.Text>?????????</InputGroup.Text>
                <FormControl disabled value={userId}/>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>?????????</InputGroup.Text>
                <FormControl disabled value={email}/>
                {verificationStatus ? <InputGroup.Text>?????? ??????</InputGroup.Text> : 
                    <>
                    <Button onClick={() => verifyEmail(true)}>????????? ?????? ??????(TEST)</Button>
                    <Button onClick={() => verifyEmail(false)}>????????? ??????</Button>
                    </>
                }
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>??????</InputGroup.Text>
                <FormControl disabled value={adult ? "?????? ??????" : "?????????"}/>
                {adult ? <></> : <Button onClick={certifyAdult}>?????? ?????? ??????(TEST)</Button>}
            </InputGroup>

            <Row className='mt-3 justify-content-center'> ????????? </Row>
            <InputGroup>
                <InputGroup.Text>?????????</InputGroup.Text>
                <Form.Control 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    maxLength = {max_name_length} />
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>??????</InputGroup.Text>
                <Form.Select value = {gender} 
                             onChange = {e => {setGender(e.target.value)} } >
                    <option value="male">???</option>
                    <option value="famale">???</option>
                    <option value="thirdGender">??? 3??? ???</option>
                    <option value="notDisclosed">?????????</option>
                </Form.Select>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text>?????? ?????????</InputGroup.Text>
                <Form.Select value = {openInfo}  
                             onChange = {e => {setOpenInfo(e.target.value)} } >
                    <option value="y">??????</option>
                    <option value="n">?????????</option>
                </Form.Select>
            </InputGroup>
            <InputGroup>
                    <InputGroup.Text>??????</InputGroup.Text>
                    <FormControl as="textarea" 
                                 rows={5}
                                 value={aboutReader} 
                                 onChange={e => setAboutReader(e.target.value)}  />
                </InputGroup>

            <Row md="auto" className='justify-content-center'>
                <Button onClick={modifyReader}>??????</Button>
            </Row>


            <Row className='mt-3 justify-content-center'> ?????? ?????? </Row>
            <InputGroup>
                <InputGroup.Text>??????</InputGroup.Text>
                <Form.Control   type="text" 
                                value={penName} 
                                onChange={e => setPenName(e.target.value)} 
                                maxLength = {max_name_length} />
            </InputGroup>
            <InputGroup>
                    <InputGroup.Text>?????? ??????</InputGroup.Text>
                    <FormControl as="textarea" 
                                 rows={5}
                                 value={aboutAuthor} 
                                 onChange={e => setAboutAuthor(e.target.value)}  />
                </InputGroup>

            <Row md="auto" className='justify-content-center'>
                <Button onClick={modifyAuthor}>??????</Button>
            </Row>


            <Row md="auto" className='m-5 justify-content-center'>
                <Col>
                    <Button onClick={withdrawal}>?????? ??????</Button>
                </Col>
                {
                authProvider === "local" ? <Col>
                    <Button onClick={changePassword}>???????????? ??????</Button>
                </Col> : <></>}
                               
            </Row>            
            
        </Container>
        
    );
}

export default MyInfoPage;