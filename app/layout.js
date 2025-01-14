"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider.js";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import Header from "./components/Header";

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
