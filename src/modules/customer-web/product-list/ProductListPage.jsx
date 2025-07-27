import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import SubCategorySidebar from "./SubCategorySidebar";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { DotsLoader } from "../../../ui/loader";

export default function ProductListPage() {
  const { slug, subSlug } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch category and subcategories
  useEffect(() => {
    if (!slug) return;

    const fetchCategoryAndSubs = async () => {
      try {
        setLoadingCategory(true);
        const { data: catData } = await axiosInstance.get(`/categories/slug/${slug}`);
        setCategory(catData);

        const { data: subs } = await axiosInstance.get(`/sub-categories?category=${catData._id}`);
        setSubcategories(subs);

        const validSlugs = subs.map((s) => s.slug);
        const validSlug = validSlugs.includes(subSlug) ? subSlug : subs[0]?.slug ?? null;

        if (validSlug && subSlug !== validSlug) {
          navigate(`/${slug}/${validSlug}`, { replace: true });
        } else {
          setSelectedSubcategorySlug(validSlug);
        }
      } catch (err) {
        console.error("Error fetching category or subcategories:", err);
        setCategory(null);
        setSubcategories([]);
        setSelectedSubcategorySlug(null);
      } finally {
        setLoadingCategory(false);
      }
    };

    fetchCategoryAndSubs();
  }, [slug, subSlug, navigate]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const sub = subcategories.find((s) => s.slug === selectedSubcategorySlug);
      if (!sub?._id) return;

      try {
        setLoadingProducts(true);
        const res = await axiosInstance.get(`/products?subcategory=${sub._id}`);
        setProducts(res.data);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (selectedSubcategorySlug && subcategories.length) {
      fetchProducts();
    }
  }, [selectedSubcategorySlug, subcategories]);

  const handleSubcategoryClick = (slugToGo) => {
    navigate(`/${slug}/${slugToGo}`);
  };

  const selectedSubcategory = useMemo(
    () => subcategories.find((s) => s.slug === selectedSubcategorySlug),
    [subcategories, selectedSubcategorySlug]
  );

  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 transition-all duration-300">
      {loadingCategory ? (
        <div className="flex h-[300px] justify-center items-center bg-blue-50 text-blue-800 font-medium text-lg rounded-md shadow-sm">
          <span className="mr-2">Loading Products</span>
          <DotsLoader />
        </div>
      ) : !category ? (
        <p className="text-red-500 text-center py-10">Category not found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border border-neutral-200 rounded-md overflow-hidden shadow-sm"
        >
          <header className="border-b border-neutral-200 text-sm font-semibold px-4 py-2 bg-gray-50">
            Buy{" "}
            <span className="text-sky-700">
              {selectedSubcategory?.name ?? ""}
            </span>{" "}
            Online
          </header>

          <div className="md:h-[calc(100vh-120px)] md:flex">
            <SubCategorySidebar
              subcategories={subcategories}
              selectedSubcategorySlug={selectedSubcategorySlug}
              onSelect={handleSubcategoryClick}
            />

            <main className="flex-1 border-t md:border-t-0 md:border-l border-neutral-200 bg-white p-4 overflow-y-auto max-h-[calc(100vh-170px)] md:max-h-none">
              {loadingProducts ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[300px]">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-[200px] bg-gray-100 animate-pulse rounded-md"
                    />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSubcategorySlug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {products.map((prod) => (
                      <ProductCard
                        key={prod._id}
                        _id={prod._id}
                        image={prod.images?.[0]?.url || "/default-product.png"}
                        title={prod.name}
                        price={prod.mrp}
                        discount={prod.discount || 0}
                        quantityAvailable={prod.stock || 0}
                        measurement={prod.measurement?.name || prod.measurement}
                        unit={prod.unit?.name || prod.unit}
                        brand={prod.brand}
                        sku={prod.sku}
                        description={prod.description}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <p className="text-gray-500 text-center py-10">
                  No products found.
                </p>
              )}
            </main>
          </div>
        </motion.div>
      )}
    </section>
  );
}
