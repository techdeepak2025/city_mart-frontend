import { PackageCheck, MapPin, Gift, ShieldCheck } from "lucide-react";

export const accountRoutes = [
  {
    label: "My Orders",
    icon: PackageCheck,
    to: "/account/orders",
  },
  {
    label: "Saved Addresses",
    icon: MapPin,
    to: "/account/addresses",
  },
  {
    label: "E-Gift Cards",
    icon: Gift,
    to: "/account/gift-card",
  },
  {
    label: "Account Privacy",
    icon: ShieldCheck,
    to: "/account/privacy",
  },
];

export const userNavigation = (handleClose) =>
  accountRoutes.map((item) => ({
    ...item,
    onClick: handleClose,
  }));
