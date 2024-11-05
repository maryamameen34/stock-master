// components/UserDetails.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchUserById } from '../../../redux/userSlice';
import { AppDispatch, RootState } from '../../../store';
import { FaAngleRight } from 'react-icons/fa';


const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.user);
    useEffect(() => {
        dispatch(fetchUserById(id as string));
    }, [dispatch, id]);

    return (
        <div className=' mt-24'>
            <div className='flex items-center justify-between mb-11 lg:px-12'>
                <div>
                    <p className='font-medium text-lg'>User Details</p>
                </div>
                <div className='flex items-center'>
                    <Link to={"/admin-dashbaord"} className='hover:text-indigo-600 hover:underline '>Dashboard</Link> <FaAngleRight /><Link to={"/admin-dashboard/users/users-record"}  className='hover:text-indigo-600 hover:underline '>Users</Link> <FaAngleRight /> <p>User Details</p>
                </div>
            </div>
            <div className="p-4  mx-auto bg-white rounded-md shadow-md  max-w-md">

                {user ? (
                    <div>
                        <h1 className="text-2xl font-semibold">{user.first_name} {user.last_name}</h1>
                        <p className="text-gray-700">{user.email}</p>
                        <p className="text-gray-500 mt-2">Role: {user.role}</p>
                        <p className="text-gray-500 mt-2">Status: {user.status}</p>
                        <p className='text-gray-500 mt-2'>Created At : {new Date(user.createdAt).toLocaleDateString()} </p>
                    </div>
                ) : (
                    <p>User details not available.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
