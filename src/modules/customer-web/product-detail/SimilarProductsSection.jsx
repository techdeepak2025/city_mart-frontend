import React from "react";
import ProductCard from "../product-list/ProductCard";
import { ProductCarousel } from "../../../ui/carousel";

export default function SimilarProductsSection({ similarProducts }) {
  if (!similarProducts?.length) return null;

  return (
    <div className="mt-10 px-2 sm:px-0">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Similar Products
      </h2>

      <ProductCarousel
        items={similarProducts}
        renderSlide={(item) => (
          <ProductCard
            _id={item._id}
            image={item.images?.[0]?.url}
            title={item.name}
            price={item.mrp}
            discount={item.discount}
            quantityAvailable={item.stock}
            measurement={item.measurement?.name || item.measurement}
            unit={item.unit?.name || item.unit}
            brand={item.brand}
            currency="INR"
          />
        )}
      />
    </div>
  );
}
