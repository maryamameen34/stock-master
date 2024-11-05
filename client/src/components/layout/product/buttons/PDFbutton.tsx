import React from "react";
import { FaFilePdf } from "react-icons/fa";

interface PDFButtonProps {
    onDownload: () => void; 
}

const PDFButton: React.FC<PDFButtonProps> = ({ onDownload }) => {
    return (
        <div>
            <button
                onClick={onDownload}
                className="px-3 py-1 border-2 text-green-500 rounded-lg hover:bg-green-100 hover:text-green-700 border-green-500 flex items-center space-x-2"
            >
                <p className="text-lg font-normal">PDF </p>
                <FaFilePdf className="text-lg" />
            </button>
        </div>
    );
};

export default PDFButton;
