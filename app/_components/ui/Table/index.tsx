import React from 'react';
import TableFooter from './TableFooter';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TablePropsType } from './types';

export default function Table<T extends { id: string | number }>({ columns, data, bottomContent }: TablePropsType<T>) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full rounded-md border-collapse border shadow-md'>
        <TableHeader columns={columns} />
        <tbody>
          {data.map(rowData => (
            <TableRow key={rowData.id} row={rowData} columns={columns} />
          ))}
        </tbody>
        <TableFooter colSpan={columns.length} bottomContent={bottomContent} />
      </table>
    </div>
  );
}
