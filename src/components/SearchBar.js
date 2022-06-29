import {useEffect, useState }  from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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
                search : '?keyword=' + keyword,}} />
        }
    }
    
    useEffect( () => {
        setKeyword('')
        if(isRedirect)
            setIsRedirect(false);
        }, [isRedirect])

    return (
        <InputGroup className = "d-flex">
            <Form.Control className="form-control"
                    required 
                    type="search" 
                    placeholder="제목 검색"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyPress={e => enterPressEvent(e)} />
            <Button type="button" onClick={search}>검색</Button>
            {redirect()}
        </InputGroup>
        )
}

export default SearchBar