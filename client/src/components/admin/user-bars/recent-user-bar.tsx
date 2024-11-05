

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { fetchUsers } from '../../../redux/userSlice';
import FilterUsers from '../filter/FilterUser';
import UserSearch from '../search/UserSearch';

const RecentUserBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [sortCriteria, setSortCriteria] = useState<{
        field: "name" | "role" | "status";
        order: "asc" | "desc";
    }>({ field: "name", order: "asc" });

    useEffect(() => {
        dispatch(fetchUsers({ field: sortCriteria.field, order: sortCriteria.order }));
    }, [dispatch, sortCriteria]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = e.target.value.split("-");
        setSortCriteria({
            field: field as "name" | "role" | "status",
            order: order as "asc" | "desc",
        });
    };

    return (
        <div className='flex items-center justify-between mt-10 mb-2 lg:px-11 px-4'>
            <UserSearch />
            <FilterUsers handleSortChange={handleSortChange} />
        </div>
    )
}

export default RecentUserBar