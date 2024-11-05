

import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserSearchResults, setSearchTerm } from '../../../redux/searchSlice';
import { AppDispatch } from '../../../store';
import { FaSearch } from 'react-icons/fa';

const UserSearch: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        dispatch(setSearchTerm(searchTerm));
        dispatch(fetchUserSearchResults(searchTerm));
    };

    return (
        <div className='flex items-center space-x-2 '>
            <FaSearch />
            <input
                type="text"
                placeholder="Search users..."
                onChange={handleSearchChange}
                className="border-none rounded p-2 border-b border-indigo-400 focus:outline-none  "
            />
        </div>
    );
};

export default UserSearch;
