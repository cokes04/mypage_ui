import {Button, ButtonToolbar, Row} from 'react-bootstrap';

const PageButtons = ( {printButtonCount, currentPage, totalPage, setPage} ) => {

    const buttons = () => {
        const pageButtons = [];
        const frist = currentPage - printButtonCount > 0 ? currentPage - printButtonCount : 0 

        for(let i = frist;  i < currentPage + printButtonCount+1 && i < totalPage; i++){
            pageButtons.push(<Button key = {i}  onClick = {  () => { if(currentPage !== i) setPage(i); }}>
                                {i+1}
                             </Button>)
        }

        return pageButtons;
    };

    return (
            <Row>
                <ButtonToolbar className="justify-content-center">
                    {currentPage != 0 ? <Button onClick = { () => setPage(0) }>처음</Button> : <></>}
                    {buttons()}
                    { totalPage != 0 && currentPage != totalPage-1? <Button onClick = { () => setPage(totalPage-1)}>마지막</Button> : <></>}
                </ButtonToolbar>
                
                <ButtonToolbar className="justify-content-center">
                    { currentPage > 0 ? <Button  onClick = { () => setPage(currentPage - 1) }>이전</Button> : <></>}
                    { currentPage < totalPage-1 ? <Button  onClick = { () => setPage(currentPage + 1) }>다음</Button> : <></>}
                    
                </ButtonToolbar>
            </Row>
        
    );

}

export default PageButtons;