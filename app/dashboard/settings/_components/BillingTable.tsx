import Table from '@/app/_components/ui/Table';
import Image from 'next/image.js';
import React from 'react';
import { BillingType } from '@/types';
import { BILLING_LIST } from '@/dummy-data';

export default function BillingTable() {
  const columns = React.useMemo(() => {
    return [
      {
        key: 'name' as keyof BillingType,
        header: 'Plan Name',
      },
      { key: 'description' as keyof BillingType, header: 'Description' },
      {
        key: 'trail' as keyof BillingType,
        header: 'Trail',
      },
      { key: 'frequency' as keyof BillingType, header: 'Frequency' },
      { key: 'price' as keyof BillingType, header: 'Price' },
      { key: 'roles' as keyof BillingType, header: 'Roles/permis' },
      {
        key: 'actions' as keyof BillingType,
        header: '',
        render: () => (
          <div className='flex space-x-2'>
            <label className='inline-flex items-center cursor-pointer'>
              <input type='checkbox' defaultValue='' className='sr-only peer' />
              <div className="relative w-6 h-4 bg-gray-200  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-2.5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
            <button className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src='/icons/edit.png' alt='Delete Icon' />
            </button>
            <button className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src='/icons/delete.png' alt='Delete Icon' />
            </button>
          </div>
        ),
      },
    ];
  }, []);
  return (
    <Table
      columns={columns}
      data={BILLING_LIST}
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
