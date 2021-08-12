import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/components/NovelGenreMenu.module.css'

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
        <li key = {menu.name} className={style['novel-genre-menu__item']}>
            <Link to = {url + menu.to} > 
                {menu.name}
            </Link>
        </li>        
    );
            
    return (
            <div>
                <ul className = {style['novel-genre-menu']}>
                    {menuItems}
                </ul>
            </div>
            );
}

export default NovelGenreMenu;