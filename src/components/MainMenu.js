import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/components/MainMenu.module.css';

const MainMenu = ( ) => {

    const menuList = [
        {

            name : '베스트',
            to : '/best',
        },
        {

            name : '유료연재',
            to : '/paynovel',
        },
        {

            name : '무료연재',
            to : '/freenovel',
        },
        {

            name : '내서재',
            to : '/mynovel',
        },

        {

            name : '공지사항',
            to : '/notice',
        },
    ]

    const menuItems = menuList.map( (menu) => 
                                            <li className={style['main-menu__item']}
                                                key = {menu.name} >
                                                <Link to = {menu.to} > 
                                                   {menu.name}
                                                </Link>
                                            </li>        
                                        );

    return (
        <div className={style['main-menu-container']}>
            <nav>
                <ul className = {style["main-menu"]}>
                    {menuItems}
                </ul>
            </nav>
        </div>
    );

}

export default MainMenu;