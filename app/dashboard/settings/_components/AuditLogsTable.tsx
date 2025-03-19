import Table from '@/app/_components/ui/Table';
import Image from 'next/image.js';
import React from 'react';
import { AuditLogsType } from '@/types';
import { AUDITLOGS_LIST } from '@/dummy-data';

export default function AuditLogsTable() {
  const columns = React.useMemo(() => {
    return [
      {
        key: 'imageUrl' as keyof AuditLogsType,
        header: 'Name',
        render: (imageUrl: string, row: AuditLogsType) => (
          <div className='flex items-center space-x-2'>
            <Image width={32} height={32} src={imageUrl} alt='User' className='rounded-full' />
            <div className='ml-2'>
              <span className='text-black text-sm'>{row?.name}</span>
              <br />
              <span className='text-gray-500 text-xs'>Sophia Martinez@gmail.com</span>
            </div>
          </div>
        ),
      },
      { key: 'activity' as keyof AuditLogsType, header: 'Activity' },
      {
        key: 'date' as keyof AuditLogsType,
        header: 'Date Time',
      },
      {
        key: 'actions' as keyof AuditLogsType,
        header: '',
        render: () => (
          <div className='flex space-x-2'>
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
      data={AUDITLOGS_LIST}
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
