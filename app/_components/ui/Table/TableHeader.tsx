import { TableHeaderPropsType } from './types';

export function TableHeader<T>({ columns }: TableHeaderPropsType<T>) {
  return (
    <thead className='bg-white border-b'>
      <tr>
        {columns.map(column => (
          <th
            className='px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap'
            key={String(column.key)}
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
