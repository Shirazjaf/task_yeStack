import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInfinityGetProducts } from "@/services/ProductService";
import { ProductType } from "@/types/Product";
import { useInView } from "react-intersection-observer";
import { popularSearches } from "@/constants/PopularProducts";

type Props = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  handleProductClick: (product: ProductType) => void;
};

function SearchBox({ setSearchQuery, searchQuery, handleProductClick }: Props) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prevIndex) => {
        if (prevIndex === suggestions!.length - 1) return prevIndex;
        return prevIndex + 1;
      });
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prevIndex) => {
        if (prevIndex === 0) return prevIndex;
        return prevIndex - 1;
      });
    } else if (e.key === "Enter") {
      if (focusedIndex >= 0) {
        handleSuggestionClick(suggestions![focusedIndex].title);
        handleProductClick(suggestions![focusedIndex]);
      }
    } else if (e.key === "Escape") {
      setFocusedIndex(-1);
      setSearchQuery("");
      setIsInputFocused(false);
    }
  };

  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityGetProducts();
  const [suggestions, setSuggestions] = useState<ProductType[] | undefined>([]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

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

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearchChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        role="menu"
        aria-label="Search Results"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
      />
      {suggestions!.length > 0 && (
        <div className="absolute flex flex-col z-10 mt-1 w-[44%] max-h-[35vh] overflow-y-scroll bg-background border border-border rounded-md shadow-lg">
          {suggestions!.map((suggestion, index) => (
            <div
              role="menuitem"
              aria-selected={focusedIndex === index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              style={{
                backgroundColor:
                  focusedIndex === index ? "lightblue" : "transparent",
              }}
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
            ref={ref}
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

      {isInputFocused && !searchQuery && (
        <div className="absolute z-10 bg-white border rounded shadow-lg w-[44%] mt-1 max-h-60 overflow-y-auto">
          <div className="px-4 py-2 text-sm text-gray-500">
            Popular Searches
          </div>
          {popularSearches.map((suggestion, index) => (
            <div
              role="menuitem"
              aria-selected={focusedIndex === index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              style={{
                backgroundColor:
                  focusedIndex === index ? "lightblue" : "transparent",
              }}
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
        </div>
      )}
    </div>
  );
}

export default SearchBox;
