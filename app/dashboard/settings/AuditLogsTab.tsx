import React from 'react';
import AuditLogsTable from './_components/AuditLogsTable';

const AuditLogsTab = () => {
  return (
    <>
      <div className='bg-white    rounded-lg shadow-md w-full max-w-4xl'>
        <h2 className=' text-[#2E2E2E] text-sm p-4  border-b-2  font-Inter font-bold  '>Audit Logs</h2>
        <section className='container p-6 '>
          <div className='flex flex-col mt-6'>
            <div className=' overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8'>
              <div className=' inline-block min-w-full align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg'>
                  <AuditLogsTable />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AuditLogsTab;
