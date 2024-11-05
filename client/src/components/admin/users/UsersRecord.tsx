import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import RecentUserBar from "../user-bars/recent-user-bar";

const UsersRecords: React.FC = () => {
    const { users, loading, error } = useSelector((state: RootState) => state.user);
    return (
        <div className="p-6 bg-gray-50 mt-12 md:ml-8  md:max-w-full overflow-x-scroll lg:overflow-hidden max-w-[38rem] lg:max-w-full">
            <h2 className="text-lg text-center font-semibold mb-6 text-gray-800">User Records</h2>
            <RecentUserBar />
            {loading ? (
                <p className="text-lg text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-lg text-red-500">Error: {error}</p>
            ) : (
                <div className="">
                    <div className="inline-block min-w-full">
                        <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-lg">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
                                <tr>
                                    <th className="py-3 px-2 border-b font-semibold text-center">Name</th>
                                    <th className="py-3 px-2 border-b font-semibold text-center">Email</th>
                                    <th className="py-3 px-2 border-b font-semibold text-center">Role</th>
                                    <th className="py-3 px-2 border-b font-semibold text-center">Status</th>
                                    <th className="py-3 px-2 border-b font-semibold text-center">Actions</th>
                                    <th className="py-3 px-2 border-b font-semibold text-center">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-2 border-b text-center text-sm">
                                            {user.first_name} {user.last_name}
                                        </td>
                                        <td className="py-4 px-2 border-b text-center text-sm text-blue-600">
                                            <a href={`mailto:${user.email}`} className="hover:underline">
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="py-4 px-2 border-b text-center text-sm">
                                            <span className={`inline-block px-3 py-1 rounded-full font-medium uppercase text-xs ${user.role === "admin" ? " text-gray-600" : " text-violet-600"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 border-b text-center text-sm">
                                            <span className={`inline-block px-3 py-1 rounded-full font-medium uppercase text-xs ${user.status === "active" ? " text-green-600" : " text-blue-600"}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 border-b text-center text-sm">
                                            <Link to={`/admin-dashboard/user-details/${user._id}`} className="underline text-blue-500 hover:text-blue-700">View Details</Link>
                                        </td>
                                        <td className="py-4 px-2 border-b text-center text-sm">
                                            <Link to={""} className="">{new Date(user.createdAt).toLocaleDateString()} </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersRecords;
