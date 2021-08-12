import React  from 'react';
import style from '../css/components/NovelTypeMenu.module.css'
import { Link } from 'react-router-dom';

const NovelTypeMenu = ({url}) => {
    const menuList = [
                        {
                            name : '전체',
                            to : "/all",
                        },
                        {

                            name : '신작',
                            to : "/new",
                        },
                        {

                            name : '완결',
                            to : "/end",
                        },
                    ]

    const menuItems = menuList.map( (menu) => 
        <li key = {menu.name} className={style['novel-type-menu__item']}>
            <Link to={url + menu.to}> 
                {menu.name}
            </Link>
        </li>        
        );

    return (
            <div className={style['novel-type-menu-container']}>
                <nav>
                    <ul className = {style["novel-type-menu"]}>
                        {menuItems}
                    </ul>
                </nav>
            </div>
);

}

export default NovelTypeMenu;