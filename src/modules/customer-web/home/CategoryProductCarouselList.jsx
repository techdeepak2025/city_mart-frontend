import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { ProductCarousel } from "../../../ui/carousel";
import ProductCard from "../product-list/ProductCard";

export default function CategoryProductCarouselList() {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryCarousels = async () => {
      try {
        const { data: categories } = await axiosInstance.get("/categories");

        // ✅ Choose category indexes to display carousels for
        const allowedIndexes = [0,1,9,10,11,14];
        const selectedCategories = allowedIndexes
          .map((i) => categories[i])
          .filter(Boolean);

        const carouselData = await Promise.all(
          selectedCategories.map(async (category) => {
            const { data: products } = await axiosInstance.get(
              `/products?category=${category._id}&limit=10`
            );

            return { category, products };
          })
        );

        setCarousels(carouselData);
      } catch (err) {
        console.error("Error fetching category carousels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCarousels();
  }, []);

  if (loading)
    return (
      <p className="text-center text-sm text-gray-500 py-4">
        Loading category carousels...
      </p>
    );

  return (
    <div className="space-y-10 px-2 sm:px-4 md:px-6 lg:px-8">
      {carousels.map(({ category, products }) => (
        <div key={category._id} className="space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {category.name}
          </h2>
          <ProductCarousel
            items={products}
            renderSlide={(product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                image={product.images?.[0]?.url}
                title={product.name}
                price={product.mrp}
                discount={product.discount}
                quantityAvailable={product.stock}
                measurement={product.measurement?.name || product.measurement}
                unit={product.unit?.name || product.unit}
                brand={product.brand}
                currency="INR"
              />
            )}
          />
        </div>
      ))}
    </div>
  );
}
