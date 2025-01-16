import React from "react";

const BroadcastModal = ({ isOpen, closeModal }) => {
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
              <div className="flex gap-y-4 flex-col  py-3 px-4  ">
                <div className="">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      fill="#3366CC"
                      fill-opacity="0.1"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#FAFAFA"
                      strokeWidth="8"
                    />
                    <path
                      d="M21.541 23.8333C21.541 21.9924 23.0334 20.5 24.8743 20.5H27.9993C29.8403 20.5 31.3327 21.9924 31.3327 23.8333V25.5V27.1667C31.3327 29.0076 29.8403 30.5 27.9993 30.5H19.666L20.9945 28.4756C21.3511 27.9323 21.541 27.2966 21.541 26.6468V23.8333Z"
                      fill="#3366CC"
                      fill-opacity="0.3"
                    />
                    <path
                      d="M31.3327 25.5C32.966 25.5 34.4577 26.9924 34.4577 28.8333V31.6468C34.4577 32.2966 34.6476 32.9323 35.0042 33.4756L36.3327 35.5H27.9993C26.1584 35.5 24.666 34.0076 24.666 32.1667V30.5M31.3327 25.5V23.8333C31.3327 21.9924 29.8403 20.5 27.9993 20.5H24.8743C23.0334 20.5 21.541 21.9924 21.541 23.8333V26.6468C21.541 27.2966 21.3511 27.9323 20.9945 28.4756L19.666 30.5H27.9993C29.8403 30.5 31.3327 29.0076 31.3327 27.1667V25.5Z"
                      stroke="#3366CC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  id="hs-small-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  Broadcast
                </h3>
              </div>
              <div className="p-4 text-[#2E2E2E] font-Inter font-medium  max-h-[60vh] overflow-y-auto">
                <div className="flex  justify-between gap-4">
                  <div className="mb-4 w-1/2 md:mb-0 ">
                    <label className="block mb-2">Select Tag</label>
                    <select className="border rounded-lg w-full px-4 py-2">
                      <option>Select</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-2 ">Select Task</label>
                    <select className="border w-full rounded-lg px-4 py-2">
                      <option>Select</option>
                    </select>
                  </div>
                </div>

                <div className="w-full my-4">
                  <label className="block mb-2">Enter Custom Alert</label>
                  <textarea
                    className="border rounded w-full h-32 p-4"
                    placeholder="write here..."
                  ></textarea>
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
  );
};

export default BroadcastModal;
