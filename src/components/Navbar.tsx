"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/fetchCategories";
import Image from "next/image";
import varvastra from "../assets/varvastra1.png";
import { ChevronDown, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  slug: string;
  title: string;
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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

  // Desktop click handler
  const handleDesktopCategoryClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    router.push(`/category/${slug}`);
    setIsDropdownOpen(false);
  };

  // Mobile click handler
  const handleMobileCategoryClick = async (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Navigate first
      await router.push(`/category/${slug}`);
      
      // Then close menus after successful navigation
      setTimeout(() => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }, 200);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

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

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c1c1ff] text-black"
            />

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-black focus:outline-none font-semibold"
              >
                Collections
              </button>

              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 text-black rounded-md shadow-lg z-50 bg-[#E6E8FA]">
                  {loading ? (
                    <div className="flex justify-center items-center p-4">
                      <Loader className="text-gray-500 animate-spin" size={24} />
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((collection) => (
                      <a
                        key={collection._id}
                        href={`/category/${collection.slug}`}
                        onClick={(e) => handleDesktopCategoryClick(e, collection.slug)}
                        className="block w-full text-left px-4 py-2 hover:text-black hover:bg-[#f8e8e8]"
                      >
                        {collection.title}
                      </a>
                    ))
                  ) : (
                    <p className="text-center py-2 text-gray-500">No categories found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="hover:text-black focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white shadow-lg border-t border-gray-300 absolute w-full z-50"
        >
          <div className="p-4 space-y-4">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-left font-semibold flex items-center justify-between cursor-pointer"
            >
              Collections
              <ChevronDown />
            </div>

            {isDropdownOpen && (
              <div className="mt-2 w-full text-black rounded-md shadow-lg z-50 bg-[#E6E8FA]">
                {loading ? (
                  <div className="flex justify-center items-center p-4">
                    <Loader className="text-gray-500 animate-spin" size={24} />
                  </div>
                ) : categories.length > 0 ? (
                  categories.map((collection) => (
                    <a
                      key={collection._id}
                      href={`/category/${collection.slug}`}
                      onClick={(e) => handleMobileCategoryClick(e, collection.slug)}
                      className="block w-full text-left px-4 py-2 hover:text-black hover:bg-[#f8e8e8] cursor-pointer"
                    >
                      {collection.title}
                    </a>
                  ))
                ) : (
                  <p className="text-center py-2 text-gray-500">
                    No categories found
                  </p>
                )}
              </div>
            )}

            <Link href="/aboutus" className="block py-2 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="block py-2 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;