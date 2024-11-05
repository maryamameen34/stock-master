import React from "react";
import { FaSearch } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchSearchResults, setSearchTerm } from "../../../redux/searchSlice";
interface SearchProductProps {
    isVisible: boolean;
    toggleSearchBar: () => void;
}

const SearchProduct: React.FC<SearchProductProps> = ({ isVisible, toggleSearchBar }) => {
    const dispatch = useAppDispatch();
    const { searchTerm } = useAppSelector((state) => state.search);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const term = e.target.value.trim();
        dispatch(setSearchTerm(term));
        if (term) {
            dispatch(fetchSearchResults(term));
        }
    };
    return (
        <div className="flex">

            {
                isVisible && (
                    <div className={`lg:${isVisible == true}`}>
                        <form method="get" className=" w-full">
                            <input
                                type="search"
                                className="w-full border border-none mr-2 rounded-l-md py-1  focus:outline-none"
                                placeholder="Search for products..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                )
            }
            <button onClick={toggleSearchBar} className={` ml-2 text-gray-700 `}>
                <FaSearch className="" />
            </button>

        </div>
    );
};

export default SearchProduct;
