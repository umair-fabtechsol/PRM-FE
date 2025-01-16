"use client";
import React, { useState } from 'react'

const BillingModal = ({ isOpen, closeModal }) => {

    return (
        <>
            <div>
                {isOpen && (
                    <div
                        id="hs-small-modal"
                        className="fixed top-0 left-0 w-full overflow-y-auto  h-full z-[80] bg-black bg-opacity-50 flex justify-center items-center"
                        role="dialog"
                        aria-labelledby="hs-small-modal-label"
                    >
                        <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                            <div className="flex justify-between items-center py-3 px-4  dark:border-neutral-700">
                                <h3 id="hs-small-modal-label" className="font-bold text-gray-800 dark:text-white">
                                    Payment Plan
                                </h3>
                            </div>
                            <div className="p-4  max-h-[80vh] overflow-y-auto">
                                <div className="mb-4">
                                    <label className="block text-[#2E2E2E] font-Inter  text-sm font-bold mb-2" htmlFor="old-password">
                                        Plan Name
                                    </label>
                                    <input
                                        id="old-password"
                                        type="password"
                                        placeholder='Enter Your Email'
                                        className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#2E2E2E] font-Inter  text-sm font-bold mb-2" htmlFor="old-password">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        placeholder="Write Here..."
                                        className="border h-28 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                                    />
                                </div>
                                <div className='mb-4'>
                                    <div className="flex justify-between items-center ">
                                        <div className="flex justify-between gap-1 w-full">
                                            <div className="flex w-1/2  flex-col">
                                                <label className="text-sm font-medium text-gray-700 mb-1">Trial Period</label>
                                                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                                                    <input
                                                        type="text"
                                                        value="30 Days"
                                                        className="flex-grow text-gray-700 focus:outline-none"
                                                        readOnly
                                                    />
                                                    <svg
                                                        className="ml-2"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7.5 4H7C4.79086 4 3 5.79086 3 8M7.5 4V2M7.5 4H16.5M16.5 4H17C19.2091 4 21 5.79086 21 8M16.5 4V2M3 8V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V8M3 8H21"
                                                            stroke="#4A4A4A"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>

                                            </div>
                                            <div className="flex w/1/2 flex-col">
                                                <label className="text-sm font-medium text-gray-700 mb-1">Billing Frequency</label>
                                                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                                                    <input type="text" placeholder="Enter here" className="outline-none flex-grow text-gray-700" />
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16 10L12 14L8 10" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#2E2E2E] font-Inter  text-sm font-bold mb-2" htmlFor="old-password">
                                        Price
                                    </label>
                                    <textarea
                                        id="description"
                                        placeholder="$"
                                        className="border h-28 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#2E2E2E] font-Inter  text-sm font-bold mb-2" htmlFor="old-password">
                                        Role
                                    </label>
                                    <select value={""} className='w-full  border  p-3 rounded-xl'>
                                        <option value={""}>Role</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <ul>
                                        <li className='flex justify-between text-[#2E2E2E] font-Inter text-sm font-semibold'>
                                            Plan Visibility
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultValue="" className="sr-only peer" />
                                                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-4 ">
                                    <h1 className="text-lg font-bold mb-4">Features & Limits</h1>
                                    <div className="space-y-4 w-full">
                                        <div className="flex  items-center">
                                            <span className="w-1/2 text-[#2E2E2E] font-Inter font-medium">Feature 01</span>
                                            <input type="text" placeholder="Enter limit" className="w/1/2 p-2 border rounded-md" />
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1/2 text-[#2E2E2E] font-Inter font-medium">Feature 02</span>
                                            <input type="text" placeholder="Enter limit" className="w/1/2 p-2 border rounded-md" />
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1/2 text-[#2E2E2E] font-Inter font-medium">Feature 03</span>
                                            <input type="text" placeholder="Enter limit" className="w/1/2 p-2 border rounded-md" />
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1/2 text-[#2E2E2E] font-Inter font-medium">Feature 04</span>
                                            <input type="text" placeholder="Enter limit" className="w/1/2 p-2 border rounded-md" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full justify-end items-center gap-x-2 py-3 px-4  dark:border-neutral-700">
                                <button
                                    onClick={closeModal}
                                    className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg border bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BillingModal