'use client';

import PrivateRoute from '@/app/_components/PrivateRoute';
import { FaUser } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div className='container mx-auto lg:p-4 p-2'>
        <form className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label htmlFor='firstName' className='text-gray-700 text-sm'>
              First Name
            </label>
            <input
              id='firstName'
              type='text'
              placeholder='First Name'
              className='w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='username' className='text-gray-700 text-sm'>
              Username
            </label>
            <div className='flex items-center border border-gray-300 bg-white px-4 py-2 rounded-md shadow-sm'>
              <input
                id='username'
                type='text'
                placeholder='Username'
                className='w-full outline-none bg-white text-black text-sm'
              />
              <FaUser className='text-gray-600 ml-2' size={20} />
            </div>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='tag' className='text-gray-700 text-sm'>
              Select Tag
            </label>
            <select
              id='tag'
              className='w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm'
            >
              <option value=''>Select Tag</option>
              <option value='tag1'>Tag 1</option>
              <option value='tag2'>Tag 2</option>
              <option value='tag3'>Tag 3</option>
              <option value='tag4'>Tag 4</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='role' className='text-gray-700 text-sm'>
              Select Role
            </label>
            <select
              id='role'
              className='w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm'
            >
              <option value=''>Select Role</option>
              <option value='role1'>Role 1</option>
              <option value='role2'>Role 2</option>
              <option value='role3'>Role 3</option>
              <option value='role4'>Role 4</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='email' className='text-gray-700 text-sm'>
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='Email'
              className='w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='phone' className='text-gray-700 text-sm'>
              Phone
            </label>
            <input
              id='phone'
              type='text'
              placeholder='Phone'
              className='w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='company' className='text-gray-700 text-sm'>
              Select Company
            </label>
            <select
              id='company'
              className='w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm'
            >
              <option value=''>Select Company</option>
              <option value='company1'>Company 1</option>
              <option value='company2'>Company 2</option>
              <option value='company3'>Company 3</option>
              <option value='company4'>Company 4</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='role2' className='text-gray-700 text-sm'>
              Select Role
            </label>
            <select
              id='role2'
              className='w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm'
            >
              <option value=''>Select Role</option>
              <option value='role1'>Role 1</option>
              <option value='role2'>Role 2</option>
              <option value='role3'>Role 3</option>
              <option value='role4'>Role 4</option>
            </select>
          </div>
          <div className='sm:col-span-2 flex justify-end space-x-4 my-6'>
            <button
              type='button'
              className='w-36 px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 transition'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='w-36 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
}
