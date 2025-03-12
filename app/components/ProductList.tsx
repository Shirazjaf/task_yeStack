import React from "react";
import ProductCard from "./ProductCard";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  features?: string[];
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    description:
      "A sleek, adjustable desk lamp with touch controls and multiple brightness levels. Perfect for your workspace or bedside table.",
    price: 49.99,
    category: "Lighting",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "Touch-sensitive controls",
      "3 brightness levels",
      "Adjustable arm",
      "Energy-efficient LED",
    ],
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description:
      "Designed for comfort during long work sessions with adjustable height, lumbar support, and breathable mesh back.",
    price: 199.99,
    category: "Furniture",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "Adjustable height",
      "Lumbar support",
      "360° swivel",
      "Breathable mesh",
    ],
  },
];

function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          //   onClick={() => onProductClick(product)}
          //   isSelected={product.id === selectedProductId}
        />
      ))}
    </div>
  );
}

export default ProductList;
