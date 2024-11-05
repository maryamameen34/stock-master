import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import server from '../../server';

const CompleteRegistrationForm: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const handleComplete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }
        try {
            const response = await axios.post(`${server}/complete-registration/${token}`, { password });
            setSuccess(response.data.message);
            setError('');
            setTimeout(() => {
                navigate("/")
            }, 3000);
        } catch (error: any) {
            console.error('Error completing registration:', error.message);
            setError('Error completing registration.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Helmet>
                <title>Complete Registration | Stock Master</title>
            </Helmet>
            <div className="bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
                <h2 className="text-lg font-semibold mb-6 text-center">Complete Your Registration</h2>
                <form onSubmit={handleComplete}>
                    {success && <div className="bg-green-100 text-sm text-center text-green-800 p-2 rounded mb-4">{success}</div>}
                    {error && <div className="bg-red-100 text-center text-sm text-red-800 p-2 rounded mb-4">{error}</div>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-300 rounded p-2 mb-4 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border border-gray-300 rounded p-2 mb-4 w-full"
                    />
                    <button type="submit" className="bg-blue-500 font-medium text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200">
                        Complete Registration
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompleteRegistrationForm;
