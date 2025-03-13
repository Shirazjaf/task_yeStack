export type ProductType = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
};

export type ProductResponseType = {
  status: string;
  message: string;
  products: ProductType[];
};

export type ApiResponseType = {
  pages: ProductResponseType[];
  pageParams: number[];
};
