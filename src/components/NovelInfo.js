import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/components/NovelInfo.module.css'
import TmpImg from "../img/tmp2.png"

const NovelInfo = ({num, novel, ...props }) => {
    console.log(num, novel);
    return (
        <div className={style.novel}>
            <div className={style.novel__cover}>
                <Link to={'/novel/' + novel.id} >
                    <img className={style.novel__cover__img}
                        src={TmpImg}
                        alt='cover' />
                </Link>
            </div>
            <div className={style['novel__info-box']}>
                <div className={style['novel__info-box__1']}>
                    <Link to={'/novel/' + novel.id} >
                        <div className={style.novel__title}>
                            {novel.title || '-'}
                        </div>
                    </Link>
                    <div className={style.novel__author}>
                        {novel.author || '-'}
                    </div>
                </div>
                <div className={style.novel__description}>
                    {novel.description || '-'}
                </div>
                <div className={style.novel__round}>
                    총&nbsp;&nbsp;{novel.round || '-'}&nbsp;화
                </div>
            </div>
        </div>
    );
};

export default NovelInfo;