import React, { useEffect, useState } from 'react';
import NovelInfo from '../components/NovelInfo';
import SearchMenu from '../components/SearchMenu';
import { searchNovel } from '../utils/Api';

const Search = ({keyword, ...props}) => {
    
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


    const printNovelInfo = () => {
        return novelList.map( (novel, index) =>
             <NovelInfo key = {novel.id} 
                    num = {index + 1} 
                    id = {novel.id}
                    title = {novel.title} 
                    author = {novel.author} 
                    />
        );
    }

    return (
            <div>
                <SearchMenu />
                {printNovelInfo()}
            </div>
            );
}

export default Search;