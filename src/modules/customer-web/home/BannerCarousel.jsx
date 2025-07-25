import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BannerCarousel({ banners }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="w-full relative group">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={30}
        speed={800}
        loop={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative h-[200px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            ></div>
          </SwiperSlide>
        ))}

        {/* Left Arrow */}
        <button
          ref={prevRef}
          className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 text-black p-1 rounded-full shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100 ${
            currentIndex === 0 ? "hidden" : ""
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button
          ref={nextRef}
          className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 text-black p-1 rounded-full shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100 ${
            currentIndex === banners.length - 1 ? "hidden" : ""
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </Swiper>
    </div>
  );
}
