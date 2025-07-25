export default function CartFooter({
  grandTotal,
  onContinueClick,
}) {
  return (
    <div
      className="
        bg-gray-200 border-t shadow-md
        px-4 py-3
        fixed bottom-0 inset-x-0 z-50 rounded-lg
        lg:static lg:border-none lg:shadow-none
      "
    >
      <div className="w-full flex justify-between items-center gap-2">
        <div className="text-sm text-gray-800">
          <span className="font-medium">Total:</span>{" "}
          <span className="text-green-700 font-bold text-lg">
            ₹{grandTotal}
          </span>
        </div>

        <button
          onClick={onContinueClick}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
