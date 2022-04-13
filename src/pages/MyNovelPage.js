import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import PageButtons from '../components/PageButtons';
import {getAuthors, getFavoriteNovelsOfUser} from "../apis/Api";
import { getUserId } from '../utils/AuthUtil';
import NovelInfo from '../components/NovelInfo';
import { useHistory } from 'react-router-dom';

const MyNovelPage = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    const [pageInfo, setPageInfo] = useState({  page : 0,
                                                size : 20,
                                                sort : 'newest_create'
                                            })

    const [novelList, setNovelList] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [authorMap, setAuthorMap] = useState(new Map())

    useEffect ( async () =>{
        let novelResponse;
        try{
            novelResponse = await getFavoriteNovelsOfUser(getUserId(), pageInfo)
            setTotalCount(novelResponse.data.totalCount)
            setTotalPage(novelResponse.data.totalPage)
            setNovelList(novelResponse.data.novelList)
        }catch(err){
            return
        }

        try{
            const authorIdList = [... new Set(novelResponse.data.novelList.map( n => n.authorId)) ]
            if(authorIdList.length !== 0){
                let authorsResponse = await getAuthors(authorIdList)
                let authorMap = new Map();
                
                if (authorsResponse.data.authorList){
                    for( let author of authorsResponse.data.authorList)
                        authorMap.set(author.authorId, author)
                }
                else{
                    authorMap.set(authorsResponse.data.authorId, authorsResponse.data)
                }
                setAuthorMap(authorMap)
            }
        }catch(err){
            
        }
        setLoading(false)
    }, [pageInfo] );

    const novelInfos = () => {
        return novelList && novelList.map( (novel, index) =>
             <NovelInfo key = {index} novel = {novel} author = {authorMap.get(novel.authorId) || {}}/>
        );
    }

    return (
        <Container>
            {loading ? <Spinner animation = 'border' /> :
                totalCount === 0 ? <p>작품을 추가해 주세요.</p> : 
                <Container> 
                    {novelInfos()}
                    <PageButtons currentPage = {pageInfo.page} 
                                 totalPage = {totalPage} 
                                 setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />
                </Container>
            }

        </Container>
    );
}

export default MyNovelPage;