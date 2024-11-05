import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { TfiAngleDoubleLeft, TfiAngleDoubleRight } from "react-icons/tfi";

const RecentUsers: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="md:ml-8 md:max-w-full overflow-x-visible lg:overflow-hidden max-w-[38rem] lg:max-w-full">
            <p>Recent Users</p>
            {loading ? (
                <p className="text-lg text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-lg text-red-500">Error: {error}</p>
            ) : (
                <div>
                    <div className="inline-block min-w-full">
                        <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-lg">
                            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                                <tr>
                                    <th className="py-3 px-2 border-b font-semibold text-center text-xs">Name</th>
                                    <th className="py-3 px-2 border-b font-semibold text-center text-xs">Email</th>
                                    <th className="py-3 px-2 border-b font-semibold text-center text-xs">Role</th>
                                    <th className="py-3 px-2 border-b font-semibold text-center text-xs">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-2 border-b text-center text-xs">
                                            {user.first_name} {user.last_name}
                                        </td>
                                        <td className="py-4 px-2 border-b text-center text-xs text-blue-600">
                                            <a href={`mailto:${user.email}`} className="hover:underline">
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="py-4 px-2 border-b text-center text-xs">
                                            <span className={`inline-block rounded-full font-medium uppercase text-xs ${user.role === "admin" ? "text-cyan-600" : "text-violet-600"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 border-b text-center text-xs">
                                            <span className={`inline-block px-3 py-1 rounded-full font-medium uppercase text-xs ${user.status === "active" ? "text-green-600" : "text-blue-600"}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination controls */}
                        <div className="flex justify-center items-center mt-6 mb-4 space-x-3">
                            <TfiAngleDoubleLeft className="opacity-85 text-gray-600 text-lg" />
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 py-1 rounded-lg ${index + 1 === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <TfiAngleDoubleRight className="opacity-85 text-gray-600 text-lg" />

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentUsers;
