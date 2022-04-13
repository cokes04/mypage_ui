import React, { useEffect, useState } from 'react';
import { getAuthor, getNovel } from '../apis/Api';
import NovelInfo from '../components/NovelInfo';
import { useHistory } from 'react-router-dom';
import EpisodeInfoList from '../components/EpisodeInfoList';
import Ticket from '../components/Ticket';
import { Container, Spinner} from 'react-bootstrap';

const NovelPage = ({id, authenticated, ...props}) => {

    const [loading, setLoading] = useState(true)

    const [novel, setNovel] = useState({})
    const [author, setAuthor] = useState({})

    useEffect( async () => {
        let novelResponse = await getNovel(id)
        let authorResponse = await getAuthor(novelResponse.data.authorId)
        setAuthor(authorResponse.data)
        setNovel(novelResponse.data)
        setLoading(false)
    },[id])

    return ( 
         loading ? <Spinner animation="border" /> : 
        <Container>
            <NovelInfo novel={novel} author={author || {}} printReaderButton = {true}/>
            { ( authenticated && novel.free === "n" ) && <Ticket novelId = {id} />}
            <EpisodeInfoList  novelId = {id} />
        </Container>
        )
}

export default NovelPage;