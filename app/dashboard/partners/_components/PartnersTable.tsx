import Table from '@/app/_components/ui/Table';
import Image from 'next/image.js';
import React from 'react';
import { PartnerType } from '@/types';
import { PARTNERS_LIST } from '@/dummy-data';

type Props = {
  onPartnerDelete: (partnerId: string) => void;
};
export default function PartnersTable({ onPartnerDelete }: Props) {
  const columns = React.useMemo(() => {
    return [
      {
        key: 'imageUrl' as keyof PartnerType,
        header: 'Name',
        render: (imageUrl: string, row: PartnerType) => (
          <div className='flex items-center space-x-2'>
            <Image width={32} height={32} src={imageUrl} alt='User' className='rounded-full' />
            <div className='ml-2'>
              <span className='text-black text-sm'>{row?.name}</span>
              <br />
              <span className='text-gray-500 text-xs'>User Title</span>
            </div>
          </div>
        ),
      },
      { key: 'email' as keyof PartnerType, header: 'Email' },
      { key: 'phone' as keyof PartnerType, header: 'Phone' },
      { key: 'company' as keyof PartnerType, header: 'Company' },
      { key: 'type' as keyof PartnerType, header: 'Type' },
      {
        key: 'tags' as keyof PartnerType,
        header: 'Tags',
        render: (value: any) => {
          const colorClasses: Record<string, string> = {
            Red: 'bg-red-100 text-red-500',
            Blue: 'bg-blue-100 text-blue-500',
            Green: 'bg-green-100 text-green-500',
          };
          return <span className={`text-xs px-2 py-1 rounded-xl ${colorClasses[value]}`}>{value}</span>;
        },
      },
      {
        key: 'actions' as keyof PartnerType,
        header: '',
        render: (_, row) => (
          <div className='flex space-x-2'>
            <button className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src='/icons/usericon.png' alt='Custom Icon' />
            </button>
            <button onClick={onPartnerDelete.bind(null, row.id)} className='text-gray-700 hover:text-blue-700'>
              <Image width={16} height={16} src='/icons/delete.png' alt='Delete Icon' />
            </button>
          </div>
        ),
      },
    ];
  }, [onPartnerDelete]);
  return (
    <Table
      columns={columns}
      data={PARTNERS_LIST}
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
