import Table from '@/app/components/ui/Table';
import Image from 'next/image.js';
import React from 'react';
import { PayoutType } from '@/types';
import { PAYOUT_LIST } from '@/dummy-data';


export default function PayoutsTable() {
  const columns = React.useMemo(() => {
    return [
      {
        key: 'name' as keyof PayoutType,
        header: 'Payout Name'
      },
      { key: 'amount' as keyof PayoutType, header: 'Payout Amount' },
      { key: 'date' as keyof PayoutType, header: 'Schedule Date' },
      { key: 'payout' as keyof PayoutType, header: 'payout frequency' },
      { key: 'payment' as keyof PayoutType, header: 'payment processor' },
      {
        key: 'actions' as keyof PayoutType,
        header: '',
        render: () => (
          <div className='flex space-x-2'>
            <button className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src='/icons/comicon.png' alt='Custom Icon' />
            </button>
            <button className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src='/icons/delete.png' alt='Delete Icon' />
            </button>
            <button className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src="/icons/edit.png" alt='Delete Icon' />
            </button>
          </div>
        ),
      },
    ];
  }, []);
  return (
    <Table
      columns={columns}
      data={PAYOUT_LIST}
      // TODO: create reusable pagination and use that
      bottomContent={
        <div className='flex justify-between items-center w-full'>
          <div className='flex space-x-4 items-center'>
            <button className='px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg shadow hover:bg-gray-50 transition'>
              Previous
            </button>
            <button className='px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg shadow hover:bg-gray-50 transition'>
              Next
            </button>
          </div>
          <div className='text-gray-600 text-sm text-right'>Page 1 of 5</div>
        </div>
      }
    />
  );
}
