import React, { useEffect } from 'react';

const Notice = () => {
    useEffect( () => {/*공지가져와서 저장*/} );
    return (
        <div>
            <div>공지사항</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span>번호</span>
                            </th>
                            <th>
                                <span>글 제목</span>
                            </th>
                            <th>
                                <span>작성자</span>
                            </th>
                            <th>
                                <span>조회</span>
                            </th>
                            <th>
                                <span>날짜</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Notice;