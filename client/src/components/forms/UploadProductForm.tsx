import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppDispatch, RootState } from "../../store";
import { FileState, FormFields } from "../../redux/types/types";
import { uploadProduct } from "../../redux/productSlice";

const ProductUploadForm: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.product);
  const [formFields, setFormFields] = useState<FormFields>({
    title: "",
    sku: "",
    description: "",
    main_category: "",
    category: "",
    subcategory: "",
    brand: "",
    tags: "",
    unit: "",
    is_new: true,
    attributes: "",
    variants: "",
    price: "",
    salePrice: 0.0,
    discount: 0.0,
    stockQuantity: "",
    specifications: "",
    shipping_options: "",
    shipping_dimensions: "",
    shipping_cost: "",
    handling_time: "",
    returnPolicy: "",
    warranty: "",
    createdBy: user?._id,
    featured: "",
  });
  const [files, setFiles] = useState<FileState>({
    main_image: null,
    additional_images: [],
    video_file: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleQuillChange = (value: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      description: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (inputFiles) {
      if (name === "main_image" || name === "video_file") {
        setFiles((prevFiles) => ({ ...prevFiles, [name]: inputFiles[0] }));
      } else if (name === "additional_images") {
        setFiles((prevFiles) => ({
          ...prevFiles,
          additional_images: Array.from(inputFiles),
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.entries(formFields).forEach(([key, value]) =>
        formData.append(key, value as string)
      );

      if (files.main_image) formData.append("main_image", files.main_image);
      files.additional_images.forEach((file) =>
        formData.append("additional_images", file)
      );
      if (files.video_file) formData.append("video_file", files.video_file);

      dispatch(uploadProduct(formData));
    } catch (error: any) {
      console.log(error.message || "Error uploading product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 mt-16 py-4 bg-white shadow-md rounded-lg max-w-md mx-auto"
    >
      <p className="font-semibold mb-4 text-lg text-center">Upload Product</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          placeholder="Product Title*"
          value={formFields.title}
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">SKU</label>
        <input
          type="text"
          name="sku"
          onChange={handleInputChange}
          value={formFields.sku}
          placeholder="SKU*"
          className="mt-1 p-1 text-sm border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Main Category
        </label>
        <input
          type="text"
          name="main_category"
          onChange={handleInputChange}
          value={formFields.main_category}
          placeholder="Main Category*"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Subcategory
        </label>
        <input
          type="text"
          name="subcategory"
          onChange={handleInputChange}
          value={formFields.subcategory}
          placeholder="Subcategory"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          onChange={handleInputChange}
          value={formFields.category}
          placeholder="Category"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <input
          type="text"
          name="brand"
          onChange={handleInputChange}
          value={formFields.brand}
          placeholder="Brand*"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Variants
        </label>
        <input
          type="text"
          name="variants"
          onChange={handleInputChange}
          value={formFields.variants}
          placeholder="Variants*"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          name="tags"
          onChange={handleInputChange}
          value={formFields.tags}
          placeholder="Tags (comma separated)"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Featured
        </label>
        <input
          type="text"
          name="featured"
          onChange={handleInputChange}
          value={formFields.featured}
          placeholder="Featured (comma separated)"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Attributes
        </label>
        <input
          type="text"
          name="attributes"
          onChange={handleInputChange}
          value={formFields.attributes}
          placeholder="Attributes (comma separated)"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <input
          type="text"
          name="unit"
          onChange={handleInputChange}
          value={formFields.unit}
          placeholder="Unit of Measurement"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          onChange={handleInputChange}
          value={formFields.price}
          placeholder="Price*"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Sale Price
        </label>
        <input
          type="number"
          name="salePrice"
          onChange={handleInputChange}
          value={formFields.salePrice}
          placeholder="Sale Price"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Discount (%)
        </label>
        <input
          type="number"
          name="discount"
          onChange={handleInputChange}
          value={formFields.discount}
          placeholder="Discount (%)"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Stock Quantity
        </label>
        <input
          type="number"
          name="stockQuantity"
          onChange={handleInputChange}
          value={formFields.stockQuantity}
          placeholder="Stock Quantity*"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Specifications
        </label>
        <input
          type="text"
          name="specifications"
          onChange={handleInputChange}
          value={formFields.specifications}
          placeholder="Specifications"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Shipping Options
        </label>
        <input
          type="text"
          name="shipping_options"
          onChange={handleInputChange}
          value={formFields.shipping_options}
          placeholder="Shipping Options"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Shipping Dimensions
        </label>
        <input
          type="text"
          name="shipping_dimensions"
          onChange={handleInputChange}
          value={formFields.shipping_dimensions}
          placeholder="Shipping Dimensions"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Shipping Cost
        </label>
        <input
          type="text"
          name="shipping_cost"
          onChange={handleInputChange}
          value={formFields.shipping_cost}
          placeholder="Shipping Cost"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Handling Time
        </label>
        <input
          type="text"
          name="handling_time"
          onChange={handleInputChange}
          value={formFields.handling_time}
          placeholder="Handling Time"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Return Policy
        </label>
        <input
          type="text"
          name="returnPolicy"
          onChange={handleInputChange}
          value={formFields.returnPolicy}
          placeholder="Return Policy"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Warranty
        </label>
        <input
          type="text"
          name="warranty"
          onChange={handleInputChange}
          value={formFields.warranty}
          placeholder="Warranty"
          className="mt-1 p-1 border text-sm border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Main Image
        </label>
        <input
          type="file"
          name="main_image"
          onChange={handleFileChange}
          className="mt-1 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Additional Images
        </label>
        <input
          type="file"
          name="additional_images"
          onChange={handleFileChange}
          multiple
          className="mt-1 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Video File
        </label>
        <input
          type="file"
          name="video_file"
          onChange={handleFileChange}
          className="mt-1 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <ReactQuill
          value={formFields.description}
          onChange={handleQuillChange}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {loading ? "Uploading..." : "Upload Product"}
      </button>
    </form>
  );
};

export default ProductUploadForm;
