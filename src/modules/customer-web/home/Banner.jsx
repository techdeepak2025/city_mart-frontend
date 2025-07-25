import React from "react";
import BannerCarousel from "./BannerCarousel";

const banners = [
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
];

export default function Banner() {
  return <BannerCarousel banners={banners} />;
}
