"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/fetchCategories";
import Image from "next/image";
import varvastra from "../assets/varvastra1.png";
import { Loader } from "lucide-react"; // Import a Loader icon (e.g., Lucide Icons)

interface Category {
  _id: string;
  slug: string;
  title: string;
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-navbarBG sticky top-0 left-0 right-0 z-[1000] text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              <Image src={varvastra} alt="varvastra" width={50} height={50} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/aboutus" className="font-semibold">About Us</Link>
            <Link href="/contact" className="font-semibold">Contact Us</Link>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c1c1ff] text-black"
            />

            {/* Dropdown for Categories */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-black focus:outline-none font-semibold"
              >
                Collections
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute mt-2 w-48 text-black rounded-md shadow-lg z-50 bg-[#E6E8FA]"
                  onClick={(e) => e.stopPropagation()} // Prevents immediate closing when clicking inside
                >
                  {loading ? (
                    <div className="flex justify-center items-center p-4">
                      <Loader className="text-gray-500 animate-spin" size={24} />
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((collection) => (
                      <Link
                        key={collection?._id}
                        href={`/category/${collection?.slug}`}
                        className="block px-4 py-2 hover:text-black hover:bg-[#f8e8e8]"
                        onClick={() => setIsDropdownOpen(false)} // Close dropdown after selecting a category
                      >
                        {collection?.title}
                      </Link>
                    ))
                  ) : (
                    <p className="text-center py-2 text-gray-500">No categories found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              className="hover:text-black focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
