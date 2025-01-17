import React from "react";

const PaymentProcessors = () => {
  return (
    <>
      <div className="bg-white min-h-screen flex flex-col rounded-lg shadow-md w-full max-w-4xl">
        <h2 className=" text-[#2E2E2E] text-sm border-b-2 p-4 font-Inter font-bold  mb-6">
          Payment Processors
        </h2>
        <div className="px-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md max-w-full mx-auto mt-10">
            <div className="flex-shrink-0">
              <div className="bg-[#ebf0fa] rounded-full p-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-2xl font-bold">S</span>
                </div>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Stripe</h2>
              <p className="text-gray-600 w-3/4">
                Seamlessly connect your Stripe account to manage secure payments
                and transactions.
              </p>
            </div>
            <div className="ml-auto">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md max-w-full mx-auto mt-10">
            <div className="flex-shrink-0">
              <div className="bg-[#ebf0fa] rounded-full p-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-2xl font-bold">
                    <img src="/paypal-svgrepo-com.svg" />
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Paypal</h2>
              <p className="text-gray-600 w-3/4">
                Link Your Paypal Account to enable smooth transactions
              </p>
            </div>
            <div className="ml-auto">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </div>
          </div>
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

export default PaymentProcessors;
