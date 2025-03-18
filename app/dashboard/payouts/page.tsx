"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaSearch, FaPlus, FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import PayoutsTable from "./_components/PayoutsTable";

export default function PayoutsPage() {
  return (
    <PrivateRoute>
      <div className="py-4 lg:px-6 px-3 min-h-screen bg-transparent">
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  Total Refunds
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $1,000,000
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
                  pending Refunds
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $25,000
              </h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              <FaArrowUp className="mr-1 text-red-500 " size={16} />
              <span className="text-red-500 pr-3">30%</span> vs Last Month
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  completed Refunds
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $25,000
              </h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              <FaArrowUp className="mr-1 text-green-500 " size={16} />
              <span className="text-green-500 pr-3">30%</span> vs Last Month
            </div>
          </div>
        </div>

        <div className="py-6 min-h-screen">
          <div className="flex items-center justify-between  pb-4">
            <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white">
              <FaSearch className="text-black mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none bg-white"
              />
              <img
                src="/icons/union.png"
                alt="Custom Icon"
                className="w-4 h-4 ml-2"
              />
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center text-sm px-4 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition">
                <img
                  src="/icons/import.png"
                  alt="Custom Icon"
                  className="w-4 h-4 mr-2"
                />
                Export
              </button>

              <Link href="#">
                <button className="flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  <FaPlus className="mr-2 text-sm" />
                  manual pay
                </button>
              </Link>
            </div>
          </div>

          <PayoutsTable />
        </div>
      </div>
    </PrivateRoute>
  );
}
