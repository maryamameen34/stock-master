import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import store, { RootState } from "../../../store";
import { fetchSuppliers } from "../../../redux/userSlice";
import { Link } from "react-router-dom";
import DeleteUser from "../users/delete-user";
import { backendUrl } from "../../../server";

const SupplierList: React.FC = () => {
  const { suppliers, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    store.dispatch(fetchSuppliers());
  }, []);

  if (loading) {
    return <div>Loading suppliers...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="mt-20 pl-16">
      <h2 className="text-xl font-semibold text-gray-700">Supplier List</h2>
      <div className="text-end ml-auto right-0   pr-7 mb-4">
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as "table" | "grid")}
          className="p-2 border rounded text-gray-600"
        >
          <option value="table">Table View</option>
          <option value="grid">Grid View</option>
        </select>
      </div>

      {viewMode === "grid" ? (
        <div className="grid lg:mx-0 md:mx-0 mx-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {suppliers.map((supplier: any) => (
            <div
              key={supplier.id}
              className="border rounded-sm lg:p-3 md:p-3 p-8 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              {user && user.profile_pic ? (
                <>
                  <img
                    src={`${backendUrl}/${user.profile_pic}`}
                    className="w-24 h-24 mx-auto rounded-full"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                    className="w-24 h-24 mx-auto rounded-full"
                    alt=""
                  />
                </>
              )}

              <p className="font-semibold text-center lg:px-0 md:px-0 px-4 truncate text-gray-900 mb-2 mt-3">
                {supplier.first_name} {supplier.last_name}{" "}
              </p>
              <p className="text-[12px] text-indigo-500 text-center">
                {supplier.email}{" "}
              </p>

              <div className="flex mt-5  lg:pl-0 md:pl-0 pl-4 items-center justify-between text-sm font-medium opacity-85">
                <p className="font-medium">Role:</p>
                <p>{supplier.role} </p>
              </div>
              <div className="flex  lg:pl-0 md:pl-0 pl-4 items-center justify-between text-sm font-medium opacity-85">
                <p className="font-medium">Status:</p>
                <p className="text-xs">{supplier.status} </p>
              </div>
              <div className="flex  lg:pl-0 md:pl-0 pl-4 items-center justify-between text-sm font-medium opacity-85">
                <p className="font-medium">Created At:</p>
                <p className="text-xs">
                  {new Date(supplier.createdAt).toLocaleDateString()}{" "}
                </p>
              </div>
              <div className="flex justify-between items-center mt-5 lg:px-0 md:px-0 px-4">
                <Link
                  to={`/admin-dashboard/user-details/${supplier._id}`}
                  className="p-3 bg-blue-50 text-blue-700 font-semibold rounded-sm shadow-md hover:bg-blue-100 transition duration-300"
                >
                  <FaRegEye />
                </Link>
                <div className="flex gap-2">
                  <Link
                    to={`/admin-dashboard/edit-user/${supplier._id}`}
                    className="p-3 bg-blue-50 text-blue-700 font-semibold rounded-full shadow-md hover:bg-blue-100 transition duration-300"
                  >
                    <CiEdit />
                  </Link>
                  {user && user.role === "admin" && (
                    <DeleteUser user={supplier} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-[1160px]  overflow-x-auto p-4">
          <table className="w-full min-w-[1120px] bg-white border border-gray-200 shadow-lg rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-3 text-center border-b border-gray-300 text-gray-600 font-medium">
                  <input type="checkbox" className="mx-auto" />
                </th>
                <th className="py-3 px-3 text-left text-gray-600 font-medium">
                  Image
                </th>
                <th className="py-3 px-3 text-left text-gray-600 font-medium">
                  Name <HiMiniArrowsUpDown className="inline ml-2" />
                </th>
                <th className="py-3 px-3 text-left text-gray-600 font-medium">
                  Email <HiMiniArrowsUpDown className="inline ml-2" />
                </th>
                <th className="py-3 px-3 text-left text-gray-600 font-medium">
                  Role <HiMiniArrowsUpDown className="inline ml-2" />
                </th>
                <th className="py-3 px-3 text-left text-gray-600 font-medium">
                  Status <HiMiniArrowsUpDown className="inline ml-2" />
                </th>
                <th className="py-3 px-3 text-left text-gray-600 font-medium">
                  Created At <HiMiniArrowsUpDown className="inline ml-2" />
                </th>
                <th className="py-3 px-3 text-left text-gray-600 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier: any) => (
                <tr
                  key={supplier.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="text-center py-2 px-3">
                    <input type="checkbox" className="p-1" />
                  </td>
                  <td className="py-2 px-3">
                    <img
                      src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                      className="w-16 h-16 rounded-full"
                      alt=""
                    />
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-800 font-medium">
                    {supplier.first_name} {supplier.last_name}
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-700">
                    {supplier.email}
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-700">
                    {supplier.role}
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-700">
                    {supplier.status}{" "}
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-700">
                    {new Date(supplier.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex  items-center py-2 px-3 space-x-2 text-sm">
                    <Link
                      to={`/admin-dashboard/user-details/${supplier._id}`}
                      className="p-2 bg-violet-50 text-violet-700 rounded-full shadow-sm hover:bg-violet-100 transition duration-300"
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      to={`/admin-dashboard/edit-user/${supplier._id}`}
                      className="p-3 bg-blue-50 text-blue-700 font-semibold rounded-full shadow-md hover:bg-blue-100 transition duration-300"
                    >
                      <CiEdit />
                    </Link>
                    {user && user.role === "admin" && (
                      <DeleteUser user={supplier} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SupplierList;
