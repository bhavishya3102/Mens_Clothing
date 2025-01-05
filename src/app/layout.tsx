import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <body
        className={`antialiased bg-navbarBG`}
      >

        <Navbar />
        
        {children}
        <Footer/>
      </body>
    </html>
  );
}
