import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState, useAppSelector } from "../../store";
import ProductData from "./ProductData";
import SearchData from "./search/SearchData";
import ProductHeader from "../layout/product/productHeader";
import ProductTopHeader from "../layout/product/ProductTopHeader";
import { filterProducts } from "../../redux/productSlice";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showOverview, setShowOverview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const { searchTerm, searchData } = useAppSelector((state) => state.search);
  const [filter, setFilter] = useState<string>("all");
  useEffect(() => {
    store.dispatch(filterProducts({ filter}));
  }, [dispatch, filter]);
  const truncateTitle = (title: string, wordLimit: number) => {
    const words = title.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };
  const toggleOverView = (product: any) => {
    setSelectedProduct(product);
    setShowOverview(true);
  };
  const products = useSelector((state: RootState) => state.product.products);
  return (
    <div className="px-10">
      <ProductTopHeader />
      <ProductHeader />
      <div className="max-w-full mt-2 ">
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
       
        <div className="">
          {searchTerm && searchData.length ? (
            <SearchData
              searchData={searchData}
              searchTerm={searchTerm}
              viewMode={viewMode}
              selectedProduct={selectedProduct}
              toggleOverView={toggleOverView}
              showOverview={showOverview}
              setShowOverview={setShowOverview}
              products={products}
            />
          ) : (
            <ProductData
              viewMode={viewMode}
              selectedProduct={selectedProduct}
              toggleOverView={toggleOverView}
              showOverview={showOverview}
              setShowOverview={setShowOverview}
              truncateTitle={truncateTitle}
              products={products}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
