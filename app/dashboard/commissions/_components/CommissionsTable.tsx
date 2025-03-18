import Table from '@/app/components/ui/Table';
import Image from 'next/image.js';
import React from 'react';
import { CommissionType } from '@/types';
import { COMMISSION_LIST } from '@/dummy-data';


export default function CommissionsTable() {
  const columns = React.useMemo(() => {
    return [
      {
        key: 'name' as keyof CommissionType,
        header: 'Commission Name'
      },
      { key: 'description' as keyof CommissionType, header: 'Description' },
      { key: 'type' as keyof CommissionType, header: 'Commission Type' },
      { key: 'payout' as keyof CommissionType, header: 'payout frequency' },
      { key: 'payment' as keyof CommissionType, header: 'payment processor' },
      {
        key: 'actions' as keyof CommissionType,
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
      data={COMMISSION_LIST}
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
