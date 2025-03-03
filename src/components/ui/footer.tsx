"use client"

import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

import { useEffect, useState } from 'react'
import { getCategories } from '@/lib/fetchCategories'

const pages = [
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
]

interface Category {
  _id: string;
  slug: string;
  title: string;
}

export function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function fetchData() {  
      try {
        const data = await getCategories(); 
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);
 


  return (
    <footer className=" dark:bg-[#674019] bg-[#b08355] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link href={`/category/${category.slug}`} className="hover:underline">
                    {category.title}
                  </Link>
                </li> 
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link href={page.href} className="hover:underline">
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2">
             
              <Button type="submit" variant="outline" className='bg-primary text-white hover:bg-cyan-800 hover:text-white'>
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p>&copy; 2025 Clothing Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

