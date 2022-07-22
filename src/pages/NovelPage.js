import React, { useEffect, useState } from 'react';
import { getAuthor} from '../apis/Api';
import { getNovel, isFavoriteNovel } from '../apis/NovelApi'
import NovelInfo from '../components/NovelInfo';
import { useHistory } from 'react-router-dom';
import EpisodeInfoList from '../components/EpisodeInfoList';
import Ticket from '../components/Ticket';
import { Container, Spinner, Button } from 'react-bootstrap';
import { getUserId } from '../utils/AuthUtil';
import { Link } from 'react-router-dom';
import { ynToBool } from '../apis/mapper';

const NovelPage = ({novelId, authenticated, ...props}) => {
    const [novelLoading, setNovelLoading] = useState(true)
    const [favoriteLoading, setFavoriteLoading] = useState(true)
    const history = useHistory()

    const [novel, setNovel] = useState({})
    const [author, setAuthor] = useState({})
    const [favorite, setFavorite] = useState(false)

    useEffect( () => {
        const novelRequest = async (novelId) => {
            let novelResponse;
                try{
                    novelResponse = await getNovel(novelId)
                    novelResponse.data.free = ynToBool(novelResponse.data.free)
                    novelResponse.data.finish = ynToBool(novelResponse.data.finish)
                    setNovel(novelResponse.data)
                }catch (error){
                    try{
                        alert(error.response.data.errors[0].message)
                    } catch(error1){
                        alert("잠시 후 다시 시도해주세요!")
                    }
                    history.goBack()
                    return
                }

                try{
                    let authorResponse = await getAuthor(novelResponse.data.authorId)
                    setAuthor(authorResponse.data)
                }catch (e){}
                
            setNovelLoading(false)
        }
        novelRequest(novelId)
    }, [novelId])

    useEffect(() => {
        const reqeust = async (novelId, userId) => {
            if (userId){
                 try{
                    let isfavoriteNovelResponse = await isFavoriteNovel([novelId], userId)
                    setFavorite(ynToBool(isfavoriteNovelResponse.data[novelId]))
                }catch (e){}
            }
            setFavoriteLoading(false)
        }
        
        const userId = getUserId()
        reqeust(novelId, userId)
    }, [novelId])

    const isLoading = () => {
        return novelLoading || favoriteLoading
    }

    return ( isLoading() ? <Spinner animation="border" /> : 
            <Container>
                <NovelInfo  novel={novel}
                            author={author || {}} 
                            printReaderButton = {true}
                            isFavorite = {favorite}
                            />
                { author.authorId === getUserId() && <Button><Link to={`/my_creation/write/${novelId}`}>글쓰기</Link></Button>}
                { ( authenticated && !novel.free ) && <Ticket novelId = {novelId} />}
                <EpisodeInfoList  novelId = {novelId} checkRead = {true} />
            </Container>
        )
}

export default NovelPage;