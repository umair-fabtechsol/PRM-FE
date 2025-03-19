import { TableFooterPropsType } from './types';

function TableFooter({ bottomContent, colSpan }: TableFooterPropsType) {
  return (
    <>
      {bottomContent && (
        <tfoot className='bg-gray-100 border-t'>
          <tr>
            <td colSpan={colSpan} className='px-4 py-3'>
              {bottomContent}
            </td>
          </tr>
        </tfoot>
      )}
    </>
  );
}

export default TableFooter;
