import React, { useEffect, useState } from 'react'
import NovelGenreMenu from '../components/NovelGenreMenu'
import NovelInfo from '../components/NovelInfo'
import NovelTypeMenu from '../components/NovelTypeMenu'
import PageButtons from '../components/PageButtons'
import { getAuthors } from '../apis/Api'
import { SearchNovel } from '../apis/NovelApi'
import {Container, Spinner} from 'react-bootstrap'
import { ynToBool } from '../apis/mapper'

const NovelListPage = ( {type, payment, genre, ageGroup, ...props} ) => {
    const [loading, setLoading] = useState(true)

    const [novelInfo, setNovelInfo] = useState({    
                                                    type : type,
                                                    payment : payment,
                                                    genre : genre,
                                                    ageGroup : ageGroup,
                                            })

    const [pageInfo, setPageInfo] = useState({  page : 0,
                                                size : 20,
                                                sort : 'newest_create'
                                            })

    const [novelList, setNovelList] = useState([])
    const [authorMap, setAuthorMap] = useState(new Map())
    const [totalCount, setTotalCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    useEffect( () => {
        let newNovelInfo = {    
            type : type,
            payment : payment,
            genre : genre,
            ageGroup : ageGroup,
    }

        setLoading(true)
        setNovelInfo(newNovelInfo)
    }, [type, payment, genre, ageGroup])


    useEffect ( () =>{
        const request = async (novelInfo, pageInfo)=>{
            let novelResponse;
            try{
                novelResponse = await SearchNovel(novelInfo, pageInfo)
                setTotalCount(novelResponse.data.totalCount)
                setTotalPage(novelResponse.data.totalPage)

                novelResponse.data.novelList.map( n => {
                    n.free = ynToBool(n.free)
                    n.finish = ynToBool(n.finish)
                    return n
                })
                
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
                    else
                        authorMap.set(authorsResponse.data.authorId, authorsResponse.data)
                    
                    setAuthorMap(authorMap)
                }
            }catch(err){
                
            }
            setLoading(false)
        }

        request(novelInfo, pageInfo)
    }, [novelInfo, pageInfo] );

    const novelInfos = () => {
        return novelList && novelList.map( (novel, index) =>
             <NovelInfo key = {index} novel = {novel}  author = {authorMap.get(novel.authorId) || {}}/>
        );
    }

    const getUrl = () => { return props.match.url.split('/'); }
    
    const url1 = () => {
        const urls = getUrl();
        return  '/' + urls[1];
    }

    const url2 = () => {
        const urls = getUrl();
        return '/' + urls[1] + '/' + ( urls[2] || 'all' ); 
    } 

    return (
        <Container>
            <NovelTypeMenu url = {url1()} />
            <NovelGenreMenu url = {url2()} />

            {loading ? <Spinner animation = 'border' /> :
                totalCount === 0 ? <p>등록된 작품이 없습니다.</p> : 
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

export default NovelListPage;