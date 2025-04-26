"use client";
import React, { useState } from "react";

const FeatureModal = ({ isOpen, closeModal }) => {
  return (
    <>
      <div>
        {isOpen && (
          <div
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            id="hs-small-modal"
            className="fixed top-0 left-0 w-full overflow-y-auto  h-full z-[80] bg-black bg-opacity-50 flex justify-center items-center"
            role="dialog"
            aria-labelledby="hs-small-modal-label"
          >
            <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg mx-auto text-gray-700 ">
              <div className="flex justify-between items-center py-3 px-4  ">
                <h3
                  id="hs-small-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  New Feature
                </h3>
              </div>
              <div
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                className="p-4  max-h-[80vh] overflow-y-auto"
              >
                <div className="mb-4">
                  <label
                    className="block text-[#2E2E2E] font-Inter  text-sm font-bold mb-2"
                    htmlFor="old-password"
                  >
                    Feature Name
                  </label>
                  <input
                    id="feature-name"
                    type="text"
                    placeholder="Enter Feature Name"
                    className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* <div className="mb-4">
                  <label
                    className="block text-[#2E2E2E] font-Inter  text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Write Here..."
                    className="border h-28 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                  />
                </div> */}
              </div>
              <div className="flex w-full justify-end items-center gap-x-2 py-3 px-4  ">
                <button
                  onClick={closeModal}
                  className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 hover:border-gray-500 hover:shadow-md transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeatureModal;
