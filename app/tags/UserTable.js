"use client";
import React, { useState } from 'react'
import { TableinDashboardPageData } from '../../Utils/DummyData';

const UserTable = () => {


    return (
        <section className="container pr-8 mx-auto">
            <div className="flex justify-between">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-[2]">
                        <label htmlFor="search-input" className="sr-only">
                            Search
                        </label>
                        <div className="relative flex rounded-lg border">
                            <input
                                type="text"
                                id="search-input"
                                name="search-input"
                                className="py-2 px-16 pl-11 w-full border border-gray-200 shadow-sm rounded-lg text-sm  disabled:opacity-50 disabled:pointer-events-none  "
                                placeholder="Search..."
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center  pr-4'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.8333 15.8333C10.8333 16.7538 11.5795 17.5 12.5 17.5C13.4205 17.5 14.1667 16.7538 14.1667 15.8333M10.8333 15.8333C10.8333 14.9129 11.5795 14.1667 12.5 14.1667C13.4205 14.1667 14.1667 14.9129 14.1667 15.8333M10.8333 15.8333H2.5M14.1667 15.8333H17.5M10.8333 4.16667C10.8333 5.08714 11.5795 5.83333 12.5 5.83333C13.4205 5.83333 14.1667 5.08714 14.1667 4.16667M10.8333 4.16667C10.8333 3.24619 11.5795 2.5 12.5 2.5C13.4205 2.5 14.1667 3.24619 14.1667 4.16667M10.8333 4.16667L2.5 4.16667M14.1667 4.16667H17.5M9.16667 10C9.16667 10.9205 8.42047 11.6667 7.5 11.6667C6.57953 11.6667 5.83333 10.9205 5.83333 10M9.16667 10C9.16667 9.07953 8.42047 8.33333 7.5 8.33333C6.57953 8.33333 5.83333 9.07953 5.83333 10M9.16667 10L17.5 10M5.83333 10H2.5" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                                <svg
                                    className="h-4 w-4 text-black dark:text-neutral-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='bg-[#3366CC] flex gap-3 justify-center items-center px-4 py-2 rounded-lg font-Inter font-semibold text-sm text-[#FFFFFF]'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83398 10L14.1673 10M10.0007 14.1667L10.0007 5.83337" stroke="white" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                    Add new
                </button>

            </div>
            <div className="flex flex-col mt-6">
                <div className="-mx-4 overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                    <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-white dark:bg-gray-800">
                                    <tr>
                                        {/* <th
                                            scope="col"
                                            className="px-3 py-3.5 font-[Inter] text-xs  text-secondry  font-medium"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="#F9F5FF" />
                                                <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" stroke="#7F56D9" />
                                                <path d="M5.9165 10H14.0832" stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </th> */}
                                        <th
                                            scope="col"
                                            className="px-3  font-[Inter] text-xs  text-secondry  font-medium "
                                        >
                                            <button className="flex items-center gap-2 justify-center focus:outline-none">
                                                <span className="font-Inter text-xs text-[#535862] font-medium ">Tag Name</span>
                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px- py-3.5 text-left rtl:text-right font-[Inter] text-xs text-[#535862] font-medium"
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px- py-3.5 text-left rtl:text-right font-[Inter] text-xs text-[#535862] font-medium"
                                        >
                                            Color
                                        </th>
                                        <th
                                            scope="col"
                                            className=" py-3.5 font-[Inter] text-xs text-[#535862] font-medium"
                                        >

                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {TableinDashboardPageData.map((item, index) => (
                                        <tr className={index % 2 === 0 ? 'bg-[#fafafa]' : 'bg-white'}>
                                            {/* name */}
                                            <td className=" p-4  text-sm font-medium whitespace-nowrap">
                                                <h2 className=" font-[Inter] text-sm text-[#181D27] font-medium">
                                                    {item.Name}
                                                </h2>
                                            </td>
                                            {/* Subscription */}
                                            <td className=" py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <p className="text-[#535862] font-[Inter] text-sm font-normal">
                                                        {item.SubscribePlan}
                                                    </p>
                                                </div>
                                            </td>
                                            {/* License use */}
                                            <td className=" p-4 flex justify-between w-fit gap-8  text-sm whitespace-nowrap">
                                                <div className="w-8 h-8  bg-[#f5f5f5] overflow-hidden rounded-full">
                                                    <div className={`bg-[#7F56D9]  h-full`}  ></div>
                                                </div>
                                                <h1>For Partner</h1>
                                            </td>
                                            <td className="p-4   text-sm whitespace-nowrap">
                                                <div className='flex justify-end gap-x-4'>
                                                    <button className="px-1 py-1  text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.0007 5V14.1667C15.0007 16.0076 13.5083 17.5 11.6673 17.5H8.33398C6.49304 17.5 5.00065 16.0076 5.00065 14.1667V5M15.0007 5H13.334M15.0007 5H16.6673M5.00065 5H3.33398M5.00065 5H6.66732M8.33398 8.33333V14.1667M11.6673 8.33333V14.1667M6.66732 5V4.16667C6.66732 3.24619 7.41351 2.5 8.33398 2.5H11.6673C12.5878 2.5 13.334 3.24619 13.334 4.16667V5M6.66732 5H13.334" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </button>
                                                    <button className="px-1 py-1  text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.50065 16.6667H3.33398V12.5001L10.834 5.00007M7.50065 16.6667H17.5007M7.50065 16.6667L15.0007 9.16674M15.0007 9.16674L16.3221 7.84525C16.973 7.19438 16.973 6.1391 16.3221 5.48823L14.5125 3.67858C13.8616 3.02771 12.8063 3.02771 12.1555 3.67859L10.834 5.00007M15.0007 9.16674L10.834 5.00007" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                                                        </svg>

                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                            <div className="flex justify-between   p-2 mt-4">
                                <div className="flex gap-x-2 ">
                                    <a
                                        href="#"
                                        className="flex items-center  border-[#D5D7DA]  px-5 py-2 text-sm font-semibold font-[Inter] text-[#414651] bg-white border rounded-md gap-x-2 "
                                    >
                                        <span>Previous</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center border-[#D5D7DA] px-5 py-2 text-sm font-semibold font-[Inter] text-[#414651] bg-white border rounded-md gap-x-2 "
                                    >
                                        <span>Next</span>
                                    </a>
                                </div>
                                <div>
                                    <h1 className="text-[#414651] font-[Inter] font-medium text-sm">Page 1 of 10</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserTable