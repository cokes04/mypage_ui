import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from '../css/components/NovelGenreMenu.module.css'

const NovelGenreMenu = ({url}) => {
    const menuList = [ 
                        { name : '전체',
                            to : '/all',},
                        {name : '판타지',
                            to : '/fantasy',},
                        {name : '로맨스',
                            to : '/romance',},
                        {name : '무협',
                            to : '/martial_arts', },
                    ]

    const menuItems = menuList.map( (menu, index) => <Col className ={style["novel-genre-menu-item"]} key={index}>
                                                 <Link to={url + menu.to}> {menu.name}</Link>
                                            </Col>)  
    return (
        <Row>
             {menuItems} 
        </Row>
        );
}

export default NovelGenreMenu;