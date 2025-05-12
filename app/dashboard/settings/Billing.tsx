'use client';
import React, { useState } from 'react';
import BillingModal from './BillingModal';
import BillingTable from './_components/BillingTable';

const Billing = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <BillingModal isOpen={isOpen} closeModal={closeModal} />
      <div className='bg-white min-h-screen   rounded-lg shadow-md w-full max-w-4xl'>
        <div className='flex  justify-between  p-4  border-b-2 items-center '>
          <h2 className=' text-[#2E2E2E] text-sm   font-Inter font-bold  mb-6'>Payment Plans</h2>
          <button
            onClick={() => setIsOpen(true)}
            className='bg-[#3366CC] flex gap-3 justify-center items-center px-4 py-2 rounded-lg font-Inter font-semibold text-sm text-[#FFFFFF]'
          >
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M5.83398 10L14.1673 10M10.0007 14.1667L10.0007 5.83337'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Create New
          </button>
        </div>
        <div className=''>
          <section className='container px-4 mx-auto'>
            <div className='flex flex-col mt-6'>
              <div className=' overflow-x-auto  sm:-mx-6 '>
                <div className=' inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden border border-gray-200 text-gray-700 md:rounded-lg'>
                    <BillingTable />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className='flex justify-end p-4 space-x-4 mb-4'>
          <button className='bg-[#FFFFFF] border border-gray-300 rounded-lg py-2 px-12 text-[#2E2E2E] font-Inter font-semibold text-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400'>
            Cancel
          </button>
          <button className='bg-[#3366CC] py-2 px-12 rounded-lg text-[#FFFFFF] font-Inter font-semibold text-sm transition-all duration-300 hover:bg-[#254a99]'>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Billing;
