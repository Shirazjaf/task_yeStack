"use client";
import React, { useCallback, useState } from "react";

import ProductList from "./components/ProductList";
import SearchBox from "./components/SearchBox";
import { ProductType } from "@/types/Product";
import ProductDetail from "./components/ProductDetail";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const handleProductClick = useCallback((product: ProductType) => {
    setSelectedProduct(product);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold mb-8 text-center cursor-pointer"
        onClick={() => setSelectedProduct(null)}
      >
        Ecommerce Product Search
      </h1>
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBox
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          handleProductClick={handleProductClick}
        />
      </div>
      {selectedProduct && (
        <div id="product-details" className="mb-12">
          <ProductDetail product={selectedProduct} />
        </div>
      )}
      <ProductList handleProductClick={handleProductClick} />
    </div>
  );
}
