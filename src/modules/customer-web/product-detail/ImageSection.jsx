import React, { useRef } from "react";

export default function ImageSection({
  product,
  selectedImage,
  setSelectedImage,
  zoomStyle,
  setZoomStyle,
}) {
  const zoomRef = useRef();

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;

    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
      display: "block",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 relative">
      {/* Thumbnail column */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {product.images?.map((img, index) => {
          const imgUrl = img.url;
          return (
            <img
              key={index}
              src={imgUrl}
              alt={`thumbnail-${index}`}
              onClick={() => setSelectedImage(imgUrl)}
              onError={(e) => (e.target.src = "/fallback-image.png")}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                selectedImage === imgUrl
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            />
          );
        })}
      </div>

      {/* Main image preview with zoom */}
      <div
        className="flex-1 relative max-h-[400px] rounded-xl shadow cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={selectedImage || "/fallback-image.png"}
          alt={product.name}
          onError={(e) => (e.target.src = "/fallback-image.png")}
          className="w-full h-full object-contain"
        />

        {/* Zoom preview box */}
        <div
          ref={zoomRef}
          className="absolute hidden md:block top-0 right-[-420px] w-[400px] h-[400px] bg-white border rounded-lg shadow-md"
          style={{
            ...zoomStyle,
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
