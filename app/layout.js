"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider.js";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/forgotpassword" ||
    pathname === "/checkemail" ||
    pathname === "/createpassword" ||
    pathname === "/passwordreset";

  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz@14..32&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <div className="flex min-h-screen">
              {!isAuthPage && (
                <div className="w-[20%]  text-black fixed h-full">
                  <Sidebar />
                </div>
              )}

              <div
                className={`${!isAuthPage ? " w-[80%] ml-[20%]" : "w-[100%]"}`}
              >
                <main className="py-4 px-1">{children}</main>
              </div>
            </div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
