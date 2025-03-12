import React from "react";
import Image from "next/image";

import { Card, CardContent } from "../components/ui/card";

interface ProductCardProps {
  product: any;
  onClick?: () => void;
  isSelected?: boolean;
}

function ProductCard({ product, onClick, isSelected }: ProductCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all cursor-pointer hover:shadow-md ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onClick}>
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <p className="ml-2 bg-slate-400 px-3  rounded-xl whitespace-nowrap">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2">
          <p className="text-xs">{product.category}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
