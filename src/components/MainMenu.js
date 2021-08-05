import React from 'react';
import { Link } from 'react-router-dom';
import '../css/components/MainMenu.css';

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
                                            <li key = {menu.name} className='main-menu-item'>
                                                <Link to = {menu.to} > 
                                                   <span>{menu.name}</span>
                                                </Link>
                                            </li>        
                                        );

    return (
        <div>
            <nav>
                <ul className = "main-menu">
                    {menuItems}
                </ul>
            </nav>
        </div>
    );

}

export default MainMenu;