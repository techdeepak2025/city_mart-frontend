import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function CustomerFooter() {
  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* === Full Footer for sm and up === */}
      <div className="hidden sm:block pt-10 pb-6 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-xl font-bold mb-2">
              <span className="text-purple-600">CITY</span>
              <span className="text-yellow-600">MART</span>
            </h2>
            <p className="text-sm text-gray-600">
              Quality products at your doorstep. Shop smart. Live better.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Top Deals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +91 9876543210
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@citymart.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" /> Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4">
          <p>
            &copy; {new Date().getFullYear()} CityMart. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-blue-700 hover:text-blue-900 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="text-sky-500 hover:text-sky-700 transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="text-pink-600 hover:text-pink-800 transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* === Mobile Footer === */}
      <div className="block sm:hidden px-4 py-6 text-center">
        <h2 className="text-xl font-bold">
          <span className="text-purple-600">CITY</span>
          <span className="text-yellow-600">MART</span>
        </h2>
        <p className="text-xs text-gray-600 mt-1 mb-3">
          Quality products at your doorstep.
        </p>
        <div className="flex justify-center gap-4 mb-3">
          <a
            href="#"
            className="text-blue-700 hover:text-blue-900 transition-colors"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="text-sky-500 hover:text-sky-700 transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="text-pink-600 hover:text-pink-800 transition-colors"
          >
            <Instagram size={20} />
          </a>
        </div>

        <p className="text-[11px] text-gray-500">
          &copy; {new Date().getFullYear()} CityMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
