import React, {useEffect, useState }  from 'react';
import { Redirect } from 'react-router-dom';
import style from '../css/components/SearchBar.module.css'
import SearchBtnImg from "../img/search_btn.png"

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    const enterPressEvent = (e) => {
        if(e.key === 'Enter')
            search();
    }

    const search = () =>{
        if(keyword !== '')
            setIsRedirect(true);
    };

    const redirect = () => {
        if(isRedirect){
            return <Redirect to = {{
                pathname : '/search',
                search : '?keyword=' + keyword,
            }} />
        }
    }
    
    useEffect( () => {
        setKeyword('');
        if(isRedirect)
            setIsRedirect(false);
        }, [isRedirect]);

    return (
        <div className={style['search-bar']}>
            <input className={style['search-bar__box']}
                type = "text" 
                placeholder="검색" 
                value={keyword} 
                onChange={e => setKeyword(e.target.value)} 
                onKeyPress={e => enterPressEvent(e)}/>

            <div className={style['search-bar__btn']}
                onClick={search} >
                <img className={style['search-bar__btn__img']}
                    src={SearchBtnImg}
                    alt='search_btn'/>
            </div>
            {redirect()}
        </div>
        )
}

export default SearchBar;