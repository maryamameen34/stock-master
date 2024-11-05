import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser } from '../../redux/userSlice';
import { AppDispatch, RootState } from '../../store';
import { User } from '../../redux/types/types';


type UserFormData = Pick<User, "_id" | "first_name" | "last_name" | "email" | "role" | "status">;

const EditUserForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<UserFormData>({
        _id: id || '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        status: ''
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (user && user._id === id) {
            setFormData({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                status: user.status
            });
        }
    }, [user, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            try {
                await dispatch(updateUser({ id, updatedData: formData }));
                navigate('/admin-dashboard/users/users-record');
            } catch (err) {
                console.error("Failed to update user", err);
            }
        }
    };

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='lg:px-10 shadow-lg border py-5 mt-10 rounded-md px-4'>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="first_name" className="block font-semibold">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="last_name" className="block font-semibold">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block font-semibold">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block font-semibold">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    >
                        <option value="admin">Admin</option>
                        <option value="supplier">Supplier</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status" className="block font-semibold">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">Save Changes</button>
            </form>
        </div>
    );
};

export default EditUserForm;
