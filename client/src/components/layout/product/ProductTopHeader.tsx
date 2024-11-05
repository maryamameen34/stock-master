import React from "react"
import { Link } from "react-router-dom"




const ProductTopHeader: React.FC = () => {
    return (
        <div>
            <div className="flex px-3 mt-10 items-center justify-between pr-1 md:pr-4 lg:pr-12">
                <h1 className="text-xl font-medium mt-11 text-gray-800 mb-2 text-left">Explore  Products</h1>
                <div className="flex items-center lg:text-sm md:text-sm text-xs mt-9">
                    <Link to={"/admin-dashboard"} className=" font-normal">Dashboard</Link>
                    <p>/</p>
                    <Link to={"/admin-dashboard/inventory-products-data"} className="text-indigo-700 font-medium">Product List</Link>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ProductTopHeader