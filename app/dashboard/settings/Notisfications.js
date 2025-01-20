import React from "react";

const Notisfications = () => {
  return (
    <>
      <div className="bg-white min-h-screen flex flex-col rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-[#2E2E2E] text-sm border-b-2 p-4 font-Inter font-bold mb-6">
          Notifications
        </h2>
        <div className="flex-1 w-full">
          <ul className="w-full p-4 space-y-8">
            <li className="flex justify-between text-[#2E2E2E] font-Inter text-sm font-semibold">
              General Notisfications
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </li>
            <li className="flex justify-between text-[#2E2E2E] font-Inter text-sm font-semibold">
              Partner Notisfications
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </li>
            <li className="flex justify-between text-[#2E2E2E] font-Inter text-sm font-semibold">
              Campaign Notisfications
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </li>
            <li className="flex justify-between text-[#2E2E2E] font-Inter text-sm font-semibold">
              Payouts Notisfications
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </li>
            <li className="flex justify-between text-[#2E2E2E] font-Inter text-sm font-semibold">
              Messages Notisfications
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </li>
          </ul>
        </div>
        <div className="flex justify-end p-4 mt-auto space-x-4">
          <button className="bg-[#FFFFFF] border rounded-lg py-2 px-12 text-[#2E2E2E] font-Inter font-semibold text-sm">
            Cancel
          </button>
          <button className="bg-[#3366CC] py-2 px-12 rounded-lg text-[#FFFFFF] font-Inter font-semibold text-sm">
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

export default Notisfications;
