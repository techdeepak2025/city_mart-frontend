import React, { useEffect, useState } from "react";
import BannerCarousel from "./BannerCarousel";
import DotsLoader from "../../../ui/loader/DotsLoader";

export default function Banner() {
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBanners([
        {
          id: 1,
          title: "Big Sale 2025!",
          subtitle: "Up to 50% off on all electronics.",
          image:
            "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/dbd07c8f0d822f95.jpg?q=60",
        },
        {
          id: 2,
          title: "New Arrivals",
          subtitle: "Check out the latest fashion trends.",
          image:
            "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/151def37889b65ce.jpeg?q=60",
        },
        {
          id: 3,
          title: "Summer Essentials",
          subtitle: "Everything you need for a cool summer.",
          image:
            "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/74f0ad81e44e6e6f.jpg?q=60",
        },
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-screen h-[300px] justify-center items-center bg-blue-100 text-blue-800 font-medium text-lg">
        <span className="mr-2">Loading Banners</span>
        <DotsLoader />
      </div>
    );
  }

  return <BannerCarousel banners={banners} />;
}
