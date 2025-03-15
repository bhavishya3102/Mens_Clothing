import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/ui/footer";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning className="hydrated">
     <body className="antialiased w-full dark:bg-[#7a5d3d] bg-[#f8e2c8]">
     <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        {children}
        <Footer />
        </ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
