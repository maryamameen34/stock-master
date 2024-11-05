import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import UserSearch from "../search/UserSearch";

const UsersData: React.FC = () => {
    const { searchData } = useSelector((state: RootState) => state.search);
    const { loading, error } = useSelector((state: RootState) => state.user);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <div className="inline-block min-w-full">
                        <p>Searched Users Result...</p>

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
                                {searchData.map((user) => (
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersData;
