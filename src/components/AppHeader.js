import React from 'react';
import { Link } from 'react-router-dom';
import titleImg from '../img/title.png';
import MainMenu from './MainMenu';
import SearchBar from './SearchBar';

const AppHeader = ({ authenticated, handleLogout, ...props} ) => {
    return (
        <div>
            <Link to="/" ><img src={titleImg} alt="title" width='160' height='90' /></Link>
            <SearchBar />
            {
            authenticated ?
                <>
                    < Link to='/profile' >프로필</Link>
                    < Link to='/' onClick = {handleLogout} >로그아웃</Link>
                </>
            :
                <>
                    < Link to='/login' >로그인</Link>
                    < Link to='/signup' >회원가입</Link>
                </>
            }
            <br />
            <MainMenu />
        </div>
    );

}

export default AppHeader;