"use client";
import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const mensWearCollections = [
    {
      id: 1,
      name: "Kurta Pajama",
      link: "/collections/mens/kurta-pajama",
    },
    {
      id: 2,
      name: "Indo Western",
      link: "/collections/mens/indo-western",
    },
    {
      id: 3,
      name: "Sherwani",
      link: "/collections/mens/sherwani",
    },
    {
      id: 4,
      name: "Blazers",
      link: "/collections/mens/blazers",
    },
    {
      id: 5,
      name: "Formal Suits",
      link: "/collections/mens/formal-suits",
    },
    {
      id: 6,
      name: "Casual Wear",
      link: "/collections/mens/casual-wear",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-navbarBG text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
     
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              Company Logo
            </a>
          </div>

        

       
          <div className="hidden md:flex items-center space-x-4">

           
          
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
                <div className="absolute mt-2 w-48 text-black rounded-md shadow-lg z-20 bg-[#E6E8FA]">
                  {mensWearCollections.map((collection) => (
                    <a
                      key={collection.id}
                      href={collection.link}
                      className="block px-4 py-2 hover:text-black hover:bg-[#f8e8e8]"
                    >
                      {collection.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

        
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
