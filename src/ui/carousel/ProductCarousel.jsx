import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ items = [], renderSlide }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Correctly assign navigation buttons after render
  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params?.navigation
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, prevRef.current, nextRef.current]);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (!items.length) return null;

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <button
        ref={prevRef}
        className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-black p-2 rounded-full shadow-sm border border-gray-300 hover:bg-white sm:left-2 transition-opacity duration-200 ${
          isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Right Arrow */}
      <button
        ref={nextRef}
        className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-black p-2 rounded-full shadow-sm border border-gray-300 hover:bg-white sm:right-2 transition-opacity duration-200 ${
          isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ChevronRight size={18} />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="px-4 sm:px-6"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{renderSlide(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
