import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from '../css/components/MainMenu.module.css';

const MainMenu = ( ) => {

    const menuList = [
        {   name : '베스트',
            to : '/best',},
        {   name : '유료연재',
            to : '/paynovel',},
        {   name : '무료연재',
            to : '/freenovel',},
        {   name : '내서재',
            to : '/mynovel',},
    ]

    const menuItems = menuList.map( (menu, index) => <Col className ={style["main-menu-item"]} key={index}>
                                                <Link to = {menu.to} >{menu.name}</Link>
                                            </Col>)

    return (
        <Container className={style["main-menu"]}>
            {menuItems}
        </Container>
    );

}

export default MainMenu;