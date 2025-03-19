'use client';

import PrivateRoute from '@/app/_components/PrivateRoute';
import { FaArrowUp } from 'react-icons/fa';

import { useModal } from '@/app/_components/ui/Modal';
import AddWidgetModal from './_components/AddWidgetModal';

export default function DashboardPage() {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <PrivateRoute>
      <AddWidgetModal isOpen={isOpen} onOpen={openModal} closeModal={closeModal} />
      <div className='py-4 lg:px-6 px-3  bg-transparent'>
        <div className='mt-8 flex justify-end'>
          <button
            onClick={openModal}
            className='px-4 py-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-all duration-200'
          >
            <img src='/icons/addwidget.svg' alt='Add Widget' className='mr-2' width={18} height={18} />
            Add Widget
          </button>
        </div>

        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full'>
            <div>
              <div className='flex items-center'>
                <p className='text-sm text-black font-bold mr-2'>Total Revenue Generated</p>

                <img src='/icons/revnew.png' alt='Icon' className='mr-2' width={40} height={40} />
              </div>
              <h1 className='text-2xl text-black font-semibold my-3'>$1,25,000</h1>
            </div>
            <div className='mt-2 text-sm text-gray-700  flex items-center'>
              <FaArrowUp className='mr-1 text-green-500 ' size={16} />
              <span className='text-green-500 pr-3'>40%</span> vs Last Month
            </div>
          </div>

          <div className='bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full'>
            <div>
              <div className='flex items-center'>
                <p className='text-sm text-black font-bold mr-2'>Active affiliates/ partners</p>

                <img src='/icons/partners.png' alt='Icon' className='mr-2' width={40} height={40} />
              </div>
              <h1 className='text-2xl text-black font-semibold my-3'>250</h1>
            </div>
            <div className='mt-2 text-sm text-gray-700  flex items-center'>
              <FaArrowUp className='mr-1 text-red-500 ' size={16} />
              <span className='text-red-500 pr-3'>40%</span> vs Last Month
            </div>
          </div>

          <div className='bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full'>
            <div>
              <div className='flex items-center'>
                <p className='text-sm text-black font-bold mr-2'>top performance campaign</p>

                <img src='/icons/campaign.png' alt='Icon' className='mr-2' width={40} height={40} />
              </div>
              <h1 className='text-2xl text-black font-semibold my-3'>$50,000</h1>
            </div>
            <div className='mt-2 text-sm text-gray-700  flex items-center'>Black friday promo</div>
          </div>

          <div className='bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full'>
            <div>
              <div className='flex items-center'>
                <p className='text-sm text-black font-bold mr-2'>upcoming payouts</p>

                <img src='/icons/payout.png' alt='Icon' className='mr-2' width={40} height={40} />
              </div>
              <h1 className='text-2xl text-black font-semibold my-3'>$30,000</h1>
            </div>
            <div className='mt-2 text-sm text-gray-700  flex items-center'>sheduled for next week</div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
