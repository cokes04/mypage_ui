import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({logout}) => {
    

    return (
            <div>  
                    <Link to = '/my_creation'>
                        <div>내 작품관리</div>
                    </Link>
                    <Link to = '/charge'>
                        <div>캐시 충전</div>
                    </Link>

                    <div onClick={logout}>
                        로그아웃
                    </div>
            </div>
            );
}

export default Profile;