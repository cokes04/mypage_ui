import React, { useEffect, useState } from 'react';
import NovelGenreMenu from '../components/NovelGenreMenu';
import NovelInfo from '../components/NovelInfo';
import NovelTypeMenu from '../components/NovelTypeMenu';
import NovelPageButtons from '../components/NovelPageButtons';
import { getNovelList } from '../utils/Api';

const NovelListPage = ( {free, type, genre, ...props} ) => {

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
                    novel = {novel}
                    />
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
        <div>
            <NovelTypeMenu url = {url1()} />
            <NovelGenreMenu url = {url2()} />
            <div>
                {printNovelInfos()}
            </div>
                <NovelPageButtons currentPage = {pageInfo.page} totalNovelPage = {totalNovelPage} setPage = { (newPage) => setPageInfo( {...pageInfo, page : newPage})  } />

        </div>
    );
}

export default NovelListPage;