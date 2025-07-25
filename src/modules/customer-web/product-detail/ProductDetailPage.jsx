import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

import ProductDetailCard from "./ProductDetailCard";
import SimilarProductsSection from "./SimilarProductsSection";
import ImageSection from "./ImageSection";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);

        if (res.data.images?.length) {
          setSelectedImage(res.data.images[0]?.url);
        }

        if (res.data.subcategory) {
          const similarRes = await axiosInstance.get(
            `/products?subcategory=${res.data.subcategory}&exclude=${res.data._id}`
          );
          setSimilarProducts(similarRes.data);
        }
      } catch (err) {
        console.error("Error fetching product or similar products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <ImageSection
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          zoomStyle={zoomStyle}
          setZoomStyle={setZoomStyle}
        />

        {/* Product Info */}
        <ProductDetailCard product={product} />
      </div>

      {/* Similar Products */}
      <SimilarProductsSection similarProducts={similarProducts} />
    </div>
  );
}
