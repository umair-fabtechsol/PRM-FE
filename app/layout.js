"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider.js";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import { FaArrowLeft } from "react-icons/fa";

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
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/forgotpassword" ||
    pathname === "/checkemail" ||
    pathname === "/createpassword" ||
    pathname === "/passwordreset";

  let title = "";
  let description = "";

  if (pathname === "/dashboard") {
    title = "Welcome Back 👋, Muhammad Hussain";
    description =
      "your comprehensive overview of partner and campaign performance";
  } else if (pathname === "/dashboard/partners") {
    title = "Partners Management";
    description = "View, manage and analyze partner performance";
  } else if (pathname === "/dashboard/addpartner") {
    title = (
      <span className="flex items-center text-gray-700">
        <FaArrowLeft className="mr-2 text-gray-700" size={20} />
        Add New Partner
      </span>
    );
    description = "Add new partner for seamless management";
  } else if (pathname === "/dashboard/commissions") {
    title = "Commissions Management";
    description =
      "mange and customize commision structures for accurate partner payouts";
  } else if (pathname === "/dashboard/comissiondetail") {
    title = (
      <span className="flex items-center text-gray-700">
        <FaArrowLeft className="mr-2 text-gray-700" size={20} />
        Commission Detail
      </span>
    );
  } else if (pathname === "/dashboard/createcommission") {
    title = (
      <span className="flex items-center text-gray-700">
        <FaArrowLeft className="mr-2 text-gray-700 capitalize" size={20} />{" "}
        Commission management
      </span>
    );
    description =
      "Manage and customize commission structures for accurate partner payouts";
  } else if (pathname === "/dashboard/campaigns") {
    title = "Campaigns Management";
    description =
      "createm, monitor and optimize your campiagns for maximum impect.";
  } else if (pathname === "/dashboard/creatcompaign") {
    title = (
      <span className="flex items-center text-gray-700">
        <FaArrowLeft className="mr-2 text-gray-700" size={20} /> Create Campaign
      </span>
    );
    description =
      "Easily set up and manage your campaign goals, timelines, and team assignments in one place.";
  } else if (pathname === "/dashboard/campaigndetail") {
    title = (
      <span className="flex items-center text-gray-700">
        <FaArrowLeft className="mr-2 text-gray-700" size={20} />
        Campaign Detail
      </span>
    );
    description =
      "streamline your campaign goals, timelines and team assingments in one place";
  } else if (pathname === "/dashboard/teammember") {
    title = "Team Management";
    description = "manage system administrator and their permissions";
  } else if (pathname === "/dashboard/addteammember") {
    title = (
      <span className="flex items-center text-gray-700">
        <FaArrowLeft className="mr-2 text-gray-700 capitalize" size={20} /> Add
        New Team member
      </span>
    );
    description =
      "Add new team member and define their role for effective collaboration";
  } else if (pathname === "/dashboard/customers") {
    title = "Customers Management";
    description =
      "manage customer profiles , interactions and insights to strngth than to relationship";
  } else if (pathname === "/dashboard/addcustomer") {
    title = (
      <span className="flex items-center text-gray-700">
        <FaArrowLeft className="mr-2 text-gray-700 capitalize" size={20} /> Add
        New Customer
      </span>
    );
    description =
      "Add a team member and define their role for effective collaboration";
  } else if (pathname === "/dashboard/tags") {
    title = "Tags Management";
    description = "add, edit, and orgnized to streamline management";
  } else if (pathname === "/dashboard/reportandanlytic") {
    title = "Report and analytics";
    description =
      "track performance analyze trends and export detailed reports";
  } else if (pathname === "/dashboard/payouts") {
    title = "Payouts Management";
    description =
      "confirgure permissions track payments and manage payouts schedules";
  } else if (pathname === "/dashboard/roleandpermision") {
    title = "Role & Permissions";
    description =
      "manage team roles and permissions to control access and ensure secure efficient collaboration";
  } else if (pathname === "/dashboard/communication") {
    title = "Communication";
    description =
      "Manage and track all communication with your partners and team in one place";
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <div className="flex min-h-screen">
              {!isAuthPage && (
                <div className="lg:w-[20%]  w-[10%] text-black fixed h-full">
                  <Sidebar />
                </div>
              )}

              <div
                className={`${
                  !isAuthPage
                    ? " lg:w-[80%] w-[90%] lg:ml-[20%] ml-[10%]"
                    : "w-[100%]"
                }`}
              >
                <Header title={title} description={description} />
                <main className="py-4 px-1">{children}</main>
              </div>
            </div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
