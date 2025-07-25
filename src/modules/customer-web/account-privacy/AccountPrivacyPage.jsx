import React, { useState } from "react";
import { ShieldCheck, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

export default function AccountPrivacyPage() {
  const [dataSharing, setDataSharing] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      alert("Your account has been deleted.");
      // Handle actual deletion logic here
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-yellow-500" />
        Account Privacy Settings
      </h2>

      <div className="space-y-4">
        {/* Data Sharing */}
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="font-medium">Data Sharing</p>
            <p className="text-sm text-gray-600">
              Allow sharing of your data with third-party services to enhance experience.
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setDataSharing(!dataSharing)}
          >
            {dataSharing ? (
              <ToggleRight className="w-6 h-6 text-yellow-500" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>

        {/* Marketing Emails */}
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="font-medium">Marketing Emails</p>
            <p className="text-sm text-gray-600">
              Receive promotional emails and special offers.
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setMarketingEmails(!marketingEmails)}
          >
            {marketingEmails ? (
              <ToggleRight className="w-6 h-6 text-yellow-500" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>

        {/* Delete Account */}
        <div
          className="flex items-center gap-2 text-red-600 cursor-pointer mt-4"
          onClick={handleDeleteAccount}
        >
          <Trash2 className="w-5 h-5" />
          <span className="font-medium">Delete My Account</span>
        </div>
      </div>
    </div>
  );
}
