import {
  PackageCheck,
  MapPin,
  Gift,
  ShieldCheck,
} from "lucide-react";

export const userNavigation = (handleClose) => [
  {
    label: "My Orders",
    icon: PackageCheck,
    to: "/account/orders",
    onClick: handleClose,
  },
  {
    label: "Saved Addresses",
    icon: MapPin,
    to: "/account/addresses",
    onClick: handleClose,
  },
  {
    label: "E-Gift Cards",
    icon: Gift,
    to: "/account/gift-card",
    onClick: handleClose,
  },
  {
    label: "Account Privacy",
    icon: ShieldCheck,
    to: "/account/privacy",
    onClick: handleClose,
  },
];
