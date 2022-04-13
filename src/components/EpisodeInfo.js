import nineteenImg from "../img/nineteen.png"
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserId } from "../utils/AuthUtil";

const EpisodeInfo = ({episodeInfo}) => {
    let today =  new Date()
    
    const renderCategory = () => {
        const category = episodeInfo.category
        if(category === "episode")
            return "에피소드"
        else if (category === "notice")
            return "공지사항"
        else if(category === "prologue")
            return "프롤로그"
        else if(category === "epilogue")
            return "에필로그"
    }
    const renderOpenDate = () => {
        if (episodeInfo.openLevel === "open"){
            let time = new Date(episodeInfo.openDate) - today

            if (time < 0 )
                return <span>{episodeInfo.openDate ? episodeInfo.openDate.substring(0, 10) : "-"}</span>
            else 
                return <span>{getRemainsTime(time)} 후 공개</span>
        }

        else if (episodeInfo.openLevel === "hidden")
            return "비공개"
        else if(episodeInfo.openLevel === "secret")
            return "비공개"
        else 
            return "-"
    }

    const getRemainsTime = (mili_sec) => {
        const sec = mili_sec / 1000
        if(sec <= 60) return Math.floor(sec) + "초"

        const min = sec / 60
        if(min <= 60) return Math.floor(min) + "분"

        const hour = min / 60
        if(hour <= 24) return Math.floor(hour) + "시간"

        const day = hour /24
        return Math.floor(day) + "일"
    }

    const isAuthorUser = () => { return episodeInfo.authorId === Number(getUserId()) }
    
    return (
        <Link to = {`/episode/${episodeInfo.episodeId}`}>
        <Row className="align-items-center">
            <Col md={isAuthorUser() ? 8 : 10} >
                <Row className = "text-start align-items-center">
                    <Col md="auto" style = {{fontSize:"11px"}}>{renderCategory()} </Col>
                    <Col md={1} >
                        {episodeInfo.adult ? 
                        <Image src ={nineteenImg} style={{height: '22px', width: '22px'}} />
                         : <></>}
                    </Col>
                    <Col md="auto" >{episodeInfo.free ? "무료" : "유료"}</Col>
                    <Col md="auto">{episodeInfo.title}</Col>
                </Row> 

                <Row className = "text-start">
                    <Col md="auto">열람 {episodeInfo.readCount}</Col>
                    <Col md="auto">추천 {episodeInfo.recommendationCount}</Col>
                </Row> 
            </Col>

            {
            isAuthorUser() ? 
                <Col md={2} className="text-end">
                    <Link to={`/my_creation/novel/${episodeInfo.novelId}/episode/${episodeInfo.episodeId}/modify`}>수정</Link>
                </Col>
                : <></>
            }
            

            <Col md={2} className="text-end">{renderOpenDate()}</Col>
        </Row>
        </Link>
    )
} 

export default EpisodeInfo