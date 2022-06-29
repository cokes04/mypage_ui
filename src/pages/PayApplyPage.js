import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { getAuthor,} from '../apis/Api'
import { getNovel, applyPaidNovel } from '../apis/NovelApi'
import NovelInfo from '../components/NovelInfo'
import { getUserId } from '../utils/AuthUtil'

const PayApplyPage = ({novelId}) => {
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const [novel, setNovel] = useState({})
    const [author, setAuthor] = useState({})

    useEffect( async() => {
        console.log(novelId)
        try{
            let novelResponse = await getNovel(novelId)
            if( novelResponse.data.authorId != getUserId() ){
                alert("해당 페이지에 접근할 수 없습니다.")
                history.push("/") 
            }
            setNovel(novelResponse.data)
            let authorResponse = await getAuthor(novelResponse.data.authorId)
            setAuthor(authorResponse.data)
            setLoading(false)
        }catch (e) {
            alert("소설 정보를 불러 올 수 없습니다.")
            history.push("/")
        }
        

    }, [])

    const onSummit = async () => {
        try{
            await applyPaidNovel(novelId)
            alert("유료화 신청이 성공적으로 신청되었습니다.")
            history.goBack()
            
        }catch (error){
            try{
                alert(error.response.data.errors[0].message)
            } catch(e){
                alert("유료화 신청에 실패하였습니다.")
            }
            history.push("/")
        }
    }
    return ( loading ? <Spinner animation='border'/> :
                <Container>
                    <NovelInfo novel = {novel} author = {author} printReaderButton = {false}/>

                    <Row className="justify-content-center" style={{fontSize : "30px"}}>
                        조건
                    </Row>
                    <Row className="justify-content-center">
                        없음
                    </Row>

                    <Button onClick={onSummit}>
                        신청
                    </Button>
                </Container>
            );
}

export default PayApplyPage;