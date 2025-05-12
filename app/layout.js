'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ToastProvider from '@/app/_components/ToastProvider.js';
import { AuthProvider } from './context/AuthContext';
import Sidebar from '@/app/_components/Sidebar';
import { usePathname } from 'next/navigation';
import Header from '@/app/_components/Header';
import Head from 'next/head';
import { FaArrowLeft } from 'react-icons/fa';
import { Provider } from "react-redux"
import { store } from './store/store';
import 'dotenv/config'
import FetchTag from '@/app/common/FetchTag';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/forgotpassword' ||
    pathname === '/checkemail' ||
    pathname === '/createpassword' ||
    pathname === '/passwordreset';

  let title = '';
  let description = '';

  if (pathname === '/dashboard') {
    title = 'Welcome Back 👋, Muhammad Hussain';
    description = 'your comprehensive overview of partner and campaign performance';
  } else if (pathname === '/dashboard/partners') {
    title = 'Partners Management';
    description = 'View, manage and analyze partner performance';
  } else if (pathname === '/dashboard/addpartner') {
    title = (
      <span className='flex items-center text-gray-700'>
        <FaArrowLeft className='mr-2 text-gray-700' size={20} />
        Add New Partner
      </span>
    );
    description = 'Add new partner for seamless management';
  } else if (pathname === '/dashboard/commissions') {
    title = 'Commissions Management';
    description = 'mange and customize commision structures for accurate partner payouts';
  } else if (pathname === '/dashboard/comissiondetail') {
    title = (
      <span className='flex items-center text-gray-700'>
        <FaArrowLeft className='mr-2 text-gray-700' size={20} />
        Commission Detail
      </span>
    );
  } else if (pathname === '/dashboard/createcommission') {
    title = (
      <span className='flex items-center text-gray-700'>
        <FaArrowLeft className='mr-2 text-gray-700 capitalize' size={20} /> Commission management
      </span>
    );
    description = 'Manage and customize commission structures for accurate partner payouts';
  } else if (pathname === '/dashboard/campaigns') {
    title = 'Campaigns Management';
    description = 'createm, monitor and optimize your campiagns for maximum impect.';
  } else if (pathname === '/dashboard/creatcompaign') {
    title = (
      <span className='flex items-center text-gray-700'>
        <FaArrowLeft className='mr-2 text-gray-700' size={20} /> Create Campaign
      </span>
    );
    description = 'Easily set up and manage your campaign goals, timelines, and team assignments in one place.';
  } else if (pathname === '/dashboard/campaigndetail') {
    title = (
      <span className='flex items-center text-gray-700'>
        <FaArrowLeft className='mr-2 text-gray-700' size={20} />
        Campaign Detail
      </span>
    );
    description = 'streamline your campaign goals, timelines and team assingments in one place';
  } else if (pathname === '/dashboard/teammember') {
    title = 'Team Management';
    description = 'manage system administrator and their permissions';
  } else if (pathname === '/dashboard/addteammember') {
    title = (
      <span className='flex items-center text-gray-700'>
        <FaArrowLeft className='mr-2 text-gray-700 capitalize' size={20} /> Add New Team member
      </span>
    );
    description = 'Add new team member and define their role for effective collaboration';
  } else if (pathname === '/dashboard/customers') {
    title = 'Customers Management';
    description = 'manage customer profiles , interactions and insights to strngth than to relationship';
  } else if (pathname === '/dashboard/addcustomer') {
    title = (
      <span className='flex items-center text-gray-700'>
        <FaArrowLeft className='mr-2 text-gray-700 capitalize' size={20} /> Add New Customer
      </span>
    );
    description = 'Add a team member and define their role for effective collaboration';
  } else if (pathname === '/dashboard/tags') {
    title = 'Tags Management';
    description = 'add, edit, and orgnized to streamline management';
  } else if (pathname === '/dashboard/reportandanlytic') {
    title = 'Report and analytics';
    description = 'track performance analyze trends and export detailed reports';
  } else if (pathname === '/dashboard/payouts') {
    title = 'Payouts Management';
    description = 'confirgure permissions track payments and manage payouts schedules';
  } else if (pathname === '/dashboard/roleandpermision') {
    title = 'Role & Permissions';
    description = 'manage team roles and permissions to control access and ensure secure efficient collaboration';
  } else if (pathname === '/dashboard/communication') {
    title = 'Communication';
    description = 'Manage and track all communication with your partners and team in one place';
  } else if (pathname === '/dashboard/calender') {
    title = 'Calendar';
    description = 'Stay organized by scheduling and tracking events, tasks, and deadlines in one place.';
  } else if (pathname === '/dashboard/settings') {
    title = 'Settings';
    description = 'Tailor your PRM system to match your business requirements and preferences.';
  } else if (pathname === '/dashboard/notisfications') {
    title = 'Notifications';
    description = 'Stay updated with system alerts, updates, and tasks.';
  }

  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz@14..32&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <AuthProvider>
            <ToastProvider>
              <FetchTag />
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
                  {" "}
                  {!isAuthPage && (
                    <Header title={title} description={description} />
                  )}
                  <main className="py-4 px-1">{children}</main>
                </div>
              </div>
            </ToastProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
