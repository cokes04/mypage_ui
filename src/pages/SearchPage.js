import React, { useEffect, useState } from 'react';
import NovelInfo from '../components/NovelInfo';
import NovelPageButtons from '../components/NovelPageButtons';
import SearchMenu from '../components/SearchMenu';
import { searchNovel } from '../utils/Api';

const SearchPage = ({keyword, ...props}) => {
    
    const [pageInfo, setPageInfo] = useState({  page : 0,
                                                size : 20,
                                                sort : 'NEWEST'
                                            });

    const [novelList, setNovelList] = useState([]);
    const [totalNovelCount, setTotalNovelCount] = useState(0);
    const [totalNovelPage, setTotalNovelPage] = useState(0);

    useEffect( () =>{
        searchNovel(keyword, pageInfo)
        .then( (response) => {
                    const data = response.data;
                    setTotalNovelCount(data.totalNovelCount);
                    setTotalNovelPage(data.totalNovelPage);
                    setNovelList(data.novelList);
                })
                .catch( error => {
                    console.log("error : ", error)
                } );
    }, [keyword, pageInfo]);


    const printNovelInfos = () => {
        if(totalNovelCount === 0)
            return notExistMessage();
        else
            return novelInfos();
    };

    const notExistMessage = () => {
        return <p>등록된 작품이 없습니다.</p>
    };

    const novelInfos = () => {
        return novelList.map( (novel, index) =>
             <NovelInfo key = {novel.id} 
                    num = {index + 1} 
                    novel ={novel}
                    />
        );
    }

    return (
            <div>
                <SearchMenu />
                <div>
                    {printNovelInfos()}
                </div>
                <NovelPageButtons currentPage = {pageInfo.page} totalNovelPage = {totalNovelPage} setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />
            </div>
            );
}

export default SearchPage;