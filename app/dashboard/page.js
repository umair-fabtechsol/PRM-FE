"use client";

import { useSearchParams } from "next/navigation";
import PrivateRoute from "../components/PrivateRoute";
import { FaAppStore, FaUser, FaArrowUp, FaDollarSign } from "react-icons/fa";
import { useState } from "react";

export default function DashboardPage() {
  const [openSmartWidGetOpen, setSmartWidgetOpen] = useState(false);

  return (
    <PrivateRoute>
      {openSmartWidGetOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-lg p-6 shadow-lg relative">
            <div className="flex justify-left my-2 text-red-500">
              <img
                src="/icons/addwidgets.png"
                alt="Add Widget"
                className="mr-2"
                width={40}
                height={40}
              />
            </div>

            <h2 className="text-left p-2 text-lg font-semibold text-black">
              Smart Widget
            </h2>

            <div className="my-4">
              <label
                htmlFor="widget-type"
                className="block text-sm  text-gray-700 mb-1"
              >
                who see's generated widget
              </label>
              <select
                id="widget-type"
                className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="type1">Custome widget</option>
                <option value="type2">Smart widget</option>
              </select>

              <label
                htmlFor="widget-name"
                className="block text-sm  text-gray-700 mt-2 mb-1"
              >
                Widget Name
              </label>
              <input
                id="widget-name"
                type="text"
                placeholder="Enter widget name"
                className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 mb-2 flex justify-between gap-4">
              <button
                onClick={() => setSmartWidgetOpen(false)}
                className="w-full py-2 text-gray-500 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setSmartWidgetOpen(false)}
                className="w-full py-2 text-white bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="py-4 lg:px-6 px-3  bg-transparent">
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setSmartWidgetOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-all duration-200"
          >
            <img
              src="/icons/addwidget.svg"
              alt="Add Widget"
              className="mr-2"
              width={18}
              height={18}
            />
            Add Widget
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  Total Revenue Generated
                </p>

                <img
                  src="/icons/revnew.png"
                  alt="Icon"
                  className="mr-2"
                  width={40}
                  height={40}
                />
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $1,25,000
              </h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              <FaArrowUp className="mr-1 text-green-500 " size={16} />
              <span className="text-green-500 pr-3">40%</span> vs Last Month
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  Active affiliates/ partners
                </p>

                <img
                  src="/icons/partners.png"
                  alt="Icon"
                  className="mr-2"
                  width={40}
                  height={40}
                />
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">250</h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              <FaArrowUp className="mr-1 text-red-500 " size={16} />
              <span className="text-red-500 pr-3">40%</span> vs Last Month
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  top performance campaign
                </p>

                <img
                  src="/icons/campaign.png"
                  alt="Icon"
                  className="mr-2"
                  width={40}
                  height={40}
                />
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $50,000
              </h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              Black friday promo
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  upcoming payouts
                </p>

                <img
                  src="/icons/payout.png"
                  alt="Icon"
                  className="mr-2"
                  width={40}
                  height={40}
                />
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $30,000
              </h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              sheduled for next week
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
