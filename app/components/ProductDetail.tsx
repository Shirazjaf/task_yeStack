import React from "react";
import Image from "next/image";

import { Card, CardContent } from "./ui/card";
import { ProductType } from "@/types/Product";
import placeholder from '.././../public/placeholder.svg';
function ProductDetail({product}:{product: ProductType}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-[300px] md:h-[400px] ">
            <Image
              src={product?.image ?? placeholder}
              alt={product.title ?? "Product Image"}
              fill
              className="object-contain"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <div className="flex items-center mt-1">
                  <p className="mr-2">{product.category}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            {product.description && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Brand: {product.brand}</li>
                    <li>Model: {product.model}</li>
                    <li>Color: {product.color}</li>
                    <li>Discount: {product.discount}%</li>
                </ul>
              </div>
            )}
            <div className="mt-8 flex space-x-4">
              <button className="flex-1">
                Add to Cart
              </button>
              <button className="flex-1">Buy Now</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductDetail;
