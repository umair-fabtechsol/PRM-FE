import React from 'react';
import Image from 'next/image.js';
import { useLockBodyScroll } from '@/app/_hooks/useLockBodyScroll';

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: string | null) => void;
  confirmDelete: () => void;
};

export default function DeletePartnerModal({ isOpen, onOpenChange, confirmDelete }: Props) {
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;
  return (
    <div>
      <div
        onClick={onOpenChange.bind(null, null)}
        className='fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center'
      />

      <div className='bg-white min-w-[350px] h-fit absolute z-20 -translate-y-[50%] -translate-x-[50%] left-[50%] top-[50%]  rounded-lg p-6 shadow-lg '>
        <div className='flex justify-left my-2 text-red-500'>
          <Image src='/icons/deleteicon.png' alt='Add Widget' className='mr-2' width={60} height={60} />
        </div>

        <h2 className='text-left p-2 text-lg font-semibold text-black'>Delete User</h2>

        <p className='text-left  text-sm text-gray-500 mt-2'>Are you sure you want to delete this user?</p>

        <div className='mt-6 flex justify-between gap-4'>
          <button
            onClick={() => onOpenChange(null)}
            className='w-full py-2 text-black border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100'
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className='w-full py-2 text-white bg-red-700 rounded-lg shadow-sm hover:bg-red-800'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
