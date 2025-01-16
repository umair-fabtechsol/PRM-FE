"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaSearch, FaPlus, FaArrowUp } from "react-icons/fa";
import Link from "next/link";

export default function CommissionPage() {
  return (
    <PrivateRoute>
      <div className="py-2 lg:px-6 px-3  min-h-screen bg-transparent">
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  Total Commision
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">15%</h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              across all partners
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  Total Paid out
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $1,000,000
              </h1>
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
                  pending payouts
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $25,000
              </h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              sheduled for next week
            </div>
          </div>
        </div>

        <div className="py-6 min-h-screen">
          <div className="flex items-center justify-between  pb-4">
            <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white">
              <FaSearch className="text-gray-700 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none bg-white text-gray-700"
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

              <Link href="/dashboard/createcommission">
                <button className="flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  <FaPlus className="mr-2 text-sm" />
                  create New
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full rounded-md border-collapse border  rounded shadow-md">
              <thead className="bg-white border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    Commission Name
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    description
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    commission type
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    payout frequency
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    payment processor
                  </th>

                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap"></th>
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
                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      for commission name
                    </td>

                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      description
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      Monthly
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      stripe
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      Partner
                    </td>

                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      <Link href="/dashboard/comissiondetail">
                        <button className="text-gray-700 hover:text-blue-700">
                          <img
                            src="/icons/comicon.png"
                            alt="Custom Icon"
                            className="w-4 h-4 mr-2"
                            style={{ maxWidth: "unset" }}
                          />
                        </button>
                      </Link>
                      <button className="text-gray-700 hover:text-blue-700">
                        <img
                          src="/icons/delete.png"
                          alt="Custom Icon"
                          className="w-4 h-4 mr-2"
                          style={{ maxWidth: "unset" }}
                        />
                      </button>
                      <button className="text-gray-700 hover:text-blue-700">
                        <img
                          src="/icons/edit.png"
                          alt="Custom Icon"
                          className="w-4 h-4 mr-2"
                          style={{ maxWidth: "unset" }}
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

          {/* <div className="overflow-x-auto mt-5">
            <table className="min-w-full rounded-md border-collapse border rounded shadow-md">
              <thead className="bg-white border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    Tags
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
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
                    <td className="px-4 py-3 flex items-center space-x-2 whitespace-nowrap">
                      <img
                        src="/images/image.jpg"
                        alt="User"
                        className="w-8 h-8 rounded-full"
                        style={{ maxWidth: "unset" }}
                      />
                      <div className="flex flex-col ml-2">
                        <span className="text-black text-sm font-medium">
                          John Doe for name part of user
                        </span>
                        <span className="text-gray-500 text-xs">
                          User Title
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      johndoe@example.com
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      +1234567890
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      Tech Company
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      Partner
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                      <span
                        className={`${
                          {
                            0: "text-xs rounded-xl bg-red-100 text-red-500 px-2 py-1",
                            1: "text-xs rounded-xl bg-blue-100 text-blue-500 px-2 py-1",
                            2: "text-xs rounded-xl bg-green-100 text-green-500 px-2 py-1",
                          }[index % 3]
                        } rounded text-sm`}
                      >
                        {index % 3 === 0
                          ? "Text for Red"
                          : index % 3 === 1
                          ? "Text for Blue"
                          : "Text for Green"}
                      </span>
                    </td>

                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      <button className="text-gray-700 hover:text-blue-700">
                        <img
                          src="/icons/usericon.png"
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
          </div> */}
        </div>
      </div>
    </PrivateRoute>
  );
}
