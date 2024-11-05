import React from 'react'


interface FilterUserProps {
    handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


const FilterUsers: React.FC<FilterUserProps> = ({ handleSortChange }) => {
    return (
        <div className='mt-5'>
            <label className="mr-4   font-medium text-gray-700">Filter By:</label>
            <select
                onChange={handleSortChange}
                className="mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="role-asc">Role (Ascending)</option>
                <option value="role-desc">Role (Descending)</option>
                <option value="status-asc">Status (Active First)</option>
                <option value="status-desc">Status (Pending First)</option>
            </select>
        </div>
    )
}

export default FilterUsers