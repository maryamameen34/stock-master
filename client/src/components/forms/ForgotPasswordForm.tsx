import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import server from '../../server';

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await axios.post(`${server}/forgot-password`, {
                email,
            }, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response.data.message || `Reset Pasword link send to ${email} email`);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className=''>
            <div className='lg:w-[40%] md:w-[70%] w-[90%] mt-10 p-9 md:p-14 lg:p-10 border bg-[#fff] shadow-lg mx-auto mb-4'>
                <div>
                    <p className='text-center text-lg font-bold mt-7'>Forgot Password</p>
                </div>
                {error && (
                    <p className="text-xs bg-red-100 mt-1 rounded-md mx-auto text-red-800 w-full text-center">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-xs bg-green-100 mt-1 rounded-md mx-auto text-green-800 w-full text-center">
                        {success}
                    </p>
                )}
                <form action="" method="post" onSubmit={handleSubmit}>
                    <div className='mt-8 '>
                        <label htmlFor="" className='font-medium text-sm text-gray-900'>Email:</label>
                        <input
                            className='w-full border-b mt-1 focus:outline-none text-sm py-1 rounded-sm'
                            type="email"
                            name='email'
                            value={email}
                            required
                            placeholder='Enter Email*'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='w-[50%] mx-auto py-2 mt-5 rounded-sm bg-indigo-700 hover:bg-indigo-600'>
                        <button className='mx-auto text-white w-full font-medium'>Send Email</button>
                    </div>
                </form>
            </div >
        </div>
    );
};

export default ForgotPasswordForm;
