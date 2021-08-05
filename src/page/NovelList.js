import React, { useEffect, useState } from 'react';
import NovelGenreMenu from '../components/NovelGenreMenu';
import NovelInfo from '../components/NovelInfo';
import NovelTypeMenu from '../components/NovelTypeMenu';
import NovelPageButtons from '../components/NovelPageButtons';
import { getNovelList } from '../utils/Api';

const NovelList = ( {free, type, genre, ...props} ) => {

    const [novelInfo, setNovelInfo] = useState({    free : free,
                                                    type : type,
                                                    genre : genre,

                                            });

    const [pageInfo, setPageInfo] = useState({  page : 0,
                                                size : 20,
                                                sort : 'NEWEST'
                                            });


    const [novelList, setNovelList] = useState([]);
    const [totalNovelCount, setTotalNovelCount] = useState(0);
    const [totalNovelPage, setTotalNovelPage] = useState(0);

    useEffect( () => {
        let newNovelInfo = novelInfo;
        if(free !== novelInfo.free)
            newNovelInfo = {...newNovelInfo, free : free};
        
        if(type !== novelInfo.type)
            newNovelInfo = {...newNovelInfo, type : type};

        if(genre !== novelInfo.genre)
            newNovelInfo = {...newNovelInfo, genre : genre};


        //console.log(free, type, genre, props.match.url);
        setNovelInfo(newNovelInfo);
    }, [free, type, genre])


    useEffect ( () =>{
            getNovelList( novelInfo, pageInfo)
                .then( (response) => {
                    const data = response.data;
                    setTotalNovelCount(data.totalNovelCount);
                    setTotalNovelPage(data.totalNovelPage);
                    setNovelList(data.novelList);
                })
                .catch( error => {
                    console.log("error", error)
                } );
        }
    , [novelInfo, pageInfo] );


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

    const getUrl = () => { return props['match']['url'].split('/'); }
    const url1 = () => {
        const urls = getUrl();
        return  '/' + urls[1];
    }

    const url2 = () => {
        const urls = getUrl();
        return '/' + urls[1] + '/' + ( urls[2] || 'all' ); 
    } 

    return (
        <div>
            <NovelTypeMenu url = {url1()} />
            <NovelGenreMenu url = {url2()} />
            <div>
                {printNovelInfo()}
            </div>
                <NovelPageButtons currentPage = {pageInfo.page} totalNovelPage = {totalNovelPage} setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />

        </div>
    );
}

export default NovelList;