import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NovelInfo from '../components/NovelInfo';

const MyCreationPage = () => {

    const [novelList, setNovelList] = useState([]);
    const [totalNovelCount, setTotalNovelCount] = useState(0);

    /* useEffect( () => {
        요청
        .then( (response) => {
            const data = response.data;
            setNovelList(data.???);

        })
        .error( (error) => {
            // 오류출력후
            // 메인페이지로
        })
    }); */

    useEffect( () => {
        const tmpNovel = {
            id : 10,
            title : '임시 소설',
            description : '설명설명설명설명설명설명',
            author : '나',
            round : 10
        };

        setNovelList([tmpNovel]);
        console.log(novelList);
    },[]);

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
        return novelList.map( (novel) => 
            <div>
                <NovelInfo key = {novel.id} 
                        id = {novel.id}
                        title = {novel.title}
                        description = {novel.description}
                        author = {novel.author} 
                        round = {novel.round}
                /> 
                <div>
                    <Link to={'/my_creation/write/' + novel.id}>
                        <div>
                            글쓰기
                        </div>
                    </Link>
                    <Link to={'/my_creation/manage/' + novel.id}>
                        <div>
                            작품 관리
                        </div>
                    </Link>
                </div>
            </div>
        );
    }


    return ( 
                <div>
                    <div>
                        <Link to = '/my_creation/register'>
                            <button>
                                새 작품 등록
                            </button>
                        </Link>
                    </div>
                    <div>
                        {printNovelInfos()}
                    </div>
                    
                </div>
            );
}

export default MyCreationPage;