"use client";

import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/Header";
import { FaSearch, FaPlus, FaArrowUp } from "react-icons/fa";
import Link from "next/link";

export default function PayoutsPage() {
  return (
    <PrivateRoute>
      <Header
        title="Payouts Management"
        description="confirgure permissions track payments and manage payouts schedules"
      />
      <div className="p-6 min-h-screen bg-transparent">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="mt-6">
            <table className="w-full rounded-md border-collapse border rounded shadow-md">
              <thead className="bg-white border-b">
                <tr>
                  <th className="pl-8 pr-4 py-3 text-left  text-gray-700 text-xs font-medium">
                    partner Name
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    payouts amount
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    scheduled date
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    status
                  </th>

                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4  py-3 flex items-center space-x-4">
                      <input
                        type="checkbox"
                        className="form-checkbox ml-2 mr-3 h-3 w-3 text-blue-600 border-gray-400 rounded shadow-sm focus:ring focus:ring-blue-300"
                      />
                      <img
                        src="/images/image.jpg"
                        alt="User"
                        className="w-8 h-8 rounded-full border border-gray-300 shadow-md mx-2"
                      />
                      <div className="flex flex-col ml-2">
                        <span className="text-black text-sm font-medium">
                          John Doe
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-700 text-sm">
                      $8763,456
                    </td>

                    <td className="px-4 py-3 text-gray-700 text-sm">
                      nov, 18 2024 09:34pm
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      <span
                        className={`${
                          {
                            0: "text-xs rounded-xl bg-red-300 text-red-700 p-1",
                            1: "text-xs rounded-xl bg-blue-300 text-blue-700 p-1",
                            2: "text-xs rounded-xl bg-green-300 text-green-700 p-1",
                          }[index % 3]
                        } rounded text-sm`}
                      >
                        {index % 3 === 0
                          ? "completed"
                          : index % 3 === 1
                          ? "pending"
                          : "for failed"}
                      </span>
                    </td>

                    <td className="px-4 py-3 space-x-2">
                      <button className="text-gray-700 hover:text-blue-700">
                        <img
                          src="/icons/aricon.png"
                          alt="Custom Icon"
                          className="w-4 h-4 mr-2"
                        />
                      </button>
                      <button className="text-gray-700 hover:text-blue-700">
                        <img
                          src="/icons/comicon.png"
                          alt="Custom Icon"
                          className="w-4 h-4 mr-2"
                        />
                      </button>
                      <button className="text-gray-700 hover:text-blue-700">
                        <img
                          src="/icons/delete.png"
                          alt="Custom Icon"
                          className="w-4 h-4 mr-2"
                        />
                      </button>
                      <button className="text-gray-700 hover:text-blue-700">
                        <img
                          src="/icons/edit.png"
                          alt="Custom Icon"
                          className="w-4 h-4 mr-2"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100 border-t">
                <tr>
                  <td colSpan="7" className="px-4 py-3">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex space-x-4 items-center">
                        <button className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg shadow hover:bg-gray-50 transition">
                          Previous
                        </button>
                        <button className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg shadow hover:bg-gray-50 transition">
                          Next
                        </button>
                      </div>
                      <div className="text-gray-600 text-sm text-right">
                        Page 1 of 5
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
