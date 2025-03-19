import React from 'react';
import { Modal } from '@/app/_components/ui/Modal';
import Image from 'next/image';
type Props = {
  closeModal: () => void;
  onOpen: () => void;
  isOpen: boolean;
};
export default function AddWidgetModal({ closeModal, isOpen }: Props) {
  return (
    <Modal onClose={closeModal} isOpen={isOpen} closeOnOutSideClick hideBodyScrollBar>
      <div className='bg-white w-[400px] rounded-lg p-6 shadow-lg relative'>
        <div className='flex justify-left my-2 text-red-500'>
          <Image src='/icons/addwidgets.png' alt='Add Widget' className='mr-2' width={40} height={40} />
        </div>

        <h2 className='text-left p-2 text-lg font-semibold text-black'>Smart Widget</h2>

        <div className='my-4'>
          <label htmlFor='widget-type' className='block text-sm  text-gray-700 mb-1'>
            who see&lsquo;s generated widget
          </label>
          <select
            id='widget-type'
            className='w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
          >
            <option value='type1'>Custome widget</option>
            <option value='type2'>Smart widget</option>
          </select>

          <label htmlFor='widget-name' className='block text-sm  text-gray-700 mt-2 mb-1'>
            Widget Name
          </label>
          <input
            id='widget-name'
            type='text'
            placeholder='Enter widget name'
            className='w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
          />
        </div>

        {/* Buttons */}
        <div className='mt-6 mb-2 flex justify-between gap-4'>
          <button
            onClick={closeModal}
            className='w-full py-2 text-gray-500 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100'
          >
            Cancel
          </button>
          <button
            onClick={closeModal}
            className='w-full py-2 text-white bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800'
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
