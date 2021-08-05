import React from 'react';
import { Link } from 'react-router-dom';
import '../css/components/CategoryMenu.css'

const NovelGenreMenu = ({url}) => {
    const menuList = [
                        {
                            name : '판타지',
                            to : '/fantasy',
                        },
                        {

                            name : '로맨스',
                            to : '/romance',
                        },
                        {
                            name : '무협',
                            to : '/martial_arts',
                        },
                    ]

    const menuItems = menuList.map( (menu) => 
        <li key = {menu.name} className='category-menu-item'>
            <Link to = {url + menu.to} > 
                <span>{menu.name}</span>
            </Link>
        </li>        
    );
            
    return (
            <div>
                <ul className = "category-menu">
                    {menuItems}
                </ul>
            </div>
            );
}

export default NovelGenreMenu;