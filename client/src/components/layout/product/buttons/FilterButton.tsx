
import React from "react"
import { CiFilter } from "react-icons/ci";
const FilterButton: React.FC = () => {
    return (
        <>
            <div>
                <button className="px-3 py-1 border-2 text-rose-500  rounded-lg hover:bg-rose-100 hover:text-rose-600 border-rose-500 flex items-center space-x-2">
                    <p className="text-lg font-normal" >Filter </p>
                    <CiFilter className="text-lg " />
                </button>
            </div>
        </>
    )
}

export default FilterButton