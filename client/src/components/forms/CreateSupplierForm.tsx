import React, { useState } from 'react';
import axios from 'axios';
import server from '../../server';

const CreateSupplier: React.FC = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('supplier');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${server}/invite-user`, { first_name, last_name, email, role } , {withCredentials  : true});
            setSuccess(response.data.message);
            setError('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error inviting user:', error.response ? error.response.data : error.message);
                setError(error.response ? error.response.data.error : 'Error inviting user.');
                setSuccess('');
            } else {
                console.error('Unexpected error:', error);
                setError('Unexpected error occurred.');
                setSuccess('');
            }
        }
    };

    return (
        <div className="flex items-center justify-center  mt-20 ">
            <div className="bg-white shadow-md rounded px-8 py-6  max-w-md w-full">
                <h2 className="text-lg font-bold mb-6 text-center">Invite a Supplier</h2>
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

export default CreateSupplier
