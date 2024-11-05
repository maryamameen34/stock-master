import React, { useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import { RootState } from "../../../store";
import FilterButton from "./buttons/FilterButton";
import SearchProduct from "../../products/search/SearchProduct";
import ExcelButton from "./buttons/ExcelButton";
import PDFButton from "./buttons/PDFbutton";

const ProductHeader: React.FC = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(true);
    const products = useSelector((state: RootState) => state.product.products);

    const toggleSearchBar = () => {
        setIsSearchVisible(prev => !prev);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Product List", 10, 10);

        doc.setFontSize(12);
        const margin = 10;
        const startY = 30;
        const columnWidth = 60;
        const rowHeight = 50;
        const productsPerRow = 3;

        const headers = ['Product Name', 'Price', 'Description'];
        headers.forEach((header, index) => {
            const x = margin + index * columnWidth;
            doc.text(header, x, startY);
        });

        products.forEach((product: any, index) => {
            const x = margin + (index % productsPerRow) * columnWidth;
            const y = startY + Math.floor(index / productsPerRow) * rowHeight;
            doc.text(product.title, x, y);
            doc.text(`$${product.price}`, x, y + 10);
            doc.text(product.description || 'No description', x, y + 20);
            doc.rect(x - 2, y - 10, columnWidth, rowHeight, 'S');
        });

        doc.save("products.pdf");
    };

    return (
        <div className="mt-5 mb-8 px-5">
            <div className="lg:flex space-y-2 md:flex col-auto items-center justify-between">
                <div className="flex items-center space-x-5 justify-between">
                    <div>
                        <FilterButton />
                    </div>
                    <div>
                        <SearchProduct isVisible={isSearchVisible} toggleSearchBar={toggleSearchBar} />
                    </div>
                </div>
                <div className="flex items-center space-x-2 justify-end">
                    <div>
                        <ExcelButton products={products} />
                    </div>
                    <div>
                        <PDFButton onDownload={downloadPDF} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductHeader;
