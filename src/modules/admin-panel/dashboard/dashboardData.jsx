// dashboardData.jsx
import {
  DollarSign,
  Users,
  ShoppingCart,
  Star,
  RefreshCcw,
  Clock,
  Smile,
  Activity,
} from "lucide-react";

export const totalStats = [
  {
    label: "Total Revenue",
    value: "$48,000",
    icon: <DollarSign size={20} className="text-indigo-600" />,
  },
  {
    label: "Total Orders",
    value: "1,200",
    icon: <ShoppingCart size={20} className="text-indigo-600" />,
  },
  {
    label: "Total Customers",
    value: "980",
    icon: <Users size={20} className="text-indigo-600" />,
  },
  {
    label: "Returning Customers",
    value: "450",
    icon: <RefreshCcw size={20} className="text-indigo-600" />,
  },
];

export const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
];

export const categorySales = [
  { category: "Electronics", sales: 2400 },
  { category: "Fashion", sales: 1398 },
  { category: "Home", sales: 9800 },
  { category: "Beauty", sales: 3908 },
];

export const salesTarget = {
  percentage: 78,
  reached: 7800,
};

export const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Fashion", value: 300 },
  { name: "Home", value: 300 },
  { name: "Fitness", value: 200 },
];

export const bestSellingProducts = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    sales: "560 units",
    image: "https://static.vecteezy.com/system/resources/thumbnails/017/054/098/small_2x/headphones-design-3d-rendering-for-product-mockup-png.png",
  },
  {
    name: "Running Shoes",
    category: "Footwear",
    sales: "430 units",
    image: "https://wallpapers.com/images/featured/running-shoes-png-pjqmtkvz34r7itjo.jpg",
  },
  {
    name: "Smartwatch",
    category: "Accessories",
    sales: "390 units",
    image: "https://www.pngmart.com/files/13/Smartwatch-PNG-Image.png",
  },
  {
    name: "Yoga Mat",
    category: "Fitness",
    sales: "350 units",
    image: "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-yoga-mat-3d-illustrations-png-image_11558911.png",
  },
];

export const recentOrders = [
  {
    customer: "Alice Johnson",
    date: "2025-07-20",
    amount: "$120.00",
    status: "Completed",
  },
  {
    customer: "Michael Smith",
    date: "2025-07-18",
    amount: "$89.00",
    status: "Pending",
  },
  {
    customer: "Karen Lee",
    date: "2025-07-16",
    amount: "$230.00",
    status: "Completed",
  },
  {
    customer: "David Brown",
    date: "2025-07-14",
    amount: "$75.00",
    status: "Pending",
  },
];
