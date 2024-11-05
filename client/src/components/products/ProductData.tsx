import React from "react";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import OverView from "./OverView";
import { backendUrl } from "../../server";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { deleteProduct } from "../../redux/productSlice";

interface ProductDataProps {
  viewMode: "grid" | "table";
  selectedProduct: any;
  toggleOverView: (product: any) => void;
  products: object[];
  truncateTitle: (title: string, wordLimit: number) => string;
  showOverview: boolean;
  setShowOverview: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProductData: React.FC<ProductDataProps> = ({
  viewMode,
  selectedProduct,
  toggleOverView,
  products,
  truncateTitle,
  showOverview,
  setShowOverview,
}) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
    store.dispatch(deleteProduct(productId)); // Dispatch the delete action
    }
  };
  return (
    <div>
      <div className="mx-auto   p-2 mt-2">
        {viewMode === "grid" ? (
          <div className="grid lg:mx-0 md:mx-0 mx-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="border rounded-sm lg:p-3 md:p-3 p-8 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                <img
                  src={`${backendUrl}/${product.main_image.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={product.title}
                  className="w-[60%] h-52 lg:h-44 mx-auto object-center rounded-lg mb-4 transition-transform transform hover:scale-105"
                />
                <p className="font-semibold lg:px-0 md:px-0 px-4 truncate text-gray-900 mb-2">
                  {product.title}
                </p>
                <p className="text-gray-500 mb-2 text-xs font-medium lg:px-0 md:px-0 px-4 line-clamp-2">
                  {product.description.replace(/<[^>]*>?/gm, "")}
                </p>
                <div className="flex items-center lg:pl-0 md:pl-0 pl-4 text-sm font-medium opacity-85">
                  <p className="font-medium">Price:</p>
                  <p>
                    {" "}
                    <del>{product.salePrice} PKR.</del> {product.price} PKR.{" "}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3 lg:px-0 md:px-0 px-4">
                  <button
                    className="p-3 bg-blue-50 text-blue-700 font-semibold rounded-sm shadow-md hover:bg-blue-100 transition duration-300"
                    onClick={() => toggleOverView(product)}
                  >
                    <FaRegEye />
                  </button>

                  {(user && (user.role === "admin" || user.role === "manager")) && (
                    <div className="flex gap-2">
                      <Link
                        to={`/admin-dashboard/update-product/${product._id}`}
                        className="p-3 bg-blue-50 text-blue-700 font-semibold rounded-full shadow-md hover:bg-blue-100 transition duration-300"
                      >
                        <CiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-3 bg-red-50 text-red-700 font-semibold rounded-full shadow-md hover:bg-red-100 transition duration-300"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-full overflow-x-auto p-4">
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
                    Title <HiMiniArrowsUpDown className="inline ml-2" />
                  </th>
                  <th className="py-3 px-3 text-left text-gray-600 font-medium">
                    SKU <HiMiniArrowsUpDown className="inline ml-2" />
                  </th>
                  <th className="py-3 px-3 text-left text-gray-600 font-medium">
                    Brand <HiMiniArrowsUpDown className="inline ml-2" />
                  </th>
                  <th className="py-3 px-3 text-left text-gray-600 font-medium">
                    Price <HiMiniArrowsUpDown className="inline ml-2" />
                  </th>
                  <th className="py-3 px-3 text-left text-gray-600 font-medium">
                    Quantity <HiMiniArrowsUpDown className="inline ml-2" />
                  </th>
                  <th className="py-3 px-3 text-left text-gray-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="text-center py-2 px-3">
                      <input type="checkbox" className="p-1" />
                    </td>
                    <td className="py-2 px-3">
                      <img
                        src={`${backendUrl}/${product.main_image.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-800 font-medium">
                      {truncateTitle(product.title, 4)}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-700">
                      {product.sku}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-700">
                      {product.brand}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-700">
                      {product.price} PKR.{" "}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-700">
                      {product.stockQuantity}
                    </td>
                    <td className="py-2 flex items-center px-3 space-x-2 text-sm">
                      <button
                        onClick={() => toggleOverView(product)}
                        className="p-2 bg-violet-50 text-violet-700 rounded-full shadow-sm hover:bg-violet-100 transition duration-300"
                      >
                        <FaRegEye />
                      </button>
                      {(user && (user.role === "admin" || user.role === "manager")) && (
                        <>
                          <Link
                            to={`/admin-dashboard/update-product/${product._id}`}
                            className="p-2 bg-blue-50 text-blue-700 rounded-full shadow-sm hover:bg-blue-100 transition duration-300"
                          >
                            <CiEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 bg-red-50 text-red-700 rounded-full shadow-sm hover:bg-red-100 transition duration-300"
                          >
                            <MdDeleteForever />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showOverview && selectedProduct && (
          <OverView
            toggleOverView={() => setShowOverview(false)}
            product={selectedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ProductData;
