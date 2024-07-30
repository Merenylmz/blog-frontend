import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/Redux/provider";
import FilteredLink from "./filteredLink";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

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
    <Providers>
      <html lang="en">
        <body className="bg-gray-900">
          <FilteredLink />
          <div className="container mx-auto">
            {children}
          </div>
        </body>
      </html>
    </Providers>
  );
}
