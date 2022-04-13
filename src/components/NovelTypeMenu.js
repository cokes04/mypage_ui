import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from '../css/components/NovelTypeMenu.module.css'

const NovelTypeMenu = ({url}) => {
    const menuList = [
                        {name : '전체',
                            to : "/all",},
                        { name : '신작',
                            to : "/new", },
                        {name : '연재',
                            to : "/run",},
                        {name : '완결',
                            to : "/finish",},
                    ]

    const menuItems = menuList.map( (menu, index) => <Col className ={style["novel-type-menu-item"]} key={index}>
                                                        <Link to={url + menu.to}> {menu.name}</Link>
                                                     </Col>)      
    return (
        <Row>
             {menuItems} 
        </Row>
        );
}

export default NovelTypeMenu;