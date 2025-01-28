import React from 'react';
import Image from 'next/image.js';
import { FaSearch } from 'react-icons/fa';

export default function PageHeader() {
  return (
    <div className='flex relative items-center border border-gray-300 rounded px-2 py-2 w-full max-w-sm bg-white md:max-w-xs lg:max-w-sm'>
      <FaSearch className='text-gray-500 mr-2 text-base md:text-sm' />
      <input
        type='text'
        placeholder='Search'
        className='flex-1 outline-none bg-white text-gray-700 text-base md:text-sm'
      />
      <div className='w-5 h-5 ml-2 md:w-4 right-2 absolute md:h-4'>
        <Image src='/icons/union.png' fill sizes='20px' alt='Custom Icon' className='object-cover' />
      </div>
    </div>
  );
}
