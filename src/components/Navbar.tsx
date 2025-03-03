"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/fetchCategories";
import Image from "next/image";
import varvastra from "../assets/varvastra1.png";
import varvastra2 from "../assets/hindi_varvastra.png";
import { ChevronDown, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { auth } from "@/lib/firebase";
 
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Add mounted state to handle client-side rendering
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

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
  const handleMobileCategoryClick = async (
    e: React.MouseEvent,
    slug: string,
  ) => {
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

  // Early return for server-side rendering
  if (!mounted) {
    return null; // or return a loading state/skeleton
  }

  return (
    <nav className={` ${theme =="dark"?"bg-[#674019]":"bg-[#b08355]"} sticky top-0 left-0 right-0 z-[1000] text-black shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px  -8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              <div className="flex items-center">
                <Image src={varvastra} alt="varvastra" width={50} height={50} />
                <Image
                  src={varvastra2}
                  alt="varvastra2"
                  width={100}
                  height={100}
                  className="mt-3"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/aboutus" className="font-semibold">
              About Us
            </Link>
            <Link href="/contact" className="font-semibold">
              Contact Us
            </Link>
            {isAuthenticated && (
              <Link href="/studio" className="font-semibold">
                Add Products
              </Link>
            )}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c1c1ff] text-black"
            />

            <div className="relative" ref={dropdownRef}>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hover:text-black focus:outline-none font-semibold"
                >
                  Collections
                </button>

                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                ) : null}
              </div>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 text-black rounded-md shadow-lg z-50 bg-[#f8ecd7]">
                  {loading ? (
                    <div className="flex justify-center items-center p-4">
                      <Loader
                        className="text-gray-500 animate-spin"
                        size={24}
                      />
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((collection) => (
                      <a
                        key={collection._id}
                        href={`/category/${collection.slug}`}
                        onClick={(e) =>
                          handleDesktopCategoryClick(e, collection.slug)
                        }
                        className="block w-full text-left px-4 py-2 hover:text-black hover:bg-[#efbaba]"
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
            </div>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-white" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="hover:text-black focus:outline-none mr-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-white" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="z-50">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="z-50">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="z-50">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-[#f8ecd7] shadow-lg border-t border-gray-300 absolute w-full z-20"
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
              <div className="mt-2 w-full text-black rounded-md shadow-lg z-50 bg-[#f8ecd7]">
                {loading ? (
                  <div className="flex justify-center items-center p-4">
                    <Loader className="text-gray-500 animate-spin" size={24} />
                  </div>
                ) : categories.length > 0 ? (
                  categories.map((collection) => (
                    <a
                      key={collection._id}
                      href={`/category/${collection.slug}`}
                      onClick={(e) =>
                        handleMobileCategoryClick(e, collection.slug)
                      }
                      className="block w-full text-left px-4 py-2 hover:text-black hover:bg-[#efbaba] cursor-pointer"
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

            <Link
              href="/aboutus"
              className="block py-2 font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block py-2 font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            {isAuthenticated && (
              <Link
                href="/studio"
                className="block py-2 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Add Products
              </Link>
            )}
            {isAuthenticated ? <button>Logout</button> : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
