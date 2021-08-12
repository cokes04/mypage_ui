import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import titleImg from '../img/title.png';
import Profile from './Profile';
import SearchBar from './SearchBar';
import style from '../css/components/AppHeader.module.css';
import ProfileImg from '../img/profile.png';

const AppHeader = ({ authenticated, handleLogout, ...props} ) => {

    const [showProfile, setShowProfile] = useState(authenticated);

    return (
        <div className={style.header}>

            <div className={style.title}>
                <Link to="/" >
                    <img 
                        className={style.title__img}
                        src={titleImg}
                        alt='title'
                    />
                </Link>
            </div>

            <SearchBar />

            {
            authenticated ?
                <div className={style['account-box']}>
                    <div className={style['account-box__profile']}
                        onClick = { () => {setShowProfile(!showProfile)}}>   
                        <img 
                            className={style['account-box__profile__img']}
                            src={ProfileImg}
                            alt='profile'>
                        </img>
                    </div>
                    { showProfile ? <Profile logout = {handleLogout} /> : null }
                </div>
            :
                <div className={style['auth-box']}>
                    < Link to='/login' className={style['auth-box__item']}>
                        로그인
                    </Link>
                    < Link to='/signup' className={style['auth-box__item']}>
                        회원가입
                    </Link>
                </div>
            }
        </div>
    );

}

export default AppHeader;