"use client";
import { TableinDashboardPageData } from "@/Utils/DummyData";
import React, { useState } from "react";
import BillingModal from "./BillingModal";

const Billing = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <BillingModal isOpen={isOpen} closeModal={closeModal} />
      <div className="bg-white min-h-screen   rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex  justify-between  p-4  border-b-2 items-center ">
          <h2 className=" text-[#2E2E2E] text-sm   font-Inter font-bold  mb-6">
            Payment Plans
          </h2>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#3366CC] flex gap-3 justify-center items-center px-4 py-2 rounded-lg font-Inter font-semibold text-sm text-[#FFFFFF]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83398 10L14.1673 10M10.0007 14.1667L10.0007 5.83337"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Create New
          </button>
        </div>
        <div className="">
          <section className="container px-4 mx-auto">
            <div className="flex flex-col mt-6">
              <div className=" overflow-x-auto  sm:-mx-6 ">
                <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-white dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-3  font-[Inter] text-xs  text-secondry  font-medium "
                          >
                            <button className="flex items-center gap-2 justify-center focus:outline-none">
                              <span className="font-Inter text-xs text-[#535862] font-medium ">
                                Plan Name
                              </span>
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
                            className=" py-3.5 text-left rtl:text-right font-[Inter] text-xs text-[#535862] font-medium"
                          >
                            Trail
                          </th>
                          <th
                            scope="col"
                            className=" py-3.5 font-[Inter] text-xs text-[#535862] font-medium"
                          >
                            Frequency
                          </th>
                          <th
                            scope="col"
                            className=" py-3.5 px-6 font-[Inter] text-xs text-[#535862] font-medium"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className=" py-3.5 font-[Inter] text-xs text-[#535862] font-medium"
                          >
                            Roles/Permis
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white  ">
                        {TableinDashboardPageData.map((item, index) => (
                          <tr
                            className={
                              index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
                            }
                          >
                            {/* name */}
                            <td className=" p-4  text-sm font-medium whitespace-nowrap">
                              <h2 className=" font-[Inter] text-sm text-[#181D27] font-medium">
                                Basic Plan
                              </h2>
                            </td>
                            {/* Subscription */}
                            <td className=" py-4 text-sm whitespace-nowrap">
                              <div>
                                <p className="text-[#535862] font-[Inter] text-sm font-normal">
                                  Lorem ispur
                                </p>
                              </div>
                            </td>
                            {/* License use */}
                            <td className=" py-4 text-sm whitespace-nowrap">
                              <div>
                                <p className="text-[#535862] font-[Inter] text-sm font-normal">
                                  10 Days
                                </p>
                              </div>
                            </td>
                            <td className=" py-4 text-sm whitespace-nowrap">
                              <div>
                                <p className="text-[#535862] font-[Inter] text-sm font-normal">
                                  Monthly
                                </p>
                              </div>
                            </td>
                            <td className=" p-4 flex justify-center items-center  text-sm font-medium whitespace-nowrap">
                              <h2 className=" font-[Inter] text-sm text-[#181D27] font-medium">
                                $ 500
                              </h2>
                            </td>
                            <td className=" p-4   text-sm font-medium whitespace-nowrap">
                              <h2 className=" font-[Inter] text-sm text-[#181D27] font-medium">
                                Role
                              </h2>
                            </td>
                            <td className="p-4   text-sm whitespace-nowrap">
                              <div className="flex justify-end gap-x-4">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    defaultValue=""
                                    className="sr-only peer"
                                  />
                                  <div className="relative w-6 h-4 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-2.5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                </label>
                                <button className="px-1 py-1  text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.50065 16.6667H3.33398V12.5001L10.834 5.00007M7.50065 16.6667H17.5007M7.50065 16.6667L15.0007 9.16674M15.0007 9.16674L16.3221 7.84525C16.973 7.19438 16.973 6.1391 16.3221 5.48823L14.5125 3.67858C13.8616 3.02771 12.8063 3.02771 12.1555 3.67859L10.834 5.00007M15.0007 9.16674L10.834 5.00007"
                                      stroke="#4A4A4A"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button className="px-1 py-1  text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.0007 5V14.1667C15.0007 16.0076 13.5083 17.5 11.6673 17.5H8.33398C6.49304 17.5 5.00065 16.0076 5.00065 14.1667V5M15.0007 5H13.334M15.0007 5H16.6673M5.00065 5H3.33398M5.00065 5H6.66732M8.33398 8.33333V14.1667M11.6673 8.33333V14.1667M6.66732 5V4.16667C6.66732 3.24619 7.41351 2.5 8.33398 2.5H11.6673C12.5878 2.5 13.334 3.24619 13.334 4.16667V5M6.66732 5H13.334"
                                      stroke="#4A4A4A"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-between bg-white border-t-2   py-4 p-2 mt-4">
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
                        <h1 className="text-[#414651] font-[Inter] font-medium text-sm">
                          Page 1 of 10
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end p-4 space-x-4 mb-4">
          <button className="bg-[#FFFFFF] border rounded-lg  py-2 px-12 text-[#2E2E2E] font-Inter font-semibold text-sm ">
            Cancel
          </button>
          <button className="bg-[#3366CC] ml-6 py-2 px-12 rounded-lg text-[#FFFFFF] font-Inter font-semibold text-sm ">
            Save
          </button>
        </div>

        {/* <div className="absolute bottom-4 right-2 ">
          <button className="bg-[#FFFFFF] border rounded-lg  py-2 px-12 text-[#2E2E2E] font-Inter font-semibold text-sm ">
            Cancel
          </button>
          <button className="bg-[#3366CC] ml-6 py-2 px-12 rounded-lg text-[#FFFFFF] font-Inter font-semibold text-sm ">
            Save
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Billing;
