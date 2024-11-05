import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { backendUrl } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../store";
import { placeOrder } from "../../redux/orderSlices";

interface OverViewProps {
  toggleOverView: () => void;
  product: any;
}

const OverView: React.FC<OverViewProps> = ({ toggleOverView, product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedImage, setSelectedImage] = useState(
    `${backendUrl}/${product.additional_images[0].replace(/\\/g, "/")}`
  );
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const [quantity, setQuantity] = useState(1);
  const { status: orderStatus } = useSelector((state: RootState) => state.order);
  const handleOrderNow = () => {
    store.dispatch(
      placeOrder({
        productId: product._id,
        quantity,
        userId: user?._id as string,
      })
    );
  };
  return (
    <>
      <div className="animation z-20 fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white p-5 border-gray-400 border-2 rounded-lg shadow-lg relative w-[95%] lg:max-w-[67%] max-h-[26rem]  mx-auto transform transition-transform duration-500 ease-in-out scale-100">
          <div className="flex justify-between items-center">
            <p className="font-semibold lg:px-0 md:px-0 px-4 truncate text-gray-900 mb-2 mr-8">
              {product.title}
            </p>
            <button className="animation text-black" onClick={toggleOverView}>
              ✕
            </button>
          </div>
          <div className="flex mt-3">
            <div className="w-[40%]">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-48 lg:h-56 sm:w-full pr-3 object-center rounded-md mb-4"
              />

              <div className="flex gap-1 mx-1  overflow-x-auto">
                {product.additional_images.map(
                  (image: string, index: number) => (
                    <img
                      key={index}
                      src={`${backendUrl}/${image.replace(/\\/g, "/")}`}
                      alt={`${product.title} additional image ${index + 1}`}
                      className="min-w-16 min-h-16 border object-center cursor-pointer"
                      onClick={() =>
                        setSelectedImage(
                          `${backendUrl}/${image.replace(/\\/g, "/")}`
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>
            <div className="w-[60%]">
              <p className="text-gray-500 pl-6  mb-2 text-xs font-medium lg:px-0 md:px-0 px-3 line-clamp-2">
                {product.description.replace(/<[^>]*>?/gm, "")}
              </p>
              <p className="font-medium pl-4">
                Price:{" "}
                <del className="text-red-600">{product.salePrice} PKR</del>{" "}
                {product.price} PKR
              </p>
              <p className="font-medium pl-4 text-xs mt-1">
                {product.discount}% Discount{" "}
              </p>
              <p className="font-medium pl-4 text-xs ">
                {" "}
                Brand: {product.brand} | {product.category}{" "}
              </p>
              <p className=" pl-2 text-xs mt-3 flex items-center space-x-1 overflow-hidden mb-4">
                {" "}
                <p className="hidden font-medium mr-1 text-sm lg:block md:block">
                  Variants:
                </p>{" "}
                {product.variants ? (
                  Array.isArray(product.variants) ? (
                    product.variants[0]
                      .split(",")
                      .map((variant: any, index: any) => {
                        const trimmedVariants = variant.trim();
                        const tagClasses = "bg-gray-200 text-gray-600";
                        return (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 mt-1 rounded-full ${tagClasses}`}
                          >
                            {trimmedVariants}
                          </span>
                        );
                      })
                  ) : (
                    <p className="text-gray-600">Invalid tags format</p>
                  )
                ) : (
                  <p className="text-gray-600">No tags available</p>
                )}{" "}
              </p>
              <div className="flex items-center mt-2 pl-4">
                <label htmlFor="quantity" className="mr-2 font-medium text-sm">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-12 text-center border rounded-md"
                />
              </div>
              <div className="lg:flex col-auto gap-2 mt-3 space-y-2">
                {user?.role === "customer" && (
                  <button
                    onClick={handleOrderNow}
                    className="flex py-1 text-center justify-center w-full items-center gap-2 bg-blue-50 text-blue-700 font-semibold rounded-md shadow-md hover:bg-blue-100 transition duration-300"
                    disabled={orderStatus === "processing" || orderStatus === "pending"} 
                  >
                    <p className="">Order Now</p> <FaShoppingCart />
                  </button>
                )}
                <Link
                  to={`/admin-dashboard/product-details/${product._id}`}
                  className="flex  py-2 mx-3 text-center justify-center w-full items-center gap-2 bg-violet-50 text-violet-700 font-semibold rounded-md shadow-md hover:bg-violet-100 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverView;
