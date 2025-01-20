import React from "react";

const Security = () => {
  return (
    <>
      <div className="bg-white min-h-screen flex flex-col rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex-1">
          <h2 className="text-[#2E2E2E] text-sm border-b-2 p-4 font-Inter font-bold mb-6">
            Change Password
          </h2>
          <div className="w-full max-w-sm p-4 rounded-lg">
            <div className="mb-4">
              <label
                className="block text-[#2E2E2E] font-Inter  text-sm font-bold mb-2"
                htmlFor="old-password"
              >
                Old Password
              </label>
              <input
                id="old-password"
                type="password"
                className="bg-[#fafafa] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-[#2E2E2E] font-Inter text-sm font-bold mb-2"
                htmlFor="new-password"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                className="bg-[#fafafa] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-[#2E2E2E] font-Inter text-sm font-bold mb-2"
                htmlFor="reenter-new-password"
              >
                Re-Enter New Password
              </label>
              <input
                id="reenter-new-password"
                type="password"
                className="bg-[#fafafa] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 mt-auto space-x-4">
          <button className="bg-[#FFFFFF] border border-gray-300 rounded-lg py-2 px-12 text-[#2E2E2E] font-Inter font-semibold text-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400">
            Cancel
          </button>
          <button className="bg-[#3366CC] py-2 px-12 rounded-lg text-[#FFFFFF] font-Inter font-semibold text-sm transition-all duration-300 hover:bg-[#254a99]">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Security;
