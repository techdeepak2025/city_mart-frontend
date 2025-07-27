import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { ProductCarousel } from "../../../ui/carousel";
import ProductCard from "../product-list/ProductCard";
import {DotsLoader} from "../../../ui/loader"; 

export default function CategoryProductCarouselList() {
  const [carousels, setCarousels] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchCategoryCarousels = async () => {
      try {
        const { data: categories } = await axiosInstance.get("/categories");

        const allowedIndexes = [0, 1, 9, 10, 11, 14];
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
        setIsLoading(false);
      }
    };

    fetchCategoryCarousels();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-8 text-gray-500 text-sm">
        <span className="mr-2">Loading category carousels</span>
        <DotsLoader />
      </div>
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
