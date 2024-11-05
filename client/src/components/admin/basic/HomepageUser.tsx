import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import UsersData from '../search/UserData';
import RecentUsers from './RecentUsers';
import RecentUserBar from '../user-bars/recent-user-bar';

const HomepageUser = () => {
    const { searchData, searchTerm } = useSelector((state: RootState) => state.search);

    return (
        <div className='shadow-lg p-2 w-full'>
            <RecentUserBar />
            {
                searchTerm && searchData.length ? (
                    <UsersData />
                ) : (
                    <RecentUsers />
                )
            }
        </div>
    )
}

export default HomepageUser;
