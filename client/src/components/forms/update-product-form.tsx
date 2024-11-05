import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import store, { RootState } from "../../store";
import { Product } from "../../redux/types/types";
import { fetchProducts, updateProduct } from "../../redux/productSlice";
import ReactQuill from "react-quill";

const UpdateProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.product.products.find((prod: any) => prod._id === id)
  );

  const [formState, setFormState] = useState<Product>({
    _id: "",
    title: "",
    price: 0.0,
    description: "",
    sku: "",
    main_category: "",
    subcategory: "",
    category: "",
    brand: "",
    tags: [""],
    unit: "",
    is_new: true,
    attributes: [""],
    variants: [""],
    salePrice: 0.0,
    discount: 0.0,
    stockQuantity: 0,
    specifications: [""],
    reviews: [""],
    ratings: 0.0,
    shipping_options: [""],
    shipping_dimentions: [""],
    shipping_cost: "",
    handling_time: "",
    returnPolicy: "",
    warranty: "",
    createdBy: "",
    featured: [""],
  });
  const handleQuillChange = (value: string) => {
    setFormState((prevFields) => ({
      ...prevFields,
      description: value,
    }));
  };
  useEffect(() => {
    if (!product) {
      console.log("Product not found, fetching products...");
      store.dispatch(fetchProducts());
    } else {
      console.log("Product found:", product);
      setFormState(product);
    }
  }, [dispatch, product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating product:", formState);
    store.dispatch(updateProduct({ id: id!, product: formState }));
    navigate(`/admin-dashboard/product-details/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU:</label>
            <input
              type="text"
              name="sku"
              value={formState.sku}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price:</label>
            <input
              type="number"
              name="price"
              value={formState.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Sale Price:
            </label>
            <input
              type="number"
              name="salePrice"
              value={formState.salePrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <ReactQuill
            value={formState.description}
            onChange={handleQuillChange}
          />
        </div>
        {/* Category and Brand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Main Category:
            </label>
            <input
              type="text"
              name="main_category"
              value={formState.main_category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category:</label>
            <input
              type="text"
              name="category"
              value={formState.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Subcategory:
            </label>
            <input
              type="text"
              name="subcategory"
              value={formState.subcategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Brand:</label>
            <input
              type="text"
              name="brand"
              value={formState.brand}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Shipping and Warranty Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Shipping Options:
            </label>
            <input
              type="text"
              name="shipping_options"
              value={formState.shipping_options}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Shipping Cost:
            </label>
            <input
              type="text"
              name="shipping_cost"
              value={formState.shipping_cost}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Return Policy:
            </label>
            <input
              type="text"
              name="returnPolicy"
              value={formState.returnPolicy}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Warranty:</label>
            <input
              type="text"
              name="warranty"
              value={formState.warranty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
