import Table from '@/app/_components/ui/Table';
import Image from 'next/image.js';
import React from 'react';
import { RolesAndPermissionType } from '@/types';
import { ROLESANDPERMISSION_LIST } from '@/dummy-data';

export default function RolesAndPermissionTable() {
  const columns = React.useMemo(() => {
    return [
      { key: 'title' as keyof RolesAndPermissionType, header: 'Role Title' },
      {
        key: 'permissions' as keyof RolesAndPermissionType,
        header: 'Permissions',
        render: (value: any) => (
          <div className='flex flex-wrap gap-1'>
            {value.map((item: any, index: any) => (
              <span key={index} className='border border-gray-300 text-gray-700 text-xs px-1 rounded'>
                {item}
              </span>
            ))}
          </div>
        ),
      },
      { key: 'date' as keyof RolesAndPermissionType, header: 'Created Date' },
      {
        key: 'actions' as keyof RolesAndPermissionType,
        header: '',
        render: () => (
          <div className='flex space-x-2'>
            <button className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src='/icons/delete.png' alt='Delete Icon' />
            </button>
            <button className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src='/icons/edit.png' alt='Delete Icon' />
            </button>
          </div>
        ),
      },
    ];
  }, []);
  return (
    <Table
      columns={columns}
      data={ROLESANDPERMISSION_LIST}
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
