import React, { useEffect, useState } from 'react';

const NovelRegisterPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [exclusive, setExclusive] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [ageGrade, setAgeGrade] = useState(-1);
    const [serialCycles, setSerialCycles] = useState([]);
    const [genres, setGenres] = useState([]);

    const max_title_length = 30;
    const max_description_length = 1000;  
    const max_genre_count = 2;

    useEffect(() => {console.log(title,description,exclusive,hidden,ageGrade,serialCycles,genres)})


    const register = () => {
        
    };

    const changeGenre = (genre) => {
        const index = genres.indexOf(genre);
        if(index === -1)
            setGenres([...genres, genre])
        else{
            if(genres.length === max_genre_count)
                console.log(genres.length);
            else{
                const newGenress = genres;
                newGenress.splice(index, 1);
                setGenres(newGenress);
            }
        }
    }

    const changeSerialCycles = (day) => {
        const index = serialCycles.indexOf(day);
        if(index === -1)
            setSerialCycles([...serialCycles, day])
        else{
            const newSerialCycles = serialCycles;
            newSerialCycles.splice(index, 1);
            setSerialCycles(newSerialCycles);
        }
    }

    const renderExclusiveBox = (name, exclusives, selectedItemIndex) => {
        return renderSelectBox(name, exclusives, selectedItemIndex, 'exclusive', setExclusive);
    }

    const renderHiddenBox = (name, hiddens, selectedItemIndex) => {
        return renderSelectBox(name, hiddens, selectedItemIndex, 'open', setHidden);
    }

    const renderAgeGradeBox = (name, ages, selectedItemIndex) => {
        return renderSelectBox(name, ages, selectedItemIndex, 'age-grade', setAgeGrade);
    };

    const renderSerialCycleBox = (name, days) => {
        return renderCheckbox(name, days, 'serial-cycle', changeSerialCycles);
    }

    const renderGenreBox = (name, genres) =>{
        return renderCheckbox(name, genres, 'genre', changeGenre);
    }

    const renderSelectBox = (name, items, selectedItemIndex, selectboxName, onChangeEvent) => {
        return(
            <div className={selectboxName}>
                <span>
                    {name}
                </span>
                <select name={selectboxName}
                    defaultValue = {items[selectedItemIndex].value}
                    onChange={e => onChangeEvent(e.target.value)}>
                    {items.map( (item, index) => 
                        <option value={item.value}
                            key={item.value}>
                            {item.text}
                        </option>
                        )}
                </select>
            </div>
        );
    }
    
    const renderCheckbox = (name, items, checkboxName, onClickEvent) => {
        return (
            <div className={checkboxName}>
                <span>
                    {name}
                </span>
                {items.map( (item) => 
                            <label key={item.value}>
                                {item.text} 
                                <input type = "checkbox" 
                                    name = {checkboxName}
                                    value={item.value} 
                                    onChange={e => onClickEvent(e.target.value)} />
                            </label>)}
            </div>
        )
    } 
    return (
        <div className='novel-create-box'>
            <div className='title'>
                작품 명 
                <input type = "text" 
                    placeholder="작품 명을 입력하시오 (30자 이하)"
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    size = {max_title_length+2}
                    maxLength = {max_title_length}/>
            </div>
            <div className='description'>
                작품 소개 
                <textarea
                    placeholder="소개글을 입력하시오 (1000자 이하)" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                    rows = '10'
                    cols = '100' 
                    maxLength = {max_description_length}/>
            </div>
            {renderExclusiveBox( '독점 여부', [
                { text : '독점', value : true},
                { text : '비독점', value : false},
            ], 1)}
            {renderHiddenBox( '공개 여부', [
                { text : '공개', value : false},
                { text : '비공개', value : true},
            ], 0)}
            {renderAgeGradeBox('연령대', [
                { text : '전체 이용가', value : -1},
                { text : '7세 이용가', value : 7},
                { text : '12세 이용가', value : 12},
                { text : '15세 이용가', value : 15},
                { text : '19세 이용가', value : 19},
            ], 0)} 
            {renderSerialCycleBox('연재 주기', [
                {text : '월', value : '월'},
                {text : '화', value : '화'},
                {text : '수', value : '수'},
                {text : '목', value : '목'},
                {text : '금', value : '금'},
                {text : '토', value : '토'},
                {text : '일', value : '일'},
            ])}
            {renderGenreBox('장르', [
                {text : '판타지', value : 'fantasy'},
                {text : '무협', value : 'martial_arts'},
                {text : '로맨스', value : 'romance'},
            ])}    
            <button onClick={register}>
                등록
            </button>         
        </div>
    );
}

export default NovelRegisterPage;