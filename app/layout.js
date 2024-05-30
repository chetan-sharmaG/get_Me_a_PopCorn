import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";

export const metadata = {
  title: "Get Me A PopCorn - Fund your Projects",
  description: "This is Fund for coders",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} 
      // className="bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"
      >
        <SessionWrapper>
        
          <div className="min-h-screen mainScreen overflow-x-hidden text-black"
            // bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]  "
           >

            {children}

          </div>
          <Footer />

          <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
        </SessionWrapper>
      </body>
    </html>
  );
}
