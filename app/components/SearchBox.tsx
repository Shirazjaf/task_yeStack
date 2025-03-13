import React, { useCallback, useEffect, useState } from "react";
import { useInfinityGetProducts } from "@/services/ProductService";
import { ProductType } from "@/types/Product";

type Props = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  handleProductClick: (product: ProductType) => void;
};

function SearchBox({ setSearchQuery, searchQuery, handleProductClick }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityGetProducts();
  const [suggestions, setSuggestions] = useState<ProductType[] | undefined>([]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (searchQuery) {
      const allProducts = data?.pages.flatMap((page) => page.products) || [];
      const newSuggestions = allProducts
        .filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((product) => product);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, data]);

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearchChange}
        className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
      />
      {suggestions!.length > 0 && (
        <div className="absolute flex flex-col z-10 mt-1 w-[44%] max-h-[35vh] overflow-y-scroll bg-background border border-border rounded-md shadow-lg">
          {suggestions!.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-muted cursor-pointer"
              onClick={() => {
                handleSuggestionClick(suggestion.title);
                handleProductClick(suggestion);
              }}
            >
              <div className="font-medium">{suggestion.title}</div>
              <div className="text-sm capitalize text-muted-foreground">
                {suggestion.category}
              </div>
            </div>
          ))}
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="my-2 cursor-pointer"
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
