// src/components/WarehouseList.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import store, { RootState } from "../../../store";
import {
  deleteWarehouse,
  fetchWarehouses,
} from "../../../redux/warehouseSlice";

const WarehouseList: React.FC = () => {
  const { warehouses, loading, error } = useSelector(
    (state: RootState) => state.warehouse
  );
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    store.dispatch(fetchWarehouses());
  }, []);
  const handleDelete = (id: string) => {
    store.dispatch(deleteWarehouse(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-20">
      <h2 className="text-xl font-medium mb-2">Warehouse List</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Capacity</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse: any) => (
            <tr key={warehouse._id}>
              <td className="border border-gray-300 p-2">{warehouse.name}</td>
              <td className="border border-gray-300 p-2">
                {warehouse.location}
              </td>
              <td className="border border-gray-300 p-2">
                {warehouse.capacity}
              </td>
              <td className=" flex items-center justify-center space-x-2 border border-gray-300 p-2">
                <Link
                  to={`/admin-dashboard/ware-house-details/${warehouse._id}`}
                  className="p-3 bg-gray-50 text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                >
                  <FaEye />
                </Link>
                {user && user.role === "admin" && (
                  <>
                    <Link
                      to={`/admin-dashboard/update-ware-house/${warehouse._id}`}
                      className="p-3 bg-indigo-50 text-indigo-700 font-semibold rounded-full shadow-md hover:bg-indigo-100 transition duration-300"
                    >
                      <CiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(warehouse._id)}
                      className="p-3 bg-red-50 text-red-700 font-semibold rounded-full shadow-md hover:bg-red-100 transition duration-300"
                    >
                      <MdDelete />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseList;
