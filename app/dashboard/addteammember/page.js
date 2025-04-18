'use client';

import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import PrivateRoute from '@/app/_components/PrivateRoute';

export default function AddTeamMember() {
  const [image, setImage] = useState(null);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setImage(null);
  };
  return (
    <PrivateRoute>
      <div className='container mx-auto lg:p-4 p-2'>
        <form>
          {' '}
          <div className='flex flex-col my-3'>
            <label htmlFor='profileImage' className=' py-3 text-gray-700 text-sm'>
              Profile
            </label>
            <div className=' flex items-end '>
              <div className=' w-24 h-24 rounded-full border border-gray-300 bg-gray-200 overflow-hidden'>
                <img src={image || '/images/image.jpg'} alt='Profile' className='object-cover w-full h-full' />
              </div>
              <div className='px-6'>
                <label htmlFor='fileInput' className='cursor-pointer text-gray-600'>
                  <div className='p-2 rounded-full border border-gray-300 bg-white flex items-center justify-center'>
                    <img src='/icons/export.png' alt='Custom Icon' className='w-4 h-4 ' />
                  </div>

                  <input id='fileInput' type='file' accept='image/*' onChange={handleImageUpload} className='hidden' />
                </label>
              </div>

              <div>
                <div
                  onClick={handleImageDelete}
                  className='cursor-pointer   p-2 rounded-full border border-gray-300 bg-white flex items-center justify-center'
                >
                  <img src='/icons/delete.png' alt='Custom Icon' className='w-4 h-4 ' />
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label htmlFor='firstName' className='text-gray-700 text-sm'>
                Name
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
                <FaUser className='text-gray-600 ml-2' size={16} />
              </div>
            </div>

            <div className='flex flex-col'>
              <label htmlFor='tag' className='text-gray-700 text-sm'>
                Tag
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
                Role
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
          </div>
          <div className='sm:col-span-2 flex justify-end space-x-4 mt-6'>
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
