import React from 'react';
import { Link } from 'react-router-dom';

const NovelInfo = ({num, title, author }) => {
    return (
        <div>
            <Link to='/novel' >
                <div>{num}</div>
                <div>{title}</div>
                <div>{author}</div>
            </Link>
        </div>
    );
};

export default NovelInfo;