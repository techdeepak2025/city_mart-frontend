import React from "react";
import { XCircle } from "lucide-react";

export default function CancellationPolicy() {
  return (
    <div className="mt-4 flex gap-2 text-xs text-gray-500">
      <XCircle className="w-4 h-4 text-gray-400" />
      <p>
        <strong>Cancellation Policy:</strong> Orders can be cancelled
        within 5 minutes. After that, cancellations may not be possible.
      </p>
    </div>
  );
}
