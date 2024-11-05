import React from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import * as XLSX from "xlsx";

interface ExcelButtonProps {
    products: { title: string; price: number; description: string }[];
}

const ExcelButton: React.FC<ExcelButtonProps | any> = ({ products }) => {
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        
        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "products.xlsx");
    };

    return (
        <div>
            <button 
                onClick={downloadExcel} 
                className="px-3 py-1 border-2 text-indigo-500 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 border-indigo-500 flex items-center space-x-2"
            >
                <p className="text-lg font-normal">Excel</p>
                <SiMicrosoftexcel className="text-lg" />
            </button>
        </div>
    );
};

export default ExcelButton;
