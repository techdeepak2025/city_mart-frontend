export default function DeliveryAddress({ onClick, selectedAddress }) {
  return (
    <div
      className="flex flex-col cursor-pointer w-2xs sm:max-w-md order-3 sm:order-2"
      onClick={onClick}
    >
      <span className="font-bold text-sm sm:text-base">
        Delivery in 16 minutes
      </span>
      <span className="text-xs sm:text-sm font-light truncate max-w-[180px] sm:max-w-none">
        {selectedAddress?.address ??
          "33, West Rajiv Nagar, Sector 12, Gurugram, Haryana 122001"}
      </span>
    </div>
  );
}
