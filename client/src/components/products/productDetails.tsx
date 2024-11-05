import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { backendUrl } from "../../server";
import { fetchProductById } from "../../redux/productSlice";
import { FaAngleRight } from "react-icons/fa";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();

    const { product } = useSelector((state: RootState) => state.product);
    const loading = useSelector((state: RootState) => state.product.loading);
    const error = useSelector((state: RootState) => state.product.error);
    const [selectedImage, setSelectedImage] = useState(
        product?.additional_images ? `${backendUrl}/${product.additional_images[0].replace(/\\/g, '/')}` : ""
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading product details: {error}</p>;

    return (
        <div className="product-details-container mx-auto bg-white p-6 rounded-lg shadow-lg max-w-4xl mt-10">
            {product ? (
                <div>
                    <div className="flex flex-col lg:flex-row">
                        {/* Left section: Images */}
                        <div className="lg:w-1/2 flex flex-col items-center">
                        <div className="flex gap-1 mx-1  overflow-x-auto mb-2">
                                {product.additional_images?.map((image: string, index: number) => (
                                    <img
                                        key={index}
                                        src={`${backendUrl}/${image.replace(/\\/g, '/')}`}
                                        alt={`${product.title} additional image ${index + 1}`}
                                        className="min-w-20 min-h-20  cursor-pointer border-2 border-gray-200 rounded-md"
                                        onClick={() =>
                                            setSelectedImage(`${backendUrl}/${image.replace(/\\/g, '/')}`)
                                        }
                                    />
                                ))}
                            </div>
                            <img
                                src={selectedImage}
                                alt={product.title}
                                className="w-full h-[350px]  border rounded-md shadow-sm"
                            />
                        </div>

                        {/* Right section: Product Information */}
                        <div className="lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
                            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                            <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
                            {/* Pricing and Discount */}
                            <div className="flex items-center mb-4">
                                <span className="text-xl font-medium text-green-600 mr-2">${product.salePrice || product.price}</span>
                                {product.discount > 0 && (
                                    <span className="text-sm text-gray-500 line-through">${product.price}</span>
                                )}
                            </div>


                            {/* Product Details Table */}
                            <table className="table-auto w-full text-sm text-left text-gray-700 mb-6">
                                <tbody className="">
                                    <tr>
                                        <td className="font-semibold">Category</td>
                                        <td className="flex items-center space-x-1"> {product.main_category}  <FaAngleRight className="" /> {product.category}  <FaAngleRight /> {product.subcategory}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Brand</td>
                                        <td>{product.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Tags</td>
                                        <td>{product.tags}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Unit</td>
                                        <td>{product.unit}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Stock Quantity</td>
                                        <td>{product.stockQuantity}</td>
                                    </tr>
                                    <tr className="py-2">
                                        <td className="font-semibold">Attributes</td>
                                        <td>{product.attributes}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Variants</td>
                                        <td>{product.variants}</td>
                                    </tr>
                                    <tr className="py-2">
                                        <td className="font-semibold">Specifications</td>
                                        <td>{product.specifications}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <hr />

                        </div>

                    </div>
                    <div className="lg:flex md:flex col-auto mt-5  space-x-4 justify-between">
                        <div className="lg:w-[50%] pt-5 w-full" >
                            <p className="py-3 text-lg font-semibold ">About this Inventory </p>
                            <p
                                className="text-gray-700 mb-4"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />

                        </div>
                        {/* Shipping, Warranty, and Return Info */}
                        <div className="lg:border-none md:border-none border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium mb-2">Shipping & Warranty</h3>
                            <p><strong>Shipping Options:</strong> {product.shipping_options}</p>
                            <p><strong>Shipping Dimensions:</strong> {product.shipping_dimentions}</p>
                            <p><strong>Shipping Cost:</strong> ${product.shipping_cost}</p>
                            <p><strong>Handling Time:</strong> {product.handling_time}</p>
                            <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                            <p><strong>Warranty:</strong> {product.warranty}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Product details not available.</p>
            )}
        </div>
    );
};

export default ProductDetails;
