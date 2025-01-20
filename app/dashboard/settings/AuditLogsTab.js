import React from "react";
import { AuditLogTabsTData } from "@/Utils/DummyData";

const AuditLogsTab = () => {
  return (
    <>
      <div className="bg-white    rounded-lg shadow-md w-full max-w-4xl">
        <h2 className=" text-[#2E2E2E] text-sm p-4  border-b-2  font-Inter font-bold  ">
          Audit Logs
        </h2>
        <section className="container p-6 ">
          <div className="flex flex-col mt-6">
            <div className=" overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
              <div className=" inline-block min-w-full align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-white dark:bg-gray-800">
                      <tr className="bg-white">
                        <th
                          scope="col"
                          className="px-3  font-[Inter] text-sm  text-secondry  font-medium "
                        >
                          <button className="flex items-center gap-2 justify-center focus:outline-none">
                            <span className="font-Inter text-sm pl-4 text-black font-medium ">
                              User Name
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px- py-3.5 text-left rtl:text-right font-[Inter] text-sm text-black font-medium"
                        >
                          Activity
                        </th>
                        <th
                          scope="col"
                          className="px- py-3.5 text-left rtl:text-right font-[Inter] text-sm text-black font-medium"
                        >
                          Date Time
                        </th>
                        <th
                          scope="col"
                          className=" py-3.5 font-[Inter] text-sm text-black font-medium"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {AuditLogTabsTData.map((item, index) => (
                        <tr
                          className={
                            index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
                          }
                        >
                          {/* name */}
                          <td className="pl-4 py-3 text-sm font-medium whitespace-nowrap">
                            <div className="flex items-center gap-x-4">
                              <img
                                className="object-cover w-10 h-10 rounded-full"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className=" font-[Inter] text-sm text-[#181D27] font-medium">
                                  {item.Name}
                                </h2>
                                <p className="text-sm font-normal text-[#535862] dark:text-gray-400">
                                  {item.Name}@gmail.com
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* Subscription */}
                          <td className=" py-4 text-sm whitespace-nowrap">
                            <div>
                              <p className="text-[#535862] font-[Inter] text-sm font-normal">
                                {item.SubscribePlan}
                              </p>
                            </div>
                          </td>
                          {/* dASTE */}

                          <td className=" py-4 text-sm whitespace-nowrap">
                            <div>
                              <p className="text-[#535862] font-[Inter] text-sm font-normal">
                                Nov , 10 , 2024 5:48
                              </p>
                            </div>
                          </td>
                          <td className="p-4   text-sm whitespace-nowrap">
                            <div className="flex justify-end gap-x-4">
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
                  <div className="flex justify-between border-t-2 bg-white py-4 px-2 ">
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
    </>
  );
};

export default AuditLogsTab;
