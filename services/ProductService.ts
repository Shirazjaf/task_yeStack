import { useInfiniteQuery } from "@tanstack/react-query";

import { ProductResponseType } from "@/types/Product";


const fetchProjects = async ({
  pageParam = 1,
}): Promise<ProductResponseType> => {
  const res = await fetch(
    `https://fakestoreapi.in/api/products?limit=15&page=${pageParam}`
  );
  return res.json();
};

export const useInfinityGetProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProjects,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.products.length < 15) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};
