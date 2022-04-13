import React, { useEffect, useState } from 'react';
import NovelInfo from '../components/NovelInfo';
import PageButtons from '../components/PageButtons';
import SearchMenu from '../components/SearchMenu';
import { getAuthors, getNovels } from '../apis/Api';
import { Container, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SearchPage = ({keyword, ...props}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    const [pageInfo, setPageInfo] = useState({  page : 0,
                                                size : 20,
                                                sort : 'newest_create'
                                            })

    const [novelList, setNovelList] = useState([])
    const [authorMap, setAuthorMap] = useState(new Map())
    const [totalCount, setTotalCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    useEffect ( async () =>{
        setLoading(true)
        let novelResponse;
        try{
            novelResponse = await getNovels(getNovelInfo(), pageInfo)
            setTotalCount(novelResponse.data.totalCount)
            setTotalPage(novelResponse.data.totalPage)
            setNovelList(novelResponse.data.novelList)
        }catch(err){
            alert('작품 검색에 실패했습니다. 잠시 후 다시 시도해주세요.')
            history.push('/')
        }

        try{
            const authorIdList = [... new Set(novelResponse.data.novelList.map( n => n.authorId)) ]
            if(authorIdList.length !== 0){
                let authorsResponse = await getAuthors(authorIdList)
                let authorMap = new Map();
                
                if (authorsResponse.data.authorList){
                    for( let author in authorsResponse.data.authorList)
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
        }, [keyword, pageInfo])


    const getNovelInfo = () =>{
        return {'keyword' : keyword, type : "all", genre : "all", payment : "all", ageGroup:"all"}
    }

    const novelInfos = () => {
        return novelList.map( (novel, index) =><NovelInfo key = {index} novel ={novel} 
                                                          author = {authorMap.get(novel.authorId) || {}}/>
        );
    }

    return (
        loading ? <Spinner animation='border'/> :
            <Container>
                <SearchMenu />
                {totalCount === 0 ? <p>등록된 작품이 없습니다.</p> :  novelInfos() }
                <PageButtons currentPage = {pageInfo.page} totalPage = {totalPage} setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />
            </Container>
            );
}

export default SearchPage;