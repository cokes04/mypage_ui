import React from 'react';

const NovelPageButtons = ( {currentPage, totalNovelPage, setPage} ) => {

    const buttons = () => {

        const printButtonCount = 8;
        const pageButtons = [];
        
        const currentStartPage = parseInt( currentPage / printButtonCount ) * printButtonCount;
    
        const firstPage = 0;
        const firstStartPage = firstPage;

        const lastPage = totalNovelPage;
        const lastStartPage = parseInt( lastPage / printButtonCount ) * printButtonCount;


        if(currentStartPage !== firstStartPage){
            pageButtons.push(goFirstButton(firstStartPage));
            pageButtons.push(goBeforeButton(currentStartPage));
        }

        for(let i = currentStartPage;  i < currentStartPage + printButtonCount && i < totalNovelPage; i++){
            pageButtons.push(
                            <button key = {i} 
                                onClick = {  () => { if(currentPage !== i) setPage(i); }}>
                                {i+1}
                            </button>
                            );
        }
    
        if(currentStartPage < lastStartPage){
            pageButtons.push(goNextBution(currentStartPage, printButtonCount));
            pageButtons.push(goLastButton(lastPage));
        }

        return pageButtons;
    };

    const goFirstButton = (firstStartPage) => {
        return <button 
                    onClick = { () => setPage(firstStartPage) }>
                    맨앞
                </button>;
    };

    const goBeforeButton = (currentStartPage) => {
        return <button 
                    onClick = { () => setPage(currentStartPage - 1) }>
                    이전
                </button>;
    };

    const goNextBution = (currentStartPage, printButtonCount) => {
        return <button 
                    onClick = { () => setPage(currentStartPage + printButtonCount) }>
                    다음
                </button>;
    };

    const goLastButton = (lastPage) => {
        return <button 
                    onClick = { () => setPage(lastPage) }>
                    맨뒤
                </button>;
    };
    return (
        <div>
            {buttons()}
        </div>
    );

}

export default NovelPageButtons;