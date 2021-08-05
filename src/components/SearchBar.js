import React, {useEffect, useState }  from 'react';
import { Redirect } from 'react-router-dom';
import '../css/components/BooksMenu.css'

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    const enterPressEvent = (e) => {
        if(e.key === 'Enter')
            search();
    }

    const search = () =>{
        setIsRedirect(true);
    };

    const redirect = () => {
        if(isRedirect){
            return <Redirect to = {{
                pathname : '/search',
                search : '?keyword=' + keyword,
                state : {keyword : keyword}
            }} />
        }
    }
    
    useEffect( () => {
        setKeyword('');
        if(isRedirect)
            setIsRedirect(false);
        }, [isRedirect]);

    return (
        <div>
            <input type = "type" placeholder="검색" value={keyword} onChange={e => setKeyword(e.target.value)} onKeyPress={e => enterPressEvent(e)}/>
            <button type='submit' onClick={search}>검색</button>
            {redirect()}
        </div>
        )
}

export default SearchBar;