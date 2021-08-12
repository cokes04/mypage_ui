import React, { useEffect, useState } from 'react';
import { getNovelFromId } from '../utils/Api';
import TmpImg from '../img/tmp2.png';
import style from '../css/page/NovelPage.module.css'

const NovelPage = ({id, ...props}) => {

    const [novel, setNovel] = useState({
        ageGrade : null,
        createdDate : "",
        description : "",
        genre : [] ,
        hidden : "",
        id : null,
        lastReleaseDate : null,
        openDate : null,
        pricePerEpisode : null,
        serialCycle : [],
        title : "",
        });

    useEffect( () => {
        getNovelFromId(id)
            .then( (response) => {
                const data = response.data;
                console.log(response);
                setNovel(data.novel);
            })
            .catch( (error) => {
                console.log(error);
                // 권한없음? 메시지 출력후 메인페이지로
            });
    },[id]);

    return ( 
        <div className={style['novel-container']}>
            <div className={style.novel}>
                <div className={style.novel__cover}>
                    <img className={style.novel__cover__img}
                        src={TmpImg}
                        alt='cover' />
                </div>
                <div className={style['novel__info-box']}>
                    <div className={style['novel__info-box__1']}>
                        <div className={style.novel__title}>
                            {novel.title || '-'}
                        </div>
                        <div className={style.novel__author}>
                            {novel.author || '-'}
                        </div>
                    </div>
                    <div className={style['novel__info-box__2']}>
                        <div className={style['novel__info-box__2__1']}>
                            <div className={style['novel__serial-cycle']}>
                                 연재&nbsp;&nbsp;{novel.serialCycle.map( (item) => item+" ")}
                            </div>
                            <div className={style.novel__genre}>
                                장르&nbsp;&nbsp;{novel.genre.map( (item) => item + " ")}
                            </div>
                        </div>
                        <div className={style.novel__description}>
                            {novel.description}
                        </div>
                    </div>
                    <div className={style.novel__round}>
                        총&nbsp;&nbsp;{novel.round || '-'}&nbsp;화
                    </div>
                </div>
            </div>
        </div>
        );
}

export default NovelPage;