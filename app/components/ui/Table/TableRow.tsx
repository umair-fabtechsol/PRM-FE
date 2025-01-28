import { TableCellPropsType, TableRowPropsType } from './types';

export function TableRow<T>({ columns, row }: TableRowPropsType<T>) {
  return (
    <tr className='hover:bg-gray-100 bg-white'>
      {columns.map(column => (
        <TableCell key={String(column.key)} row={row} value={row[column.key]} render={column.render} />
      ))}
    </tr>
  );
}

function TableCell<T>({ value, render, row }: TableCellPropsType<T>) {
  return (
    <td className='px-4 py-3 text-gray-700 text-sm whitespace-nowrap'>{render ? render(value, row) : String(value)}</td>
  );
}
