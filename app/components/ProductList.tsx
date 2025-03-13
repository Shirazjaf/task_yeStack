import React from "react";

import ProductCard from "./ProductCard";
import { ProductType } from "@/types/Product";
import { useInfinityGetProducts } from "@/services/ProductService";

function ProductList({
  handleProductClick,
}: {
  handleProductClick: (product: ProductType) => void;
}) {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinityGetProducts();

  if (error) return <div>Failed to load</div>;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full w-full">
        Loading...
      </div>
    );

  return (
    <div className="">
      <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data &&
          data.pages
            .flatMap((page) => page.products)
            .map((product: ProductType) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="text-xl font-semibold text-center w-full my-4 cursor-pointer"
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
}

export default ProductList;
