import Table from '@/app/_components/ui/Table';
import Image from 'next/image.js';
import React from 'react';
import { FeaureType } from '@/types';
import { FEATURE_LIST } from '@/dummy-data';

export default function FeatureTable() {
  const columns = React.useMemo(() => {
    return [
      {
        key: 'name' as keyof FeaureType,
        header: 'Feature Name',
      },
      {
        key: 'description' as keyof FeaureType,
        header: 'Description',
      },
      {
        key: 'actions' as keyof FeaureType,
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
      data={FEATURE_LIST}
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
