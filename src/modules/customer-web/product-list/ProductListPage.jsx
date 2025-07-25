import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance, { BASE_URL } from "../../../utils/axiosInstance";
import SubCategorySidebar from "./SubCategorySidebar";
import ProductCard from "./ProductCard";

export default function ProductListPage() {
  const { slug, subSlug } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryAndSubs = async () => {
      try {
        setLoadingCategory(true);
        const { data: catData } = await axiosInstance.get(
          `/categories/slug/${slug}`
        );
        setCategory(catData);

        const { data: subs } = await axiosInstance.get(
          `/sub-categories?category=${catData._id}`
        );
        setSubcategories(subs);

        const validSlugs = subs.map((s) => s.slug);
        const validSlug = validSlugs.includes(subSlug)
          ? subSlug
          : subs[0]?.slug ?? null;

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

  useEffect(() => {
    const fetchProducts = async () => {
      const sub = subcategories.find((s) => s.slug === selectedSubcategorySlug);
      if (!sub?._id) return;

      try {
        setLoadingProducts(true);
        const res = await axiosInstance.get(`/products?subcategory=${sub._id}`);
        setProducts(res.data);
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
    <section className="max-w-7xl mx-auto px-2 sm:px-4">
      {loadingCategory ? (
        <p className="text-center text-gray-500 py-10">Loading category...</p>
      ) : !category ? (
        <p className="text-red-500 text-center py-10">Category not found.</p>
      ) : (
        <div className="border border-neutral-200 rounded-md overflow-hidden">
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
                <p className="text-center text-gray-400">Loading products...</p>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                </div>
              ) : (
                <p className="text-gray-500">No products found.</p>
              )}
            </main>
          </div>
        </div>
      )}
    </section>
  );
}
