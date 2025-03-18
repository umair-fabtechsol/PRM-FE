import React from 'react';
import { FaPlus } from 'react-icons/fa';

import Link from 'next/link';
import Image from 'next/image.js';

function PartnersTableActions() {
  return (
    <div className='flex space-x-2 lg:space-x-4'>
      <button className='flex items-center text-sm lg:px-4 px-3 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition'>
        <Image width={16} height={16} src='/icons/import.png' alt='Custom Icon' className='mr-2' />
        Export
      </button>

      <button className='flex items-center text-sm lg:px-4 px-3 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition'>
        <Image width={16} height={16} src='/icons/export.png' alt='Custom Icon' className='w-4 h-4 mr-2' />
        Import
      </button>

      <Link href='/dashboard/addpartner'>
        <button className='flex text-sm items-center lg:px-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
          <FaPlus className='mr-2 text-sm' />
          Add New
        </button>
      </Link>
    </div>
  );
}

export default PartnersTableActions;
