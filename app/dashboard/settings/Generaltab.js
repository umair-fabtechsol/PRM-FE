import React from "react";

const Generaltab = ({ activetab }) => {
  return (
    <>
      <div className="bg-white min-h-screen flex flex-col rounded-lg shadow-md">
        <div className="flex justify-center flex-1">
          <div className="p-8 w-full max-w-4xl">
            <h2 className=" text-[#2E2E2E] text-sm border-b-2 pb-3 font-Inter font-bold  mb-6">
              General Settings
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block font-Inter font-medium text-sm text-[#2E2E2E]">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100  border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-Inter font-medium text-sm text-[#2E2E2E]">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100  border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-Inter font-medium text-sm text-[#2E2E2E]">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100  border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-Inter font-medium text-sm text-[#2E2E2E]">
                    Address
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="City"
                      className="mt-1 block w-1/2 px-3 py-2 bg-gray-100  border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="mt-1 block w-1/2 px-3 py-2 bg-gray-100  border-gray-300 rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100  border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center mt-6 md:mt-0 md:ml-6">
                <label className="block text-[#2E2E2E]  font-medium font-Inter  mb-2">
                  Profile picture
                </label>
                <div className="relative">
                  <img
                    src="/Profile Picture.png"
                    alt="Profile picture of a person in a suit"
                    className="w-48 h-48 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                    <i className="fas fa-pen"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="absolute bottom-4 right-2 ">
            <button className="bg-[#FFFFFF] border rounded-lg  py-2 px-12 text-[#2E2E2E] font-Inter font-semibold text-sm ">
              Cancel
            </button>
            <button className="bg-[#3366CC] ml-6 py-2 px-12 rounded-lg text-[#FFFFFF] font-Inter font-semibold text-sm ">
              Save
            </button>
          </div> */}
        </div>{" "}
        <div className="flex justify-end p-4 mt-auto space-x-4">
          <button className="bg-[#FFFFFF] border rounded-lg py-2 px-12 text-[#2E2E2E] font-Inter font-semibold text-sm">
            Cancel
          </button>
          <button className="bg-[#3366CC] py-2 px-12 rounded-lg text-[#FFFFFF] font-Inter font-semibold text-sm">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Generaltab;
