import React  from 'react';
import '../css/components/BooksMenu.css'
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
        <li key = {menu.name} className='books-menu-item'>
            <Link to={url + menu.to}> 
                <span>{menu.name}</span>
            </Link>
        </li>        
        );

    return (
            <div>
                <div>
                    <ul className = "books-menu">
                        {menuItems}
                    </ul>
                </div>
            </div>
);

}

export default NovelTypeMenu;