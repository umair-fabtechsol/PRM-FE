'use client';

import PrivateRoute from '@/app/_components/PrivateRoute';
import { FaSearch, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import CustomersTable from './_components/CustomersTable';
import React from 'react';

export default function CustomersPage() {
  return (
    <PrivateRoute>
      <div className='py-4 lg:px-6 px-3 min-h-screen'>
        <div className='flex items-center justify-between  pb-4'>
          <div className='flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white'>
            <FaSearch className='text-gray-500 mr-2' />
            <input type='text' placeholder='Search' className='flex-1 outline-none bg-white text-gray-600 ' />
            <img src='/icons/union.png' alt='Custom Icon' className='w-4 h-4 ml-2' />
          </div>

          <div className='flex space-x-4'>
            <button className='flex items-center text-sm px-4 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition'>
              <img src='/icons/import.png' alt='Custom Icon' className='w-4 h-4 mr-2' />
              Export
            </button>

            <Link href='/dashboard/addcustomer'>
              <button className='flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
                <FaPlus className='mr-2 text-sm' />
                Add New
              </button>
            </Link>
          </div>
        </div>

        <CustomersTable />
      </div>
    </PrivateRoute>
  );
}
