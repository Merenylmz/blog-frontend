import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/Redux/provider";
import FilteredLink from "./filteredLink";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Project",
  description: "Blog Project",
  authors: [{name: "Muhammet Eren Yılmaz", url: "http://quarkend.com"}],
  // icons: {icon: "https://media.istockphoto.com/id/1297020802/tr/vekt%C3%B6r/b-harfi-logo.jpg?s=170667a&w=0&k=20&c=crW5odNunxk00mbheSnNSE_dw-mxJABIhLNZ8I9p7Wo="}
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
