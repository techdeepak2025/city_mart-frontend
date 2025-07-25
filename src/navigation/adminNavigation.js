import {
  HomeIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  TagIcon,
  Squares2X2Icon,
  ListBulletIcon,
  GlobeAltIcon,
  MapPinIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";

export const navItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: HomeIcon,
  },
  {
    name: "User Management",
    icon: UsersIcon,
    children: [
      {
        name: "Users",
        path: "/admin/users",
        icon: UsersIcon,
      },
      {
        name: "Roles",
        path: "/admin/roles",
        icon: IdentificationIcon,
      },
    ],
  },
  {
    name: "Store Management",
    icon: BuildingStorefrontIcon,
    children: [
      {
        name: "Stores",
        path: "/admin/stores",
        icon: BuildingStorefrontIcon,
      },
      {
        name: "Cities",
        path: "/admin/cities",
        icon: MapPinIcon,
      },
      {
        name: "States",
        path: "/admin/states",
        icon: GlobeAltIcon,
      },
    ],
  },
  {
    name: "Product Management",
    icon: CubeIcon,
    children: [
      {
        name: "Products",
        path: "/admin/products",
        icon: CubeIcon,
      },
      {
        name: "Brands",
        path: "/admin/brands",
        icon: TagIcon,
      },
      {
        name: "Sub Categories",
        path: "/admin/sub-categories",
        icon: Squares2X2Icon,
      },
      {
        name: "Categories",
        path: "/admin/categories",
        icon: ListBulletIcon,
      },
      {
        name: "Measurements",
        path: "/admin/measurements",
        icon: ListBulletIcon,
      },
    ],
  },
  {
    name: "Price Management",
    icon: CubeIcon,
    children: [
      {
        name: "Product Price",
        path: "/admin/product-prices",
        icon: CubeIcon,
      },
    ],
  },
  {
    name: "Stock Management",
    icon: CubeIcon,
    children: [
      {
        name: "Product Stock",
        path: "/admin/product-stocks",
        icon: CubeIcon,
      },
    ],
  },
];
