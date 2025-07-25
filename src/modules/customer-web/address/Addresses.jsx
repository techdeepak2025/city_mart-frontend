import { Home, Briefcase, MapPin } from "lucide-react";

export const dummyAddresses = [
  {
    id: 1,
    type: "Home",
    name: "John Doe",
    address: "33, West Rajiv Nagar, Sector 12, Gurugram, Haryana 122001",
    phone: "+91 9876543210",
    icon: <Home size={18} className="text-yellow-500" />,
  },
  {
    id: 2,
    type: "Work",
    name: "John Doe",
    address: "Plot 18, Phase II, Udyog Vihar, Sector 20, Gurugram, Haryana",
    phone: "+91 9123456780",
    icon: <Briefcase size={18} className="text-yellow-500" />,
  },
  {
    id: 3,
    type: "Other",
    name: "Jane Smith",
    address: "789 Random Ave, City, State, 111222",
    phone: "+91 9988776655",
    icon: <MapPin size={18} className="text-yellow-500" />,
  },
];
