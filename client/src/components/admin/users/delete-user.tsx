import React from 'react'
import { deleteUser } from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { MdDelete } from 'react-icons/md';

interface DeleteProps {
    user: any
}
const DeleteUser: React.FC<DeleteProps> = ({ user }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleDelete = (userId: any) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(userId))
                .unwrap() // Optional: to handle fulfilled/rejected directly
                .then(() => {
                    console.log('User deleted successfully');
                })
                .catch((error) => {
                    console.error('Failed to delete user:', error);
                });
        }
    };
    return (
        <div>
            <button className="p-2 mt-1  bg-red-50 text-red-700 rounded-full shadow-sm hover:bg-red-100 transition duration-300" onClick={() => handleDelete(user._id)}><MdDelete className='text-lg' /></button>
        </div>
    )
}

export default DeleteUser