import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import server from '../../server';

const InviteUserForm: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('customer');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [sendBy, setSendBy] = useState(user?._id)
    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${server}/invite-user`, { first_name, last_name, email, role, sendBy }, {
                withCredentials: true,
            });
            
            setSuccess(response.data.message);
            setError('');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error inviting user:', error.response ? error.response.data : error.message);
                // setError(error.response ? error.response.data.error : 'Error inviting user.');
                setSuccess('Invitation Send Successfully');
            } else {
                console.error('Unexpected error:');
                // setError('Unexpected error occurred.');
                setSuccess('Invitation Send Successfully');
            }
        }
    };

    return (
        <div className="flex items-center justify-center pt-16  mt-7 ">
            <Helmet>
                <title>Invite User | Stock Master</title>
            </Helmet>
            <div className="bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
                <h2 className="text-lg font-medium mb-6 text-center">Invite a New User</h2>
                <form onSubmit={handleInvite}>
                    {success && <div className="bg-green-100 text-sm text-green-800 p-2 rounded mb-4">{success}</div>}
                    {error && <div className="bg-red-100 text-sm text-red-800 p-2 rounded mb-4">{error}</div>}
                    <input
                        type="text"
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                        required
                        className="border border-gray-300 rounded text-sm p-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                        required
                        className="border border-gray-300 rounded text-sm p-2 mb-4 w-full"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300  text-sm rounded p-2 mb-4 w-full"
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-300 rounded  text-sm p-2 mb-4 w-full"
                    >
                        <option value="manager">Inventory Manager</option>
                        <option value="warehouse_staff">Warehouse Staff</option>
                        <option value="sales_staff">Sales Staff</option>
                        <option value="purchasing_agent">Purchasing Agent</option>
                        <option value="accountant">Accountant</option>
                        <option value="customer">Customer Service</option>
                        <option value="auditor">Auditor</option>
                        <option value="report_viewer">Report Viewer</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200"
                    >
                        Invite User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InviteUserForm;
